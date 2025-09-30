import Handlebars from 'handlebars';

const handlebars = Handlebars;

handlebars.registerHelper('add', function (a: number, b: number) {
  return a + b;
});

handlebars.registerHelper('gt', function (a: number, b: number) {
  return a > b;
});

handlebars.registerHelper('gte', function (a: number, b: number) {
  return a >= b;
});

handlebars.registerHelper('lt', function (a: number, b: number) {
  return a < b;
});

handlebars.registerHelper('lte', function (a: number, b: number) {
  return a <= b;
});

handlebars.registerHelper('eq', function (a: number, b: number) {
  return a === b;
});

handlebars.registerHelper('ne', function (a: number, b: number) {
  return a !== b;
});

handlebars.registerHelper('or', function (a: boolean, b: boolean) {
  return a || b;
});

handlebars.registerHelper('and', function (a: boolean, b: boolean) {
  return a && b;
});

handlebars.registerHelper('not', function (a: boolean) {
  return !a;
});

handlebars.registerHelper('contains', function (a: string, b: string) {
  return a.includes(b);
});

handlebars.registerHelper('startWith', function (val: string, search: string) {
  return val.startsWith(search);
});

handlebars.registerHelper('endWith', function (val: string, search: string) {
  return val.endsWith(search);
});

handlebars.registerHelper(
  'replace',
  function (val: string, search: string, replace: string) {
    return val.replace(search, replace);
  },
);

handlebars.registerHelper('json', function (val: any) {
  return JSON.stringify(val);
});

export { handlebars };
