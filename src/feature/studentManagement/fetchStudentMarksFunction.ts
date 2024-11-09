import { StudentMark } from 'src/models/studentMark';

export const mapApiStudentMarksToModel = (apiStudentMarks: any): StudentMark => {
  return {
    subject: apiStudentMarks.subject,
    score: apiStudentMarks.score
  };
};