import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<User> }>
    ) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          ...action.payload.updates,
        };
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
    importUsers: (state, action: PayloadAction<User[]>) => {
      state.users = [...state.users, ...action.payload];
    },
    updateMultipleUsers: (
      state,
      action: PayloadAction<Record<number, Partial<User>>>
    ) => {
      Object.entries(action.payload).forEach(([id, updates]) => {
        const index = state.users.findIndex((u) => u.id === Number(id));
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...updates };
        }
      });
    },
  },
});

export const {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  importUsers,
  updateMultipleUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
