import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSchoolSidebarOpen: false,
    isAdminSidebarOpen: false
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSchoolSidebar(state) {
            state.isSchoolSidebarOpen = !state.isSchoolSidebarOpen;
        },
        toggleAdminSidebar(state) {
            state.isAdminSidebarOpen = !state.isAdminSidebarOpen;
        },
        openSchoolSidebar(state) {
            state.isSchoolSidebarOpen = true;
        },
        closeSchoolSidebar(state) {
            state.isSchoolSidebarOpen = false;
        },
        openAdminSidebar(state) {
            state.isAdminSidebarOpen = true;
        },
        closeAdminSidebar(state) {
            state.isAdminSidebarOpen = false;
        }
    }
});

export const {
    toggleSchoolSidebar,
    toggleAdminSidebar,
    openSchoolSidebar,
    closeSchoolSidebar,
    openAdminSidebar,
    closeAdminSidebar
} = sidebarSlice.actions;

export const sidebarSliceSelector = (state) => state.sidebar
export default sidebarSlice.reducer;
