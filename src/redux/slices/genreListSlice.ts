import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {IGenres, IGenresList, IMovie, IMovies} from "../../interfaces";
import {genreService} from "../../services";

interface IState {
    genres: IGenres[],
    genreMovieList: IMovie[]
}

const initialState: IState = {
    genres: [],
    genreMovieList: []
}

const getGenresList = createAsyncThunk<IGenresList<IGenres>, void>(
    'genreListSlice/getGenresList',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getAllGenres();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getMovieListByGenreId = createAsyncThunk<IMovies<IMovie>, { id: number, page: string }>(
    'genreListSlice/getMovieListByGenreId',
    async ({id, page}, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getGenresById(id, page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const genreListSlice = createSlice({
    name: 'genreListSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getGenresList.fulfilled, (state, action) => {
                state.genres = action.payload.genres
            })
            .addCase(getMovieListByGenreId.fulfilled, (state, action) => {
                state.genreMovieList = action.payload.results
            })

    }
})

const {reducer: genreListReducer, actions} = genreListSlice;

const genreListActions = {
    ...actions,
    getGenresList,
    getMovieListByGenreId
}

export {
    genreListActions,
    genreListReducer
}

