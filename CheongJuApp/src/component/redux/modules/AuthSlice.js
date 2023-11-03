import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayName : null,
    photoURL : null,
}


const authSlice = createSlice({
    name : 'userInfo',
    initialState,
    reducers : {
        selectDisplayName : (state, action) => { state.displayName = action.payload; },
        selectPhotoURL : (state, action) => { state.photoURL = action.payload; },
    }
})

export const {selectDisplayName, selectPhotoURL} = authSlice.actions;
export default authSlice.reducer;