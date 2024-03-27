import {configureStore} from "@reduxjs/toolkit";

import {genreListReducer, movieReducer, additionalReducer, searchReducer} from "./slices";
import {themeReducer} from "./slices/themeSlice";
import {authReducer} from "./slices/authSlice";

const store = configureStore({
    reducer: {
        movie: movieReducer,
        genreList: genreListReducer,
        additional: additionalReducer,
        searchMovie: searchReducer,
        theme: themeReducer,
        auth: authReducer
    }
})

export {
    store
}