import { splitCamel, format, upperCaseFirstChar, lowerCaseFirstChar } from './utils';

export default ({databaseName, getApiName, putApiName, containerName}) => {
    return format(`
    
    import { handleActions } from 'redux-actions';
  import {
    Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin,
  } from 'rxjs';
  import { ofType } from 'redux-observable';
  import {
    mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay,
  } from 'rxjs/operators';
  import Resource from '~~apis/resource';
  import * as LoadingActions from '~~redux/Loading/LoadingActions';
  import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
  
  const actionTypes = {
    ${splitCamel(databaseName)}___${splitCamel(getApiName)}: '${splitCamel(databaseName)}___${splitCamel(getApiName)}',
    ${splitCamel(databaseName)}___${splitCamel(getApiName)}_SUCCESS: '${splitCamel(databaseName)}___${splitCamel(getApiName)}_SUCCESS',
    ${splitCamel(databaseName)}___${splitCamel(putApiName)}: '${splitCamel(databaseName)}___${splitCamel(putApiName)}',
  };
  
  export const ${getApiName} = () => {
    return {
      type: actionTypes.${splitCamel(databaseName)}___${splitCamel(getApiName)},
    };
  };
  
  export const ${getApiName}Success = (response) => {
    return {
      type: actionTypes.${splitCamel(databaseName)}___${splitCamel(getApiName)}_SUCCESS,
      ...response.data
    };
  };
  
  export const ${putApiName} = (data) => {
    return {
      type: actionTypes.${splitCamel(databaseName)}___${splitCamel(putApiName)},
      data
    };
  };
  
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
  
  // material price reducer
  const ${splitCamel(databaseName)}___${splitCamel(getApiName)}_SUCCESS = (state, payload) => {
    return {
      ...state,
      ${lowerCaseFirstChar(containerName)}: {
        ...state.${lowerCaseFirstChar(containerName)},
        ...payload,
      }
    };
  };
  
  
  const initial${upperCaseFirstChar(containerName)} = {
    date: {},
    ${lowerCaseFirstChar(containerName)}: [],
  };
  
  const initialState = {
    ${lowerCaseFirstChar(containerName)}: initial${upperCaseFirstChar(containerName)},
  };
  
  export const reducer = handleActions({
    ${splitCamel(databaseName)}___${splitCamel(getApiName)}_SUCCESS,
  }, initialState);
  
  export const epics = [
    ${getApiName}Epic,
    ${putApiName}Epic,
  ];
  
    
    `);
  }