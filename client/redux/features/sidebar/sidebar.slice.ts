import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MobileSideBarState {
    isOpen: boolean;
}

const sideBarInitialState: MobileSideBarState = {
    isOpen: false
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: sideBarInitialState,
    reducers: {
        toggleSidebar: (state, action: PayloadAction<boolean>) => {
            state = {
                ...state,
                isOpen: action.payload
            }
            return state;
        }
    }
})

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;