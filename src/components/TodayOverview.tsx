import React from 'react';
import { CheckCircle2, Droplets, Dumbbell, Moon, Scale } from 'lucide-react';
import { DailyLog, UserProfile } from '../types';
import { calculateBMI } from '../utils/bmi';

interface TodayOverviewProps {
  todayLog: DailyLog;
  profile: UserProfile;
}

export const TodayOverview: React.FC<TodayOverviewProps> = ({ todayLog, profile }) => {
  const waterMet = todayLog.waterMl >= profile.waterGoalMl;
  const exerciseMet = todayLog.exerciseMinutes >= profile.exerciseGoalMin;
  const sleepMet = todayLog.sleepHours >= (profile.sleepGoalHours - 0.5);
  const weightLogged = Boolean(todayLog.weightKg && todayLog.weightKg > 0);

  const completedCount = [waterMet, exerciseMet, sleepMet, weightLogged].filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 4) * 100);

  const bmiData = todayLog.weightKg ? calculateBMI(todayLog.weightKg, profile.heightCm) : null;

  const getEncouragement = () => {
    if (completedCount === 4) {
      return '🎉 สุดยอดมาก! คุณทำเป้าหมายสุขภาพครบทั้ง 4 ด้านแล้ว วันนี้คุณดูแลตัวเองได้ดีเยี่ยม!';
    }
    if (completedCount >= 2) {
      return '✨ ก้าวหน้าไปได้สวยมาก! ทำอีกนิดเพื่อให้ร่างกายสดชื่นเต็มพลังในวันนี้';
    }
    if (todayLog.waterMl > 0 || todayLog.exerciseMinutes > 0) {
      return '🌱 เริ่มต้นวันได้ดีแล้ว! ค่อยๆ เติมน้ำ ขยับร่างกายทีละนิด ไม่ต้องรีบ';
    }
    return '☀️ สวัสดีวันใหม่! เริ่มต้นง่ายๆ ด้วยการดื่มน้ำสักแก้วเพื่อปลุกร่างกายให้สดชื่น';
  };

  return (
    <section 
      id="today-overview"
      className="bg-gradient-to-br from-[#1e293b] via-[#24334a] to-[#1c2c3d] text-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-900/10 relative overflow-hidden"
    >
      <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-56 h-56 bg-[#f26b5e]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
              ภาพรวมวันนี้
            </span>
            <span className="text-xs text-slate-300">
              สำเร็จแล้ว {completedCount} จาก 4 ด้าน
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            จังหวะสุขภาพประจำวันของคุณ
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            {getEncouragement()}
          </p>

          <div className="w-full bg-slate-700/80 rounded-full h-3 overflow-hidden p-0.5">
            <div 
              className="bg-gradient-to-r from-[#38bfb3] via-[#78c98b] to-[#f7c956] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.max(progressPercent, 4)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 flex-shrink-0">
          
          {/* Water */}
          <div className={`rounded-2xl p-3 border transition-all ${waterMet ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'bg-slate-800/70 border-slate-700/70 text-slate-200'}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-slate-400">น้ำดื่ม</span>
              <Droplets className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-base sm:text-lg font-bold">
              {todayLog.waterMl.toLocaleString('th-TH')}
              <span className="text-[10px] font-normal text-slate-400 ml-1">มล.</span>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
              เป้า {profile.waterGoalMl}
              {waterMet && <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />}
            </div>
          </div>

          {/* Exercise */}
          <div className={`rounded-2xl p-3 border transition-all ${exerciseMet ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'bg-slate-800/70 border-slate-700/70 text-slate-200'}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-slate-400">ออกกำลัง</span>
              <Dumbbell className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-base sm:text-lg font-bold">
              {todayLog.exerciseMinutes}
              <span className="text-[10px] font-normal text-slate-400 ml-1">นาที</span>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
              เป้า {profile.exerciseGoalMin}
              {exerciseMet && <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />}
            </div>
          </div>

          {/* Sleep */}
          <div className={`rounded-2xl p-3 border transition-all ${sleepMet ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'bg-slate-800/70 border-slate-700/70 text-slate-200'}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-slate-400">การนอน</span>
              <Moon className="w-4 h-4 text-indigo-300" />
            </div>
            <div className="text-base sm:text-lg font-bold">
              {todayLog.sleepHours > 0 ? todayLog.sleepHours : '-'}
              <span className="text-[10px] font-normal text-slate-400 ml-1">ชม.</span>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
              เป้า {profile.sleepGoalHours}
              {sleepMet && <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />}
            </div>
          </div>

          {/* Weight */}
          <div className={`rounded-2xl p-3 border transition-all ${weightLogged ? 'bg-slate-800/90 border-rose-400/40 text-slate-200' : 'bg-slate-800/70 border-slate-700/70 text-slate-400'}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-slate-400">น้ำหนัก</span>
              <Scale className="w-4 h-4 text-[#f26b5e]" />
            </div>
            <div className="text-base sm:text-lg font-bold text-white">
              {todayLog.weightKg ? todayLog.weightKg : '-'}
              <span className="text-[10px] font-normal text-slate-400 ml-1">กก.</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 truncate">
              {bmiData ? `BMI ${bmiData.bmi}` : 'ยังไม่บันทึก'}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
