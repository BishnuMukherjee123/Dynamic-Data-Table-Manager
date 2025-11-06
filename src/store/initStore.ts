import { store } from "./index";
import { INITIAL_USERS, INITIAL_COLUMNS } from "@/constants";
import { setUsers } from "./slices/usersSlice";
import { setColumns } from "./slices/columnsSlice";
import { setTheme } from "./slices/uiSlice";

// Initialize store with default data if empty
export function initStore() {
  const state = store.getState();

  // Only initialize if store is empty (first load)
  if (state.users.users.length === 0) {
    store.dispatch(setUsers(INITIAL_USERS));
  }

  if (state.columns.columns.length === 0) {
    store.dispatch(setColumns(INITIAL_COLUMNS));
  }

  // Initialize theme if not set
  if (!state.ui.theme) {
    const savedTheme =
      typeof window !== "undefined"
        ? localStorage.getItem("persist:root")
          ? JSON.parse(localStorage.getItem("persist:root") || "{}")?.ui
            ? JSON.parse(
                JSON.parse(localStorage.getItem("persist:root") || "{}").ui ||
                  "{}"
              )?.theme
            : "light"
          : "light"
        : "light";
    store.dispatch(setTheme(savedTheme || "light"));
  }
}
