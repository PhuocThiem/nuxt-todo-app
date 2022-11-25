export const SortType: Type[] = [
  {
    id: 0,
    type: "Ascending",
  },
  {
    id: 1,
    type: "Descending",
  },
];

type Type = {
  id: number;
  type: string;
};
