import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  search: string;
  category: string;
  typeFilter: "all" | "movie" | "series";
  sidebarOpen: boolean;
}

const initialState: UIState = {
  search: "",
  category: "",
  typeFilter: "all",
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<"all" | "movie" | "series">) => {
      state.typeFilter = action.payload;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    clearFilters: (state) => {
      state.search = "";
      state.category = "";
      state.typeFilter = "all";
    },
  },
});

export const { setSearch, setCategory, setTypeFilter, setSidebarOpen, clearFilters } =
  uiSlice.actions;

export default uiSlice.reducer;
