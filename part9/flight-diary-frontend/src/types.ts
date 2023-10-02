export type Weather = 'rainy' | 'cloudy' | 'sunny' | 'windy';

export type Visibility = 'good' | 'poor';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}