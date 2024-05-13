import { dataFetchWrapper } from "./state";

type skills = {
  id: string;
  text: string;
};

// basic user object interface
export interface user {
  id: number;
  name: string;
  surname: string;
  email: string;
  skills: Array<skills>;
  created_at: string;
}

export interface UsersTableProps {}

export interface UserFormProps {
  id?: string;
}

export interface userState extends dataFetchWrapper {
  item: user | null;
}

export interface usersState extends dataFetchWrapper {
  items: user[] | null;
}
