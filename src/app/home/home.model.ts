export type DataBase = {
  name: string,
  tables: Table[],
  rows: any
};

export type Table = {
  tableName: string,
  elementName: string,
  color: string,
  contrast: string,
  columns: Column[]
};

export type Column = {
  name: string,
  type: string | Table,
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

export type Property = { 
  isHeader: boolean | undefined, 
  isObject: boolean, 
  isArray: boolean, 
  color?: string,
  contrast?: string,
  key: string, 
  value: any 
};