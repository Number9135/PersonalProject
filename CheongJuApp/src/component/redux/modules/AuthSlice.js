import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayName : null,
    photoURL : null,
    userEmail : null,
}

console.log('displayName state 값 : ', initialState.displayName)


const authSlice = createSlice({
    name : 'userInfo',
    initialState,
    reducers : {
        selectDisplayName : (state, action) => { state.displayName = action.payload; },
        selectPhotoURL : (state, action) => { state.photoURL = action.payload; },
        selectUserEmail : (state, action) => { state.userEmail = action.payload; },
    }
})

export const {selectDisplayName, selectPhotoURL, selectUserEmail} = authSlice.actions;
export default authSlice.reducer;