export type Weather = 'rainy' | 'cloudy' | 'sunny' | 'windy' | 'stormy';

export type Visibility = 'ok' | 'good' | 'poor' | 'great';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}
