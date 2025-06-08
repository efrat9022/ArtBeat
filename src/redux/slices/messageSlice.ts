import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  type: 'success' | 'error' | '';
  text: string;
}

const initialState: Message = {
  type: '',
  text: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<Message>) => {
      state.type = action.payload.type;
      state.text = action.payload.text;
    },
    clearMessage: (state) => {
      state.type = '';
      state.text = '';
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
