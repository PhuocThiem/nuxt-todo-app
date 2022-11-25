export const SortType: Type[] = [
  {
    id: 0,
    type: "Choose type",
  },
  {
    id: 1,
    type: "Ascending",
  },
  {
    id: 2,
    type: "Descending",
  },
];

type Type = {
  id: number;
  type: string;
};
