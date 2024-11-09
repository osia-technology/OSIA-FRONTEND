import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Verdict } from 'src/models/verdict';

interface VerdictState {
  verdicts: Verdict[];
}

const initialState: VerdictState = {
  verdicts: [],
};

const verdictSlice = createSlice({
  name: 'verdicts',
  initialState,
  reducers: {

    setVerdicts: (state, action: PayloadAction<Verdict[]>) => {
      state.verdicts = action.payload;
    },
    clearVerdicts: (state) => {
      state.verdicts = [];
    },

  }
});

export const { setVerdicts, clearVerdicts } = verdictSlice.actions;
export default verdictSlice.reducer;
