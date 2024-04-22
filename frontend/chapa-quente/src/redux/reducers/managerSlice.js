import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'managerProduto',
    initialState: {},
    reducers: {
        setChangeState(state, action) {
            state.currentState = action.payload
        }
    }
})

export const { updateFormField, resetForm, copyDataFromProduto } = slice.actions
export default slice.reducer