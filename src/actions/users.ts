import { user, usersState } from "../interfaces/users";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

export const FETCH_USERS = "FETCH_USERS";

const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:6_8FTBNX/users";

export const fetchUsers =
  () => async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
      dispatch({
        type: FETCH_USERS,
        payload: fetchUsers.loading(),
      });

      const fetchedUsers: user[] = await fetch(API_URL).then((r) => r.json());

      dispatch({
        type: FETCH_USERS,
        payload: fetchUsers.success(fetchedUsers),
      });
    } catch (e: Error | any) {
      dispatch({
        type: FETCH_USERS,
        payload: fetchUsers.error(e),
      });
      console.error(e);
    }
  };

fetchUsers.success = (users: user[]): usersState => ({
  isError: false,
  isLoading: false,
  message: "",
  items: users,
});

fetchUsers.error = (e: Error): usersState => ({
  isError: true,
  isLoading: false,
  message: e.message,
  items: null,
});

fetchUsers.loading = (): usersState => ({
  isError: false,
  isLoading: true,
  message: "",
  items: null,
});
