import prettier from "prettier/standalone";
import parserBable from 'prettier/parser-babylon';

export const upperCaseFirstChar = (s = '') => s.charAt(0).toUpperCase() + s.slice(1);
const lowerCaseFirstChar = (s = '') => s.charAt(0).toLowerCase() + s.slice(1);
const format = (js) => {
  try{
    return prettier.format(js, { parser: 'babel', plugins: [parserBable], trailingComma: 'all' })
  } catch(e){
    return '// 等你輸入好我在開始工作';
  }
};
const splitCamel = (str) => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1_').toUpperCase();

export const generateFakeData = (getApiName, getApiJson) => {
  const name = `fake${upperCaseFirstChar(getApiName)}`;
  return format(`
      const ${name} = () => {
        return (
          ${getApiJson}
        );
      };
      
      export default {
        ${name},
      };
    `);
};

export const generateResource = ({ databaseName, getApiName, getApiUrl, putApiName, putApiUrl }) => {
  return format(`
import CommonUtils from '~~utils/CommonUtils';
import ApiService from '~~apis/ApiService';
import Fake${upperCaseFirstChar(databaseName)}Data from '~~apis/fakeData/Fake${upperCaseFirstChar(databaseName)}Data';

const debugStatus = {
  ${getApiName}: true,
  ${putApiName}: true,
};


const ${upperCaseFirstChar(databaseName)}Resource = {

  ${getApiName}: () => {
    if (debugStatus.${getApiName}) {
      console.log('::::: API ${getApiName} :::::');
      return CommonUtils.fakeApiHelper(1000, 'success', Fake${upperCaseFirstChar(databaseName)}Data.fake${upperCaseFirstChar(getApiName)}());
    }
    return ApiService.get('${getApiUrl}');
  },

  ${putApiName}: (data) => {
    if (debugStatus.${putApiName}) {
      console.log('::::: API ${putApiName} :::::', data);
      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');
    }
    return ApiService.put('${putApiUrl}', { data });
  },
};

export default ${upperCaseFirstChar(databaseName)}Resource;
`);
};


export const generateActions = ({ databaseName, getApiName, putApiName }) => {
  return format(`
  export const actionTypes = {
    ${splitCamel(databaseName)}___${splitCamel(getApiName)}: '${splitCamel(databaseName)}___${splitCamel(databaseName)}',
    ${splitCamel(databaseName)}___${splitCamel(getApiName)}_SUCCESS: '${splitCamel(databaseName)}___${splitCamel(getApiName)}_SUCCESS',
    ${splitCamel(databaseName)}___${splitCamel(putApiName)}: '${splitCamel(databaseName)}___${splitCamel(putApiName)}',
  };

  export const ${getApiName} = () => {
    return {
      type: actionTypes.${splitCamel(databaseName)}___${splitCamel(databaseName)},
    };
  };
  
  export const ${getApiName}Success = (response) => {
    return {
      type: actionTypes.${splitCamel(databaseName)}___${splitCamel(databaseName)}_SUCCESS,
      ...response.data
    };
  };
  
  export const ${putApiName} = () => {
    return {
      type: actionTypes.${splitCamel(databaseName)}___${splitCamel(putApiName)},
    };
  };
  
  `)
};


export const generateEpic = ({ databaseName, getApiName, putApiName }) => {
  return format(`
  import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

import {
  actionTypes,

  ${getApiName},
  ${getApiName}Success

} from './${upperCaseFirstChar(databaseName)}Actions';

export const ${getApiName}Epic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.${splitCamel(databaseName)}___${splitCamel(getApiName)}),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.${upperCaseFirstChar(databaseName)}Resource.${getApiName}())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(${getApiName}Success(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const ${putApiName}Epic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.${splitCamel(databaseName)}___${splitCamel(putApiName)}),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.${upperCaseFirstChar(databaseName)}Resource.${putApiName}(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(${getApiName}()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export default [
  ${getApiName}Epic,
  ${putApiName}Epic,
];

  `)
}

export const generateReducer = ({ databaseName, containerName, getApiName }) => {
  return format(`
  import { handleActions } from 'redux-actions';
import _groupBy from 'lodash/groupBy';
import _get from 'lodash/get';
import { actionTypes } from '../${upperCaseFirstChar(databaseName)}/${upperCaseFirstChar(databaseName)}Actions';

const initial${upperCaseFirstChar(containerName)} = {
  date: {},
  ${lowerCaseFirstChar(containerName)}: [],
};

const initialState = {
  ${lowerCaseFirstChar(containerName)}: initial${upperCaseFirstChar(containerName)},
};

export default handleActions({

  [actionTypes.${splitCamel(databaseName)}___${splitCamel(getApiName)}_SUCCESS]: (state, payload) => {
    return {
      ...state,
      ${lowerCaseFirstChar(containerName)}: {
        ...state.${lowerCaseFirstChar(containerName)},
        ...payload,
      }
    };
  },

}, initialState);

  `);
}

export const generateContainer = ({ databaseName, containerName, getApiName, putApiName, }) => {
  return format(`
  import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import * as R from 'ramda';
import useCSDB from '~~features/Database/components/useCSDB';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import * as ${upperCaseFirstChar(databaseName)}Actions from '~~features/Database/ME/${upperCaseFirstChar(databaseName)}/${upperCaseFirstChar(databaseName)}Actions';
import getColumns from './ColumnSetting';

const ${upperCaseFirstChar(containerName)} = (props) => {
  const {
    ${getApiName},
    ${putApiName},
    date,
    ${lowerCaseFirstChar(containerName)}List,
  } = props;

  useEffect(() => {
    ${getApiName}();
  }, []);

  const extendsCSDBPorps = {
    mainTable: ${lowerCaseFirstChar(containerName)}List,
    initialSortInfo: { dataIndex: 'size', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'size' },
  };

  const {
    // For table
    isEditMode,
    setEditMode,
    mainTableList,
    editModeList,
    handleTableChange,
    handleSetEditMode,
    handleOnEditItem,
    differenceList,
    // For search bar
    keyword,
    setKeyword,
    handleSearch,
    handleResetSearchBar,
    // For checkbox
    showArchive,
    setShowArchive,
    checkboxColumn,
    // For add modal
    isAddModalOpen,
    setAddModal,
  } = useCSDB(extendsCSDBPorps);

  const handleSave = () => {
    const data = {
      nextId: _get(date, 'nextId', false),
      fanBaselinePrice: differenceList.map(item => ({ id: item.id, next: item.next }))
    };
    setEditMode(false);
    ${putApiName}(data);
  };

  const extendsColumnPorps = {
    ...props,
    isEditMode,
    date,
    checkboxColumn,
    handleOnEditItem,
  };

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            這邊你要自己改名字喔，沒改到別怪我ＱＱ
          </div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
              placeholder="這邊你要自己改名字喔，沒改到別怪我ＱＱ"
              onInputChange={setKeyword}
              value={keyword}
              onSearch={handleSearch}
              onReset={handleResetSearchBar}
              disabled={isEditMode}
            />
            {/* <ArchiveSwitch
              isChecked={showArchive}
              onChange={() => setShowArchive(!showArchive)}
            /> */}
          </InlineBtns>
          {
            isEditMode ?
              <InlineBtns>
                <Button
                  color="black"
                  border={false}
                  round
                  onClick={() => handleSetEditMode(false)}
                >Cancel
                </Button>
                <Button
                  color="green"
                  border={false}
                  round
                  onClick={handleSave}
                >Save
                </Button>
              </InlineBtns> :
              <InlineBtns>
                {/* 新增 */}
                {/* <Icon
                  icon={IconName.BtnAddGroup}
                  size="2rem"
                  onClick={() => setAddModal(true)}
                /> */}
                {/* 修改 */}
                <Icon
                  icon={IconName.BtnEditGroup}
                  size="2rem"
                  onClick={() => handleSetEditMode(true)}
                  disabled={mainTableList.length === 0 || !date.nextId}
                />
                {/* 封存 */}
                {/* <Icon
                  icon={IconName.BtnArchive}
                  size="2rem"
                  // onClick={() => handleArchive()}
                  // disabled={selectedIdList.length === 0}
                /> */}
              </InlineBtns>
          }
        </div>
        <Table
          headerColor="blue"
          columns={getColumns(extendsColumnPorps)}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ y: 500 }}
        />
      </div>
    </InnerContainer>
  );
};


const mapStateToProps = (state) => {
  return {
    ${lowerCaseFirstChar(containerName)}List: state.${lowerCaseFirstChar(databaseName)}.${lowerCaseFirstChar(containerName)}.${lowerCaseFirstChar(containerName)},
    date: state.${lowerCaseFirstChar(databaseName)}.${lowerCaseFirstChar(containerName)}.date,
  };
};

const mapDispatchToProps = {
  ${getApiName}: ${upperCaseFirstChar(databaseName)}Actions.${getApiName},
  ${putApiName}: ${upperCaseFirstChar(databaseName)}Actions.${putApiName},
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(${upperCaseFirstChar(containerName)});

  `)
}


export const generateColumns = () => {
  return format(`
  import React from 'react';
import _get from 'lodash/get';
import { comma } from '~~utils/Math';
import NumberInput from '~~features/Database/components/NumberInput';


const getColumns = props => {
  const {
    isEditMode,
    date,
    handleOnEditItem,
  } = props;
  return [
    {
      dataIndex: 'id',
      title: 'ID',
      width: '5%',
      align: 'center',
      render: (val, record, index) => index + 1,
    },
    {
      dataIndex: 'size',
      title: 'Size',
      width: '40%',
      defaultSortOrder: 'ascend',
      sorter: !isEditMode,
    },
    {
      title: _get(date, 'last', '－'),
      dataIndex: 'last',
      width: '15%',
      sorter: !isEditMode && _get(date, 'lastId', false),
      render: (val) => comma(val, 8, '－'),
    },
    {
      title: _get(date, 'current', '－'),
      dataIndex: 'current',
      width: '15%',
      sorter: !isEditMode && _get(date, 'currentId', false),
      render: (val) => comma(val, 8, '－'),
    },
    {
      title: _get(date, 'next', '－'),
      dataIndex: 'next',
      width: '15%',
      sorter: !isEditMode && _get(date, 'nextId', false),
      render: (val, record) => (
        isEditMode ?
          <NumberInput
            value={val}
            onChange={(value) => handleOnEditItem(value, record.id, 'next')}
          />  :
          comma(val, 8, '－'))
    },
  ];
};

export default getColumns;

  `)
}