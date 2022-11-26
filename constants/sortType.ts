export const SORT_TYPE: Type[] = [
  {
    id: 0,
    type: 'Choose type',
  },
  {
    id: 1,
    type: 'Ascending',
  },
  {
    id: 2,
    type: 'Descending',
  },
];

export type Type = {
  id: number;
  type: string;
};

export const SORT_FIELD = {
  TITLE: 'Title',
  EXPIRED_DATE: 'ExpiredDate',
};
