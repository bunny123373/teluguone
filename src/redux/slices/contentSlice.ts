import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContent } from "@/models/Content";

interface ContentState {
  list: IContent[];
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  list: [],
  loading: false,
  error: null,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<IContent[]>) => {
      state.list = action.payload;
    },
    addContent: (state, action: PayloadAction<IContent>) => {
      state.list.unshift(action.payload);
    },
    updateContent: (state, action: PayloadAction<IContent>) => {
      const index = state.list.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    removeContent: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item._id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setContent, addContent, updateContent, removeContent, setLoading, setError } =
  contentSlice.actions;

export default contentSlice.reducer;
