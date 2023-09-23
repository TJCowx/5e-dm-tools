type SelectQueryArgs = {
  queryName: string;
  queryArgs?: Record<string, unknown>;
  valueKey: string;
  textKey: string;
};

export default SelectQueryArgs;
