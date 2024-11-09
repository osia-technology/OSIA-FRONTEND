import { RootState } from 'src/app/store';
import { Verdict } from 'src/models/verdict';

export const selectVerdict = (state: RootState): Verdict => {
  return state.verdicts.verdicts;
};