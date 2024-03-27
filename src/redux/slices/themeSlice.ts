import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem('theme') || 'light'
}

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        toggleTheme: state => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
        }
    }
})

const {reducer: themeReducer, actions} = themeSlice;

const themeActions = {
    ...actions
}

export {
    themeActions,
    themeReducer
}