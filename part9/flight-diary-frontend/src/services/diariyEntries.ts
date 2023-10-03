import axios from 'axios';

import { DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api';

export const getAllDiaryEntries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl + '/diaries')
    .then((res) => {
      return res.data;
    });
};

export const createEntry = (entryToAdd: DiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl + '/diaries', entryToAdd)
    .then((res) => res.data)
}
