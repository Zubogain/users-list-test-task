import { PayloadAction } from "@reduxjs/toolkit";
import { usersState } from "../interfaces/users";
import { FETCH_USERS } from "../actions/users";

const initialState: usersState = {
  isLoading: false,
  isError: false,
  message: "",
  items: null,
};

export default function reducer(
  state = initialState,
  action: PayloadAction<any>
) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
