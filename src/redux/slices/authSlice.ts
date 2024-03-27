import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {authService} from "../../services";
import {IMovie, IMovies, IRequestToken, IAccount, ISession, IFavorite} from "../../interfaces";

interface IState {
    req: string,
    sessionId: string
    accountId: number,
    movies: IMovie[],
}

const initialState: IState = {
    req: null,
    sessionId: null,
    accountId: null,
    movies: [],
}

const getRequestToken = createAsyncThunk<IRequestToken, void>(
    'authSlice/getRequestToken',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await authService.getRequestToken();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const createSession = createAsyncThunk<ISession, string>(
    'authSlice/createSession',
    async (reqToken, {rejectWithValue}) => {
        try {
            const {data} = await authService.createSession(reqToken);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getAccountDetails = createAsyncThunk<IAccount, string>(
    'authSlice/getAccountDetails',
    async (sessId, {rejectWithValue}) => {
        try {
            const {data} = await authService.getAccountDetails(sessId);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const addFavoriteMovie = createAsyncThunk<IFavorite, { accountId: string, sessionId: string, movieId: number }>(
    'authSlice/addFavoriteMovie',
    async ({accountId, sessionId, movieId}, {rejectWithValue}) => {
        try {
            const {data} = await authService.addFavorite(accountId, sessionId, movieId);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const deleteFavoriteMovie = createAsyncThunk<IFavorite, { accountId: string, sessionId: string, movieId: number }>(
    'authSlice/addFavoriteMovie',
    async ({accountId, sessionId, movieId}, {rejectWithValue}) => {
        try {
            const {data} = await authService.deleteFavorite(accountId, sessionId, movieId);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const getFavoriteMovies = createAsyncThunk<IMovies<IMovie>, { accountId: string, sessionId: string }>(
    'authSlice/getFavoriteMovies',
    async ({accountId, sessionId}, {rejectWithValue}) => {
        try {
            const {data} = await authService.getFavoriteMovies(accountId, sessionId);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const deleteSession = createAsyncThunk<boolean, string>(
    'authSlice/deleteSession',
    async (sessionId, {rejectWithValue}) => {
        try {
            const {data} = await authService.deleteSession(sessionId);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getRequestToken.fulfilled, (state, action) => {
                state.req = action.payload.request_token
            })
            .addCase(createSession.fulfilled, (state, action) => {
                state.sessionId = action.payload.session_id
            })
            .addCase(getAccountDetails.fulfilled, (state, action) => {
                state.accountId = action.payload.id
            })
            .addCase(getFavoriteMovies.fulfilled, (state, action) => {
                state.movies = action.payload.results
            })
    }
})

const {reducer: authReducer, actions} = authSlice;

const authActions = {
    ...actions,
    getRequestToken,
    createSession,
    getAccountDetails,
    addFavoriteMovie,
    deleteFavoriteMovie,
    getFavoriteMovies,
    deleteSession
}

export {
    authReducer,
    authActions
}