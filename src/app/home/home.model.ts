export type DataBase = {
  name: string,
  tables: Table[],
  rows: any
};

export type Table = {
  tableName: string,
  elementName: string,
  color: string,
  columns: Column[]
};

export type Column = {
  name: string,
  type: string,
  required?: boolean,
  isObject?: boolean,
  isArray?: boolean,
  isHeader?: boolean
};

export type CurrentElement = {
  content: any | null
  isArray: boolean,
  table: Table | null,
};