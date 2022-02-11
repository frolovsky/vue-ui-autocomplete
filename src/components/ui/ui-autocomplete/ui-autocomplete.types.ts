export interface Item {
  [key: string]: AllowedItemTypes;
}

export type AllowedItemTypes = string | number | null;
