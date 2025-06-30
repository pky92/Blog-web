import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       
    error:null,
    loading:false,
    user:null
}

const userSlice = createSlice({
    name:'user',
    initialState : initialState,
    reducers : {
        siginStart : (state)=> {
            state.loading=true;
            state.error = null;
        },
        signinSuccess: (state , action) =>{
            state.loading = false;
            state.user = action.payload;
            state.error = null
        },
         signinFailure: (state , action) =>{
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const {signinStart , signinFailure , signinSuccess} = userSlice.actions ;

export default userSlice.reducer ;