import prettier from "prettier/standalone";
import parserBable from 'prettier/parser-babylon';

export const upperCaseFirstChar = (s = '') => s.charAt(0).toUpperCase() + s.slice(1);
export const lowerCaseFirstChar = (s = '') => s.charAt(0).toLowerCase() + s.slice(1);
export const format = (js) => {
  try {
    return prettier.format(js, {
      parser: 'babel',
      plugins: [parserBable],
      trailingComma: 'all',
      singleQuote: true,
      printWidth: 200,
    })
  } catch (e) {
    return '// prettier 有錯誤' + e.toString();
  }
};
export const splitCamel = (str) => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1_').toUpperCase();