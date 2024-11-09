import { Verdict } from 'src/models/verdict';

export const mapApiVerdictToModel = (apiVerdict: any): Verdict => {
  return {
    id: apiVerdict.id,
    orientation: apiVerdict.orientation,
    interpretation: apiVerdict.interpretation,
    psychological_profile: apiVerdict.psychological_profil,
    technical_profile: apiVerdict.technical_profile,
    literary_profile: apiVerdict.literary_profile,
    scientific_profile: apiVerdict.scientific_profile,
    success_model: apiVerdict.success_model,
  };
};