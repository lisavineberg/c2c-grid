type Cell = {
  color: string;
};

export type Pattern = {
  name: string;
  rows: number;
  columns: number;
  storedColors: string[];
  cells: Cell[];
  creatorId: string;
  patternId: string;
  isPublic: boolean;
};
