import {configureStore} from "@reduxjs/toolkit";

import {genreListReducer, movieReducer, additionalReducer, searchReducer, themeReducer, authReducer} from "./slices";

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