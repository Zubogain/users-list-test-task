import { PayloadAction } from "@reduxjs/toolkit";
import { userState } from "../interfaces/users";
import { FETCH_USER } from "../actions/user";

const initialState: userState = {
  isLoading: false,
  isError: false,
  message: "",
  item: null,
};

export default function reducer(
  state = initialState,
  action: PayloadAction<any>
) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
