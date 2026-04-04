import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

export const login = createAsyncThunk("login", async (data, thunkAPI) => {
    try {
        const res = await axiosInstance.post("/auth/login", data);
        toast.success(res.data.message);
        return res.data.user;
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const forgotPassword = createAsyncThunk(
    "login",
    async (email, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                "/auth/password/forgot",
                email
            );
            toast.success(res.data.message);
            return null;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authUser: null,
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        isUpdatingPassword: false,
        isRequestingForToken: false,
        isCheckingAuth: true,
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoggingIn = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggingIn = false;
                state.authUser = action.payload;
            })
            .addCase(login.rejected, (state) => {
                state.isLoggingIn = false;
            });
    },
});

export default authSlice.reducer;
