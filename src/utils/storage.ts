import { DailyLog, UserProfile } from '../types';

const STORAGE_KEY_LOGS = 'daily_health_logs_v2';
const STORAGE_KEY_PROFILE = 'daily_health_profile_v2';

export const DEFAULT_PROFILE: UserProfile = {
  heightCm: 165,
  waterGoalMl: 2000,
  exerciseGoalMin: 30,
  sleepGoalHours: 7.5,
  targetWeightKg: 60,
};

export function getTodayKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatThaiDate(dateStr: string, includeYear: boolean = true): string {
  try {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const monthNames = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];

    const thaiYear = year + 543;
    if (includeYear) {
      return `${day} ${monthNames[month]} ${thaiYear}`;
    }
    return `${day} ${monthNames[month]}`;
  } catch {
    return dateStr;
  }
}

export function formatThaiFullDate(date: Date = new Date()): string {
  const dayNames = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  const dayName = dayNames[date.getDay()];
  const d = date.getDate();
  const m = monthNames[date.getMonth()];
  const y = date.getFullYear() + 543;
  return `${dayName}ที่ ${d} ${m} ${y}`;
}

export function getInitialLogs(): DailyLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading logs from localStorage:', err);
  }

  // Pre-seed some friendly recent history for immediate visual richness
  const today = new Date();
  const sampleLogs: DailyLog[] = [];

  const pastData = [
    { daysAgo: 5, water: 1750, exercise: 25, type: 'walk' as const, sleep: 7.0, weight: 63.8, mood: 'good' as const, note: 'เดินรอบสวนสาธารณะช่วงเย็น สบายตัว' },
    { daysAgo: 4, water: 2000, exercise: 40, type: 'workout' as const, sleep: 7.5, weight: 63.6, mood: 'great' as const, note: 'ดื่มน้ำครบ 2 ลิตร รู้สึกกระปรี้กระเปร่า' },
    { daysAgo: 3, water: 1500, exercise: 20, type: 'yoga' as const, sleep: 6.5, weight: 63.5, mood: 'neutral' as const, note: 'งานเยอะ แต่งตัวไปยืดกล้ามเนื้อ 20 นาที' },
    { daysAgo: 2, water: 2250, exercise: 45, type: 'cycle' as const, sleep: 8.0, weight: 63.2, mood: 'great' as const, note: 'ปั่นจักรยานรับลม นอนหลับสนิทมาก' },
    { daysAgo: 1, water: 1800, exercise: 30, type: 'run' as const, sleep: 7.0, weight: 63.0, mood: 'good' as const, note: 'วิ่งเบาๆ ตอนเช้า อากาศดี' },
  ];

  pastData.forEach((item) => {
    const d = new Date(today);
    d.setDate(today.getDate() - item.daysAgo);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateKey = `${y}-${m}-${day}`;

    sampleLogs.push({
      id: dateKey,
      date: dateKey,
      waterMl: item.water,
      exerciseMinutes: item.exercise,
      exerciseType: item.type,
      sleepHours: item.sleep,
      sleepQuality: 'refreshed',
      weightKg: item.weight,
      mood: item.mood,
      note: item.note,
      updatedAt: d.getTime(),
    });
  });

  // Also include today's starter log with initial values
  const todayKey = getTodayKey();
  sampleLogs.push({
    id: todayKey,
    date: todayKey,
    waterMl: 1000,
    exerciseMinutes: 20,
    exerciseType: 'walk',
    sleepHours: 7.5,
    sleepQuality: 'refreshed',
    weightKg: 62.8,
    mood: 'good',
    note: 'เริ่มต้นวันใหม่อย่างสดใส ดื่มน้ำแก้วแรกแล้ว',
    updatedAt: Date.now(),
  });

  try {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(sampleLogs));
  } catch (err) {
    console.error('Error saving sample logs:', err);
  }

  return sampleLogs;
}

export function saveLogs(logs: DailyLog[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
    return true;
  } catch (err) {
    console.error('Failed to save logs to localStorage', err);
    return false;
  }
}

export function getProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (raw) {
      return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.error('Error reading profile from localStorage:', err);
  }
  return DEFAULT_PROFILE;
}

export function saveProfile(profile: UserProfile): boolean {
  try {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    return true;
  } catch (err) {
    console.error('Failed to save profile to localStorage', err);
    return false;
  }
}

export function calculateStreak(logs: DailyLog[]): number {
  if (!logs || logs.length === 0) return 0;
  
  const loggedDates = new Set(
    logs
      .filter((l) => l.waterMl > 0 || l.exerciseMinutes > 0 || l.sleepHours > 0 || (l.weightKg && l.weightKg > 0))
      .map((l) => l.date)
  );

  let streak = 0;
  const cursor = new Date();
  
  // Check if today or yesterday has a log to maintain streak
  const todayStr = getTodayKey();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yY = yesterday.getFullYear();
  const yM = String(yesterday.getMonth() + 1).padStart(2, '0');
  const yD = String(yesterday.getDate()).padStart(2, '0');
  const yesterdayStr = `${yY}-${yM}-${yD}`;

  let checkDate = cursor;
  if (!loggedDates.has(todayStr)) {
    if (loggedDates.has(yesterdayStr)) {
      checkDate = yesterday;
    } else {
      return 0;
    }
  }

  while (true) {
    const y = checkDate.getFullYear();
    const m = String(checkDate.getMonth() + 1).padStart(2, '0');
    const d = String(checkDate.getDate()).padStart(2, '0');
    const key = `${y}-${m}-${d}`;

    if (loggedDates.has(key)) {
      streak += 1;
      checkDate = new Date(checkDate);
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
