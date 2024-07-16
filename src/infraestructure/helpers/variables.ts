export function objectToVariables(obj: { [key: string]: any }): { name: string; value: any }[] {
  return Object.keys(obj).map(key => ({
    name: key,
    value: obj[key],
  }));
}

export function variablesToObject(vars: { name: string; value: any }[]): {
  [key: string]: any;
} {
  return vars.reduce((acc, curr) => {
    acc[curr.name] = curr.value;
    return acc;
  }, {});
}
