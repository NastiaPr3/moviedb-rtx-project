import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMovie, IMovies, ITrailer, IVideos, IImage, IImages, IPeople, IPerson, IActor} from "../../interfaces";
import {trendingMovieService} from "../../services";

interface IState {
    trending: IMovie[],
    nowPlaying: IMovie[],
    selected: IMovie,
    def: IMovie,
    trailer: ITrailer[],
    images: IImage[],
    people: IPerson[],
    director: IPerson[],
    actor: IMovie[],
    recommended: IMovie[]
}

const initialState: IState = {
    trending: [],
    nowPlaying: [],
    selected: {},
    def: {},
    trailer: null,
    images: [],
    people: [],
    director: [],
    actor: [],
    recommended: []
}

const trendingMovies = createAsyncThunk<IMovies<IMovie>, void>(
    'additionalSlice/trendingMovies',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await trendingMovieService.getTrendingMovies();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const nowPlayingMovies = createAsyncThunk<IMovies<IMovie>, void>(
    'additionalSlice/nowPlayingMovies',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await trendingMovieService.getNowPlayingMovies();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getTrailer = createAsyncThunk<IVideos<ITrailer>, number>(
    'additionalSlice/getTrailer',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await trendingMovieService.getTrailer(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getImages = createAsyncThunk<IImages<IImage>, number>(
    'additionalSlice/getImages',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await trendingMovieService.getImages(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getPerson = createAsyncThunk<IPeople<IPerson>, number>(
    'additionalSlice/getPerson',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await trendingMovieService.getCast(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getActorMovies = createAsyncThunk<IActor<IMovie>, number>(
    'additionalSlice/getActorMovies',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await trendingMovieService.getActorsMovies(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getRecommendedMovies = createAsyncThunk<IMovies<IMovie>, number>(
    'additionalSlice/getRecommendedMovies',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await trendingMovieService.getRecommendations(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const additionalSlice = createSlice({
    name: 'additionalSlice',
    initialState,
    reducers: {
        setMovie: (state, action) => {
            state.selected = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(trendingMovies.fulfilled, (state, action) => {
                state.trending = action.payload.results
            })
            .addCase(nowPlayingMovies.fulfilled, (state, action) => {
                state.nowPlaying = action.payload.results
                state.def = action.payload.results.pop()
            })
            .addCase(getTrailer.fulfilled, (state, action) => {
                state.trailer = action.payload.results
            })
            .addCase(getImages.fulfilled, (state, action) => {
                state.images = action.payload.backdrops
            })
            .addCase(getPerson.fulfilled, (state, action) => {
                state.people = action.payload.credits.cast
                state.director = action.payload.credits.crew

            })
            .addCase(getActorMovies.fulfilled, (state, action) => {
                state.actor = action.payload.cast
            })
            .addCase(getRecommendedMovies.fulfilled, (state, action) => {
                state.recommended = action.payload.results.slice(0, 10)
            })
    }
})

const {reducer: additionalReducer, actions} = additionalSlice;

const additionalActions = {
    ...actions,
    trendingMovies,
    nowPlayingMovies,
    getTrailer,
    getImages,
    getPerson,
    getActorMovies,
    getRecommendedMovies
}

export {
    additionalReducer,
    additionalActions
}
