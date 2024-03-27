import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMovie, IMovies} from "../../interfaces";
import {searchService} from "../../services";

interface IState {
    search: IMovie[],
    totalPage: number
}

const initialState: IState = {
    search: [],
    totalPage: null
}

const search = createAsyncThunk<IMovies<IMovie>, { movieName: string, page: string }>(
    'searchSlice/search',
    async ({movieName, page}, {rejectWithValue}) => {
        try {
            const {data} = await searchService.getMoviesBySearch(movieName, page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(search.fulfilled, (state, action) => {
                state.search = action.payload.results
                state.totalPage = action.payload.total_pages
            })

    }
})

const {reducer: searchReducer, actions} = searchSlice;

const searchActions = {
    ...actions,
    search
}

export {
    searchReducer,
    searchActions
}
