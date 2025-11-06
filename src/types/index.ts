export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
  department?: string;
  location?: string;
  [key: string]: string | number | boolean | undefined; // To allow for dynamic columns
}

export interface Column {
  key: keyof User;
  label: string;
  visible: boolean;
  sortable: boolean;
}

export interface SortConfig {
  key: keyof User;
  direction: "ascending" | "descending";
}
