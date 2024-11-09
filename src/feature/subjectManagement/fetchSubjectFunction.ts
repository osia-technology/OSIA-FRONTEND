import { Subject } from 'src/models/subject';

export const mapApiSubjectToModel = (apiSubject: any): Subject => {
  return {
    id: apiSubject.id,
    title: apiSubject.title,
    code: apiSubject.code,
    created_at: apiSubject.created_at,
  };
};