import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    messages: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

// Create new message
export const createMessage = createAsyncThunk(
    "messages/create",
    async (messageData, thunkAPI) => {
        try {
            const response = await axios.post("/api/messages", messageData);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get all messages (Admin)
export const getMessages = createAsyncThunk(
    "messages/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get("/api/messages", config);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete message (Admin)
export const deleteMessage = createAsyncThunk(
    "messages/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`/api/messages/${id}`, config);
            return id;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.messages.push(action.payload);
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.messages = action.payload;
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.messages = state.messages.filter(
                    (message) => message._id !== action.payload
                );
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = messageSlice.actions;
export default messageSlice.reducer;
