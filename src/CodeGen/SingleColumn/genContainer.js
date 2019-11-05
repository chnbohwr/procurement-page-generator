import { format, upperCaseFirstChar, lowerCaseFirstChar } from '../utils';

export default ({ databaseName, containerName, getApiName, putApiName, }) => {
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
import * as ${upperCaseFirstChar(databaseName)}Actions from '~~features/Database/ME/${upperCaseFirstChar(databaseName)}/${upperCaseFirstChar(databaseName)}Redux';
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
      items: differenceList.map(item => ({ id: item.id, next: item.next }))
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

