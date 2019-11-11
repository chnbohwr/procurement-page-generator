(this["webpackJsonpprocurement-page-generator"]=this["webpackJsonpprocurement-page-generator"]||[]).push([[0],{253:function(n,e,t){},254:function(n,e,t){"use strict";t.r(e);var a=t(0),o=t.n(a),r=t(6),c=t.n(r),i=t(22),s=t(17),l=t(7),d=t(34),m=t.n(d),u=t(35),p=t.n(u);function f(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}var g={display:"flex",justifyContent:"center",alignItems:"center"},h={backgroundImage:"url(".concat(m.a,")"),backgroundSize:"cover",backgroundPosition:"center",width:100,height:100,marginRight:30},b=function(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?f(t,!0).forEach((function(e){Object(l.a)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):f(t).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}({},h,{backgroundImage:"url(".concat(p.a,")")}),E=function(){return o.a.createElement("div",{style:{height:"100vh"}},o.a.createElement("h2",{style:{textAlign:"center"}},"Select layout"),o.a.createElement("div",{style:g},o.a.createElement(i.b,{to:"/col1"},o.a.createElement("div",null,o.a.createElement("div",{style:h}),o.a.createElement("h3",null,"single column"))),o.a.createElement(i.b,{to:"/col2"},o.a.createElement("div",null,o.a.createElement("div",{style:b}),o.a.createElement("h3",null,"double column")))))},S=t(9),v=t(278),C=t(285),I=t(283),y=t(286),N=t(282),A=t(39),x=t.n(A),w=t(40),j=t.n(w),_=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return n.charAt(0).toUpperCase()+n.slice(1)},M=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return n.charAt(0).toLowerCase()+n.slice(1)},O=function(n){try{return x.a.format(n,{parser:"babel",plugins:[j.a],trailingComma:"all",singleQuote:!0,printWidth:200})}catch(e){return"// prettier \u6709\u932f\u8aa4"+e.toString()}},P=function(n){return n.replace(/([a-zA-Z])(?=[A-Z])/g,"$1_").toUpperCase()},D=function(n,e){var t="fake".concat(_(n));return O("\n      const ".concat(t," = () => {\n        return (\n          ").concat(e,"\n        );\n      };\n      \n      export default {\n        ").concat(t,",\n      };\n    "))},B=function(n){var e=n.databaseName,t=n.getApiName,a=n.getApiUrl,o=n.putApiName,r=n.putApiUrl;return O("\nimport CommonUtils from '~~utils/CommonUtils';\nimport ApiService from '~~apis/ApiService';\nimport Fake".concat(_(e),"Data from '~~apis/fakeData/Fake").concat(_(e),"Data';\n\nconst debugStatus = {\n  ").concat(t,": true,\n  ").concat(o,": true,\n};\n\n\nconst ").concat(_(e),"Resource = {\n\n  ").concat(t,": () => {\n    if (debugStatus.").concat(t,") {\n      console.log('::::: API ").concat(t," :::::');\n      return CommonUtils.fakeApiHelper(1000, 'success', Fake").concat(_(e),"Data.fake").concat(_(t),"());\n    }\n    return ApiService.get('").concat(a,"');\n  },\n\n  ").concat(o,": (data) => {\n    if (debugStatus.").concat(o,") {\n      console.log('::::: API ").concat(o," :::::', data);\n      return CommonUtils.fakeApiHelper(1000, 'success', 'UPDATE SUCCESS');\n    }\n    return ApiService.put('").concat(r,"', { data });\n  },\n};\n\nexport default ").concat(_(e),"Resource;\n"))},T=function(n){var e=n.databaseName,t=n.getApiName,a=n.putApiName,o=n.containerName;return O("\n    \n    import { handleActions } from 'redux-actions';\n  import {\n    Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin,\n  } from 'rxjs';\n  import { ofType } from 'redux-observable';\n  import {\n    mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay,\n  } from 'rxjs/operators';\n  import Resource from '~~apis/resource';\n  import * as LoadingActions from '~~redux/Loading/LoadingActions';\n  import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';\n  \n  const actionTypes = {\n    ".concat(P(e),"___").concat(P(t),": '").concat(P(e),"___").concat(P(t),"',\n    ").concat(P(e),"___").concat(P(t),"_SUCCESS: '").concat(P(e),"___").concat(P(t),"_SUCCESS',\n    ").concat(P(e),"___").concat(P(a),": '").concat(P(e),"___").concat(P(a),"',\n  };\n  \n  export const ").concat(t," = () => {\n    return {\n      type: actionTypes.").concat(P(e),"___").concat(P(t),",\n    };\n  };\n  \n  export const ").concat(t,"Success = (response) => {\n    return {\n      type: actionTypes.").concat(P(e),"___").concat(P(t),"_SUCCESS,\n      ...response.data\n    };\n  };\n  \n  export const ").concat(a," = (data) => {\n    return {\n      type: actionTypes.").concat(P(e),"___").concat(P(a),",\n      data\n    };\n  };\n  \n  export const ").concat(t,"Epic = (action$, state$) => {\n    return action$.pipe(\n      ofType(actionTypes.").concat(P(e),"___").concat(P(t),"),\n      mergeMap((action) => {\n        return concat(\n          of(LoadingActions.toggleLoadingStatus(true)),\n          from(Resource.").concat(_(e),"Resource.").concat(t,"())\n            .pipe(\n              mergeMap(response => {\n                return concat(\n                  of(LoadingActions.toggleLoadingStatus(false)),\n                  of(").concat(t,"Success(response)),\n                );\n              }),\n              catchError(error => {\n                return concat(\n                  of(LoadingActions.toggleLoadingStatus(false)),\n                  of(NotificationSystemActions.pushNotification({\n                    message: '\u53d6\u5f97\u5217\u8868\u6709\u8aa4\uff0c\u8acb\u7a0d\u5f8c\u518d\u8a66',\n                    level: 'error'\n                  }))\n                );\n              })\n            ));\n      })\n    );\n  };\n  \n  export const ").concat(a,"Epic = (action$, state$) => {\n    return action$.pipe(\n      ofType(actionTypes.").concat(P(e),"___").concat(P(a),"),\n      mergeMap((action) => {\n        const { data } = action;\n        return concat(\n          of(LoadingActions.toggleLoadingStatus(true)),\n          from(Resource.").concat(_(e),"Resource.").concat(a,"(data))\n            .pipe(\n              mergeMap(response => {\n                return concat(\n                  of(LoadingActions.toggleLoadingStatus(false)),\n                  of(").concat(t,"()),\n                  of(NotificationSystemActions.pushNotification({\n                    message: '\u66f4\u65b0\u6210\u529f',\n                    level: 'success'\n                  }))\n                );\n              }),\n              catchError(error => {\n                return concat(\n                  of(LoadingActions.toggleLoadingStatus(false)),\n                  of(NotificationSystemActions.pushNotification({\n                    message: '\u53d6\u5f97\u5217\u8868\u6709\u8aa4\uff0c\u8acb\u7a0d\u5f8c\u518d\u8a66',\n                    level: 'error'\n                  }))\n                );\n              })\n            ));\n      })\n    );\n  };\n  \n  const ").concat(P(e),"___").concat(P(t),"_SUCCESS = (state, payload) => {\n    return {\n      ...state,\n      ").concat(M(o),": {\n        ...state.").concat(M(o),",\n        ...payload,\n      }\n    };\n  };\n  \n  const initial").concat(_(o)," = {\n    date: {},\n    ").concat(M(o),": [],\n  };\n  \n  const initialState = {\n    ").concat(M(o),": initial").concat(_(o),",\n  };\n  \n  export const reducer = handleActions({\n    ").concat(P(e),"___").concat(P(t),"_SUCCESS,\n  }, initialState);\n  \n  export const epics = [\n    ").concat(t,"Epic,\n    ").concat(a,"Epic,\n  ];\n  \n    \n    "))},k=function(){return O("\n  import React from 'react';\nimport _get from 'lodash/get';\nimport { comma } from '~~utils/Math';\nimport NumberInput from '~~features/Database/components/NumberInput';\n\n\nconst getColumns = props => {\n  const {\n    isEditMode,\n    date,\n    handleOnEditItem,\n    idColumn,\n  } = props;\n  return [\n    idColumn,\n    {\n      dataIndex: 'size',\n      title: 'Size',\n      width: '40%',\n      defaultSortOrder: 'ascend',\n      sorter: !isEditMode,\n    },\n    {\n      title: _get(date, 'last', '\uff0d'),\n      dataIndex: 'last',\n      width: '15%',\n      sorter: !isEditMode && _get(date, 'lastId', false),\n      render: (val) => comma(val, 8, '\uff0d'),\n    },\n    {\n      title: _get(date, 'current', '\uff0d'),\n      dataIndex: 'current',\n      width: '15%',\n      sorter: !isEditMode && _get(date, 'currentId', false),\n      render: (val) => comma(val, 8, '\uff0d'),\n    },\n    {\n      title: _get(date, 'next', '\uff0d'),\n      dataIndex: 'next',\n      width: '15%',\n      sorter: !isEditMode && _get(date, 'nextId', false),\n      render: (val, record) => (\n        isEditMode ?\n          <NumberInput\n            value={val}\n            onChange={(value) => handleOnEditItem(value, record.id, 'next')}\n          />  :\n          comma(val, 8, '\uff0d'))\n    },\n  ];\n};\n\nexport default getColumns;\n\n  ")},L=function(n){var e=n.databaseName,t=n.containerName,a=n.getApiName,o=n.putApiName;return O("\n  import React, { Fragment, useState, useEffect } from 'react';\nimport { connect } from 'react-redux';\nimport { compose } from 'recompose';\nimport _get from 'lodash/get';\nimport * as R from 'ramda';\nimport useCSDB from '~~features/Database/components/useCSDB';\nimport Icon, { IconName } from '~~elements/Icon';\nimport Button from '~~elements/Button';\nimport Table from '~~elements/Table';\nimport { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';\nimport SearchBar from '~~features/Database/components/SearchBar';\nimport * as ".concat(_(e),"Actions from '~~features/Database/ME/").concat(_(e),"/").concat(_(e),"Redux';\nimport getColumns from './ColumnSetting';\n\nconst ").concat(_(t)," = (props) => {\n  const {\n    ").concat(a,",\n    ").concat(o,",\n    date,\n    ").concat(M(t),"List,\n  } = props;\n\n  useEffect(() => {\n    ").concat(a,"();\n  }, []);\n\n  const extendsCSDBPorps = {\n    mainTable: ").concat(M(t),"List,\n    initialSortInfo: { dataIndex: 'size', sortOrder: 'ascend' },\n    initialFilterInfo: { keyword: '', dataIndex: 'size' },\n  };\n\n  const {\n    // For table\n    isEditMode,\n    setEditMode,\n    mainTableList,\n    editModeList,\n    handleTableChange,\n    handleSetEditMode,\n    handleOnEditItem,\n    differenceList,\n    // For search bar\n    keyword,\n    setKeyword,\n    handleSearch,\n    handleResetSearchBar,\n    // For checkbox\n    showArchive,\n    setShowArchive,\n    checkboxColumn,\n    // For add modal\n    isAddModalOpen,\n    setAddModal,\n    idColumn,\n  } = useCSDB(extendsCSDBPorps);\n\n  const handleSave = () => {\n    const data = {\n      nextId: _get(date, 'nextId', false),\n      items: differenceList.map(item => ({ id: item.id, next: item.next }))\n    };\n    setEditMode(false);\n    ").concat(o,'(data);\n  };\n\n  const extendsColumnPorps = {\n    ...props,\n    isEditMode,\n    date,\n    checkboxColumn,\n    handleOnEditItem,\n    idColumn,\n  };\n\n  return (\n    <InnerContainer>\n      <div className="inner-content">\n        <div className="content-header">\n          <div className="title">\n          ').concat(_(t),'\n          </div>\n        </div>\n        <div className="content-row">\n          <InlineBtns>\n            <SearchBar\n              width="28rem"\n              placeholder="\u9019\u908a\u4f60\u8981\u81ea\u5df1\u6539\u540d\u5b57\u5594\uff0c\u6c92\u6539\u5230\u5225\u602a\u6211\uff31\uff31"\n              onInputChange={setKeyword}\n              value={keyword}\n              onSearch={handleSearch}\n              onReset={handleResetSearchBar}\n              disabled={isEditMode}\n            />\n            {/* <ArchiveSwitch\n              isChecked={showArchive}\n              onChange={() => setShowArchive(!showArchive)}\n            /> */}\n          </InlineBtns>\n          {\n            isEditMode ?\n              <InlineBtns>\n                <Button\n                  color="black"\n                  border={false}\n                  round\n                  onClick={() => handleSetEditMode(false)}\n                >Cancel\n                </Button>\n                <Button\n                  color="green"\n                  border={false}\n                  round\n                  onClick={handleSave}\n                >Save\n                </Button>\n              </InlineBtns> :\n              <InlineBtns>\n                {/* \u65b0\u589e */}\n                {/* <Icon\n                  icon={IconName.BtnAddGroup}\n                  size="2rem"\n                  onClick={() => setAddModal(true)}\n                /> */}\n                {/* \u4fee\u6539 */}\n                <Icon\n                  icon={IconName.BtnEditGroup}\n                  size="2rem"\n                  onClick={() => handleSetEditMode(true)}\n                  disabled={mainTableList.length === 0 || !date.nextId}\n                />\n                {/* \u5c01\u5b58 */}\n                {/* <Icon\n                  icon={IconName.BtnArchive}\n                  size="2rem"\n                  // onClick={() => handleArchive()}\n                  // disabled={selectedIdList.length === 0}\n                /> */}\n              </InlineBtns>\n          }\n        </div>\n        <Table\n          rowKey="id"\n          headerColor="blue"\n          columns={getColumns(extendsColumnPorps)}\n          dataSource={isEditMode ? editModeList : mainTableList}\n          pagination={false}\n          onChange={handleTableChange}\n          scroll={{ y: 500 }}\n        />\n      </div>\n    </InnerContainer>\n  );\n};\n\n\nconst mapStateToProps = (state) => {\n  return {\n    ').concat(M(t),"List: state.").concat(M(e),".").concat(M(t),".").concat(M(t),",\n    date: state.").concat(M(e),".").concat(M(t),".date,\n  };\n};\n\nconst mapDispatchToProps = {\n  ").concat(a,": ").concat(_(e),"Actions.").concat(a,",\n  ").concat(o,": ").concat(_(e),"Actions.").concat(o,",\n};\n\n\nexport default compose(\n  connect(mapStateToProps, mapDispatchToProps),\n)(").concat(_(t),");\n\n  "))};var R=function(){var n=Object(a.useState)("DieCutCleanSheet"),e=Object(S.a)(n,2),t=e[0],r=e[1],c=Object(a.useState)("TypePrice"),i=Object(S.a)(c,2),s=i[0],l=i[1],d=Object(a.useState)("getTypePrice"),m=Object(S.a)(d,2),u=m[0],p=m[1],f=Object(a.useState)("/database/diecut/typePrice"),g=Object(S.a)(f,2),h=g[0],b=g[1],E=Object(a.useState)('{\r\n"date": {},\r\n "typePrice": []\r\n}'),A=Object(S.a)(E,2),x=A[0],w=A[1],j=Object(a.useState)("putTypePrice"),M=Object(S.a)(j,2),O=M[0],P=M[1],R=Object(a.useState)("/database/diecut/modify/typePrice"),U=Object(S.a)(R,2),F=U[0],G=U[1],z=_(t),$=_(s);return o.a.createElement(v.a,null,o.a.createElement("h1",null,"\bCode Generator Single Column"),o.a.createElement(C.a,null,o.a.createElement(I.a,{id:"input-database",label:"Database",value:t,onChange:function(n){return r(n.target.value)},margin:"normal"}),o.a.createElement(I.a,{id:"input-containername",label:"Container Name",value:s,onChange:function(n){return l(n.target.value)},margin:"normal"})),o.a.createElement(C.a,null,o.a.createElement(I.a,{id:"input-getapiname",label:"Get API Name",value:u,onChange:function(n){return p(n.target.value)},margin:"normal"}),o.a.createElement(I.a,{style:{width:400},id:"input-getapiurl",label:"Get API URL",value:h,onChange:function(n){return b(n.target.value)},margin:"normal"}),o.a.createElement(I.a,{id:"input-getapijson",label:"Get API JSON",value:x,onChange:function(n){return w(n.target.value)},multiline:!0,rows:5,fullWidth:!0,margin:"normal"})),o.a.createElement(C.a,null,o.a.createElement(I.a,{id:"input-putapiname",label:"PUT API Name",value:O,onChange:function(n){return P(n.target.value)},margin:"normal"}),o.a.createElement(I.a,{style:{width:400},id:"input-putapiurl",label:"PUT API URL",value:F,onChange:function(n){return G(n.target.value)},margin:"normal"})),o.a.createElement(C.a,null,o.a.createElement("h3",null,"frontEnd/src/apis/fakeData/Fake",z,"Data.js"),o.a.createElement(y.a,{language:"javascript",style:N.a},D(u,x))),o.a.createElement(C.a,null,o.a.createElement("h3",null,"frontEnd/src/apis/resource/DatabaseResources/",z,"Resource.js"),o.a.createElement(y.a,{language:"javascript",style:N.a},B({databaseName:t,getApiName:u,getApiUrl:h,putApiName:O,putApiUrl:F}))),o.a.createElement(C.a,null,o.a.createElement("h3",null,"frontEnd/src/features/Database/ME/",z,"/",z,"Redux.js"),o.a.createElement(y.a,{language:"javascript",style:N.a},T({databaseName:t,getApiName:u,putApiName:O,containerName:s}))),o.a.createElement(C.a,null,o.a.createElement("h3",null,"frontEnd/src/features/Database/ME/",z,"/",$,"/",$,".js"),o.a.createElement(y.a,{language:"javascript",style:N.a},L({databaseName:t,containerName:s,getApiName:u,putApiName:O}))),o.a.createElement(C.a,null,o.a.createElement("h3",null,"frontEnd/src/features/Database/ME/",z,"/",$,"/ColumnSetting.js"),o.a.createElement(y.a,{language:"javascript",style:N.a},k({databaseName:t,getApiName:u,containerName:s}))))},U=function(){return O("\n\n  import React from 'react';\nimport _get from 'lodash/get';\nimport NumberInput from '~~features/Database/components/NumberInput';\nimport { comma } from '~~utils/Math';\n\n\nconst left = (props) => {\n  const {\n    isEditMode,\n    selectedColumn,\n  } = props;\n\n  return [\n    {\n      dataIndex: 'type',\n      title: '\u985e\u578b',\n      sorter: !isEditMode,\n      defaultSortOrder: 'ascend',\n      width: '90%',\n    },\n    selectedColumn\n  ];\n};\n\n\nconst right = (props) => {\n  const {\n    date,\n    isEditMode,\n    handleOnEditItem,\n  } = props;\n\n  return [\n    {\n      dataIndex: 'item',\n      title: '\u9805\u76ee',\n      width: '35%',\n      defaultSortOrder: 'ascend',\n      sorter: !isEditMode,\n    },\n    {\n      dataIndex: 'unit',\n      title: '\u55ae\u4f4d',\n      width: '15%',\n      defaultSortOrder: 'ascend',\n      sorter: !isEditMode,\n      render: (val) => val || '\uff0d',\n    },\n    {\n      title: _get(date, 'last', '\uff0d'),\n      dataIndex: 'last',\n      width: '16%',\n      sorter: !isEditMode && _get(date, 'lastId', false),\n      render: (val) => comma(val, 8, '\uff0d')\n    },\n    {\n      title: _get(date, 'current', '\uff0d'),\n      dataIndex: 'current',\n      width: '16%',\n      sorter: !isEditMode && _get(date, 'currentId', false),\n      render: (val) => comma(val, 8, '\uff0d')\n    },\n    {\n      title: _get(date, 'next', '\uff0d'),\n      dataIndex: 'next',\n      width: '16%',\n      sorter: !isEditMode && _get(date, 'nextId', false),\n      render: (val, record) => (isEditMode && _get(date, 'nextId', false) ?\n        <NumberInput\n          value={val}\n          onChange={(value) => handleOnEditItem(value, record.id, 'next')}\n        />  :\n        comma(val, 8, '\uff0d')),\n    },\n  ];\n};\n\nexport default {\n  left,\n  right,\n};\n\n  ")},F=function(n){var e=n.databaseName,t=n.containerName,a=n.getApiName,o=n.putApiName;return O("\nimport React, { Fragment, useState, useEffect } from 'react';\nimport { connect } from 'react-redux';\nimport { compose } from 'recompose';\nimport _find from 'lodash/find';\nimport { InnerContainer } from '~~features/Database/DatabaseStyles';\nimport * as ".concat(_(e),"Actions from '~~features/Database/ME/").concat(_(e),"/").concat(_(e),"Redux';\nimport useCSDB from '~~features/Database/components/useCSDB';\nimport Columns from './ColumnSetting';\nimport SideTable from './SideTable';\n\nconst ").concat(_(t)," = (props) => {\n  const {\n    ").concat(M(t),"List,\n    date,\n    ").concat(a,",\n    ").concat(o,",\n  } = props;\n  const [subItems, setSubItems] = useState([]);\n\n  useEffect(() => {\n    ").concat(a,"();\n  }, []);\n\n  const LeftExtendsCSDBPorps = {\n    mainTable: ").concat(M(t),"List,\n    initialSortInfo: { dataIndex: 'type', sortOrder: 'ascend' },\n    initialFilterInfo: { dataIndex: 'type', keyword: '' }\n  };\n\n  const RightExtendsCSDBPorps = {\n    mainTable: subItems,\n    initialSortInfo: { dataIndex: 'item', sortOrder: 'ascend' },\n    initialFilterInfo: { dataIndex: 'item', keyword: '' }\n  };\n  const leftCsdb = useCSDB(LeftExtendsCSDBPorps);\n  const rightCsdb = useCSDB(RightExtendsCSDBPorps);\n\n  const leftColumnsProps = {\n    ...leftCsdb\n  };\n\n  const rightColumnsProps = {\n    date,\n    ...rightCsdb\n  };\n\n  const leftColumns = Columns.left(leftColumnsProps);\n  const rightColumns = Columns.right(rightColumnsProps);\n\n  /**\n   * \u53d6\u5f97\u65b0\u7684\u5217\u8868\u6216\u662f\u5207\u63db\u9078\u64c7\u7684id, \u6703\u91cd\u65b0filter\u53f3\u908a\u7684talbe\n   */\n  useEffect(() => {\n    const selectedItem = _find(").concat(M(t),"List, obj => obj.id === leftCsdb.selectedRowId);\n    const newSubItems = selectedItem ? selectedItem.items : [];\n    setSubItems(newSubItems);\n  }, [JSON.stringify(").concat(M(t),"List), leftCsdb.selectedRowId]);\n\n\n  // \u5982\u679c\u5de6\u908a\u9078\u4e86\u5225\u7684rowId, \u5c31\u628a\u53f3\u908a\u7684editMode\u95dc\u6389, \u4e26\u6e05\u7a7acheckbox\n  useEffect(() => {\n    rightCsdb.setCheckedList([]);\n    rightCsdb.setEditMode(false);\n  }, [leftCsdb.selectedRowId]);\n\n  function handleRightSave(diffList) {\n    const data = {\n      nextId: date.nextId,\n      items: diffList.map(item => ({ id: item.id,  next: item.next }))\n    };\n    ").concat(o,'(data);\n  }\n\n  return (\n    <InnerContainer>\n      <div className="inner-content">\n        <div className="content-header">\n          <div className="title">').concat(_(t),'</div>\n        </div>\n        {/* \u5de6\u908a */}\n        <div className="multi-table-row">\n          <div className="multi-table-col">\n            <SideTable\n              columns={leftColumns}\n              csdb={leftCsdb}\n              placeholder="Enter Type Name"\n            />\n          </div>\n          {/* \u53f3\u908a */}\n          <div className="multi-table-col">\n            <SideTable\n              showEdit\n              date={date}\n              onSave={handleRightSave}\n              columns={rightColumns}\n              csdb={rightCsdb}\n              placeholder="Enter Item Name"\n            />\n          </div>\n        </div>\n      </div>\n\n    </InnerContainer>\n  );\n};\n\n\nconst mapStateToProps = (state) => {\n  return {\n    ').concat(M(t),"List: state.").concat(M(e),".").concat(M(t),".").concat(M(t),",\n    date: state.").concat(M(e),".").concat(M(t),".date,\n  };\n};\n\nconst mapDispatchToProps = {\n  ").concat(a,": ").concat(_(e),"Actions.").concat(a,",\n  ").concat(o,": ").concat(_(e),"Actions.").concat(o,",\n};\n\n\nexport default compose(\n  connect(mapStateToProps, mapDispatchToProps),\n)(").concat(_(t),");\n\n"))},G=function(){return O('\n  \n  import React from \'react\';\nimport Icon, { IconName } from \'~~elements/Icon\';\nimport Button from \'~~elements/Button\';\nimport Table from \'~~elements/Table\';\nimport { InlineBtns, InnerContainer } from \'~~features/Database/DatabaseStyles\';\nimport SearchBar from \'~~features/Database/components/SearchBar\';\n\nconst SideTable = (props) => {\n  const {\n    csdb,\n    date,\n    onSave,\n    columns,\n    showEdit,\n    placeholder,\n  } = props;\n\n  const {\n    // For table\n    isEditMode,\n    setEditMode,\n    mainTableList,\n    editModeList,\n    handleTableChange,\n    handleSetEditMode,\n    differenceList,\n    // For search bar\n    keyword,\n    setKeyword,\n    handleSearch,\n    handleResetSearchBar,\n    // For selected row\n    setSelectedRowId,\n  } =  csdb;\n\n\n  /**\n  * \u9ede\u64catable row\u6642\uff0c\u53d6\u5f97\u8a72material spec\u88e1\u9762\u7684material list\n  */\n  function handleRowClick(event, record) {\n    if (!isEditMode) {\n      setSelectedRowId(record.id);\n    }\n  }\n\n  /**\n   * \u66f4\u65b0table\u7684api\n   */\n  function handleSave() {\n    setEditMode(false);\n    onSave(differenceList);\n  }\n\n  return (\n    <InnerContainer isSubContainer>\n      <div className="inner-content">\n        <div className="content-row">\n          <InlineBtns>\n            <SearchBar\n              width="22rem"\n              placeholder={placeholder}\n              value={keyword}\n              onInputChange={setKeyword}\n              onSearch={() => {\n                handleSearch();\n                setSelectedRowId(\'\');\n              }}\n              onReset={handleResetSearchBar}\n              disabled={isEditMode}\n            />\n          </InlineBtns>\n          {isEditMode ?\n            /* \u7de8\u8f2f\u72c0\u614b\u7684Btns */\n            <InlineBtns>\n              <Button\n                round\n                color="black"\n                onClick={() => handleSetEditMode(false)}\n              >\n                Cancel\n              </Button>\n              <Button\n                round\n                color="green"\n                onClick={handleSave}\n              >\n                Save\n              </Button>\n            </InlineBtns> :\n            /* \u975e\u7de8\u8f2f\u72c0\u614b\u7684Btns */\n            <InlineBtns>\n              {/* \u4fee\u6539 */}\n              {showEdit &&\n                <Icon\n                  icon={IconName.BtnEditGroup}\n                  size="2rem"\n                  onClick={() => handleSetEditMode(true)}\n                  disabled={mainTableList.length === 0 || !date.nextId}\n                />}\n            </InlineBtns>\n          }\n        </div>\n        <Table\n          rowKey="id"\n          headerColor="blue"\n          hoverColor="blue"\n          columns={columns}\n          dataSource={isEditMode ? editModeList : mainTableList}\n          pagination={false}\n          onChange={handleTableChange}\n          scroll={{ y: 500 }}\n          onRow={(record) => {\n            return {\n              onClick: event => handleRowClick(event, record),\n            };\n          }}\n        />\n      </div>\n    </InnerContainer>\n  );\n};\n\nSideTable.defaultProps = {\n  date: {},\n  onSave: () => {},\n  showEdit: false\n};\n\n\nexport default SideTable;\n\n\n  \n  ')};var z=function(){var n=Object(a.useState)("DieCutCleanSheet"),e=Object(S.a)(n,2),t=e[0],r=e[1],c=Object(a.useState)("TypePrice"),i=Object(S.a)(c,2),s=i[0],l=i[1],d=Object(a.useState)("getTypePrice"),m=Object(S.a)(d,2),u=m[0],p=m[1],f=Object(a.useState)("/database/diecut/typePrice"),g=Object(S.a)(f,2),h=g[0],b=g[1],E=Object(a.useState)('{\r\n"date": {},\r\n "typePrice": []\r\n}'),A=Object(S.a)(E,2),x=A[0],w=A[1],j=Object(a.useState)("putTypePrice"),M=Object(S.a)(j,2),O=M[0],P=M[1],k=Object(a.useState)("/database/diecut/modify/typePrice"),L=Object(S.a)(k,2),R=L[0],z=L[1],$=_(t),J=_(s);return o.a.createElement(v.a,null,o.a.createElement("h1",null,"\bCode Generator Double Columns"),o.a.createElement(C.a,null,o.a.createElement(I.a,{id:"input-database",label:"Database",value:t,onChange:function(n){return r(n.target.value)},margin:"normal"}),o.a.createElement(I.a,{id:"input-containername",label:"Container Name",value:s,onChange:function(n){return l(n.target.value)},margin:"normal"})),o.a.createElement(C.a,null,o.a.createElement(I.a,{id:"input-getapiname",label:"Get API Name",value:u,onChange:function(n){return p(n.target.value)},margin:"normal"}),o.a.createElement(I.a,{style:{width:400},id:"input-getapiurl",label:"Get API URL",value:h,onChange:function(n){return b(n.target.value)},margin:"normal"}),o.a.createElement(I.a,{id:"input-getapijson",label:"Get API JSON",value:x,onChange:function(n){return w(n.target.value)},multiline:!0,rows:5,fullWidth:!0,margin:"normal"})),o.a.createElement(C.a,null,o.a.createElement(I.a,{id:"input-putapiname",label:"PUT API Name",value:O,onChange:function(n){return P(n.target.value)},margin:"normal"}),o.a.createElement(I.a,{style:{width:400},id:"input-putapiurl",label:"PUT API URL",value:R,onChange:function(n){return z(n.target.value)},margin:"normal"})),o.a.createElement(C.a,null,o.a.createElement("h3",null,"frontEnd/src/apis/fakeData/Fake",$,"Data.js"),o.a.createElement(y.a,{language:"javascript",style:N.a},D(u,x))),o.a.createElement(C.a,null,o.a.createElement("h3",null,"frontEnd/src/apis/resource/DatabaseResources/",$,"Resource.js"),o.a.createElement(y.a,{language:"javascript",style:N.a},B({databaseName:t,getApiName:u,getApiUrl:h,putApiName:O,putApiUrl:R}))),o.a.createElement(C.a,null,o.a.createElement("h3",null,"frontEnd/src/features/Database/ME/",$,"/",$,"Redux.js"),o.a.createElement(y.a,{language:"javascript",style:N.a},T({databaseName:t,getApiName:u,putApiName:O,containerName:s}))),o.a.createElement(C.a,null,o.a.createElement("h3",null,"frontEnd/src/features/Database/ME/",$,"/",J,"/",J,".js"),o.a.createElement(y.a,{language:"javascript",style:N.a},F({databaseName:t,containerName:s,getApiName:u,putApiName:O}))),o.a.createElement(C.a,null,o.a.createElement("h3",null,"frontEnd/src/features/Database/ME/",$,"/",J,"/ColumnSetting.js"),o.a.createElement(y.a,{language:"javascript",style:N.a},U({databaseName:t,getApiName:u,containerName:s}))),o.a.createElement(C.a,null,o.a.createElement("h3",null,"frontEnd/src/features/Database/ME/",$,"/",J,"/SideTable.js"),o.a.createElement(y.a,{language:"javascript",style:N.a},G({databaseName:t,getApiName:u,containerName:s}))))};var $=function(){return o.a.createElement(i.a,null,o.a.createElement(s.a,{path:"/",component:E,exact:!0}),o.a.createElement(s.a,{path:"/Col1",component:R}),o.a.createElement(s.a,{path:"/Col2",component:z}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(253);c.a.render(o.a.createElement($,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()}))},34:function(n,e,t){n.exports=t.p+"static/media/col1.a90b3d69.png"},35:function(n,e,t){n.exports=t.p+"static/media/col2.279e3769.png"},53:function(n,e,t){n.exports=t(254)}},[[53,1,2]]]);
//# sourceMappingURL=main.715fcbee.chunk.js.map