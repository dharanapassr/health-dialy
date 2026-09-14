export type ActivityType = 
  | 'walk' 
  | 'run' 
  | 'cycle' 
  | 'workout' 
  | 'yoga' 
  | 'swim' 
  | 'housework' 
  | 'other';

export type MoodType = 'great' | 'good' | 'neutral' | 'tired' | 'stressed';

export interface DailyLog {
  id: string; // ISO date string YYYY-MM-DD
  date: string; // YYYY-MM-DD
  waterMl: number; // e.g. 1500
  exerciseMinutes: number; // e.g. 30
  exerciseType?: ActivityType;
  sleepHours: number; // e.g. 7.5
  sleepQuality?: 'refreshed' | 'normal' | 'tired';
  weightKg?: number; // e.g. 64.2
  mood?: MoodType;
  note?: string;
  updatedAt: number;
}

export interface UserProfile {
  heightCm: number; // default 165
  waterGoalMl: number; // default 2000
  exerciseGoalMin: number; // default 30
  sleepGoalHours: number; // default 7.5
  targetWeightKg?: number;
}

export interface BMICalculation {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
  labelTh: string;
  color: string;
  advice: string;
}
