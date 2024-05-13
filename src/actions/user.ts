import { user, userState } from "../interfaces/users";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import { UserFormSchema } from "@/schemas/form";
import { z } from "zod";

export const FETCH_USER = "FETCH_USER";
export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";

const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:6_8FTBNX/users";

export const fetchUser =
  (id: string) => async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
      dispatch({
        type: FETCH_USER,
        payload: fetchUser.loading(),
      });

      const fetchedUser: user = await fetch(`${API_URL}/${id}`).then((r) =>
        r.json()
      );

      dispatch({
        type: FETCH_USER,
        payload: fetchUser.success(fetchedUser),
      });
    } catch (e: Error | any) {
      dispatch({
        type: FETCH_USER,
        payload: fetchUser.error(e),
      });
    }
  };

fetchUser.success = (user: user): userState => ({
  isError: false,
  isLoading: false,
  message: "",
  item: user,
});

fetchUser.error = (e: Error): userState => ({
  isError: true,
  isLoading: false,
  message: e.message,
  item: null,
});

fetchUser.loading = (): userState => ({
  isError: false,
  isLoading: true,
  message: "",
  item: null,
});

export const setUser = (user: user): { type: string; payload: userState } => ({
  type: SET_USER,
  payload: { isError: false, isLoading: false, message: "", item: user },
});

export const updateUser =
  (user: z.infer<typeof UserFormSchema>) =>
  async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
      await fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, user_id: user.id }),
      }).then((r) => r.json());
    } catch (e: Error | any) {
      dispatch({
        type: FETCH_USER,
        payload: fetchUser.error(e),
      });
    }
  };
