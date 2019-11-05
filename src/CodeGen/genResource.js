import { format, upperCaseFirstChar, } from './utils';

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