import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTeacherService, fetchSchoolTeachers } from "../schoolServices";

// Thunk to fetch the list of school teachers
export const getListSchoolTeachers = createAsyncThunk(
  "school/getListSchoolTeachers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetchSchoolTeachers(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to create multiple teachers
export const createTeachers = createAsyncThunk(
  "school/createTeachers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createTeacherService(data);
      return response; // Response is expected to be an array of results
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  teachers: [],
  isLoading: false,
  error: null,
  bulkCreateResults: [], 
};

const schoolSlice = createSlice({
  name: "school",
  initialState :initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching school teachers
      .addCase(getListSchoolTeachers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListSchoolTeachers.fulfilled, (state, action) => {
        state.teachers = action.payload.list;
        state.isLoading = false;
      })
      .addCase(getListSchoolTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle creating multiple teachers
      .addCase(createTeachers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTeachers.fulfilled, (state, action) => {
        const successfulCreations = action.payload.filter(result => result.success);
        const failedCreations = action.payload.filter(result => !result.success);
        
       state.bulkCreateResults = action.payload;
        state.isLoading = false;
      })
      .addCase(createTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const schoolSelector = (state) => state.school;
export default schoolSlice.reducer;
