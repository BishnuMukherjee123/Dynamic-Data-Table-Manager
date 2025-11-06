import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Column } from "@/types";
import type { User } from "@/types";

interface ColumnsState {
  columns: Column[];
}

const initialState: ColumnsState = {
  columns: [],
};

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    toggleColumnVisibility: (
      state,
      action: PayloadAction<{ key: keyof User; visible: boolean }>
    ) => {
      const column = state.columns.find((c) => c.key === action.payload.key);
      if (column) {
        column.visible = action.payload.visible;
      }
    },
    addColumn: (state, action: PayloadAction<Column>) => {
      state.columns.push(action.payload);
    },
    reorderColumns: (
      state,
      action: PayloadAction<{ draggedKey: keyof User; targetKey: keyof User }>
    ) => {
      const { draggedKey, targetKey } = action.payload;
      const draggedIndex = state.columns.findIndex((c) => c.key === draggedKey);
      const targetIndex = state.columns.findIndex((c) => c.key === targetKey);

      if (draggedIndex !== -1 && targetIndex !== -1) {
        const [removed] = state.columns.splice(draggedIndex, 1);
        state.columns.splice(targetIndex, 0, removed);
      }
    },
  },
});

export const { setColumns, toggleColumnVisibility, addColumn, reorderColumns } =
  columnsSlice.actions;

export default columnsSlice.reducer;
