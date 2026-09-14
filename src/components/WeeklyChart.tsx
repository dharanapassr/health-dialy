import React, { useState } from 'react';
import { BarChart3, Droplets, Dumbbell, Moon, Scale } from 'lucide-react';
import { DailyLog, UserProfile } from '../types';
import { formatThaiDate } from '../utils/storage';

interface WeeklyChartProps {
  logs: DailyLog[];
  profile: UserProfile;
}

export const WeeklyChart: React.FC<WeeklyChartProps> = ({ logs, profile }) => {
  const [activeTab, setActiveTab] = useState<'water' | 'exercise' | 'sleep' | 'weight'>('water');

  // Sort logs by date ascending, take last 7
  const sorted = [...logs].sort((a, b) => a.date.localeCompare(b.date));
  const recentDays = sorted.slice(-7);

  const getMetricData = (log: DailyLog) => {
    switch (activeTab) {
      case 'water':
        return {
          value: log.waterMl,
          display: `${log.waterMl.toLocaleString('th-TH')} มล.`,
          percentage: Math.min(Math.round((log.waterMl / profile.waterGoalMl) * 100), 100),
          target: `${profile.waterGoalMl.toLocaleString('th-TH')} มล.`,
          color: 'bg-[#38bfb3]',
          textColor: 'text-[#0f766e]',
        };
      case 'exercise':
        return {
          value: log.exerciseMinutes,
          display: `${log.exerciseMinutes} นาที`,
          percentage: Math.min(Math.round((log.exerciseMinutes / profile.exerciseGoalMin) * 100), 100),
          target: `${profile.exerciseGoalMin} นาที`,
          color: 'bg-[#f59e0b]',
          textColor: 'text-[#b45309]',
        };
      case 'sleep':
        return {
          value: log.sleepHours,
          display: `${log.sleepHours} ชม.`,
          percentage: Math.min(Math.round((log.sleepHours / profile.sleepGoalHours) * 100), 100),
          target: `${profile.sleepGoalHours} ชม.`,
          color: 'bg-[#6366f1]',
          textColor: 'text-[#4338ca]',
        };
      case 'weight':
        return {
          value: log.weightKg || 0,
          display: log.weightKg ? `${log.weightKg} กก.` : '-',
          percentage: log.weightKg ? Math.min(Math.max(Math.round((log.weightKg / 100) * 100), 20), 100) : 0,
          target: profile.targetWeightKg ? `${profile.targetWeightKg} กก.` : '-',
          color: 'bg-[#f26b5e]',
          textColor: 'text-[#be123c]',
        };
    }
  };

  return (
    <div 
      id="weekly-chart"
      className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ded1] shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#f26b5e]" />
            <h3 className="text-lg font-bold text-[#1f2d3d]">สถิติย้อนหลัง 7 วัน</h3>
          </div>
          <p className="text-xs text-[#718292]">เปรียบเทียบผลการดูแลสุขภาพในแต่ละวัน</p>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center bg-[#f1f5f9] p-1 rounded-2xl gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('water')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'water' ? 'bg-white text-[#0f766e] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-[#38bfb3]" />
            <span>น้ำดื่ม</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('exercise')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'exercise' ? 'bg-white text-[#b45309] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>ออกกำลัง</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sleep')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sleep' ? 'bg-white text-[#4338ca] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-[#6366f1]" />
            <span>การนอน</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('weight')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'weight' ? 'bg-white text-[#be123c] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-[#f26b5e]" />
            <span>น้ำหนัก</span>
          </button>
        </div>
      </div>

      {/* Bar graph representation */}
      <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end pt-8 pb-3 min-h-[220px]">
        {recentDays.map((log) => {
          const metric = getMetricData(log);
          const dateLabel = formatThaiDate(log.date, false);
          const isToday = log.date === new Date().toISOString().split('T')[0];

          return (
            <div key={log.id} className="flex flex-col items-center h-full justify-end group">
              {/* Value hover/top label */}
              <span className={`text-[10px] sm:text-xs font-extrabold mb-1.5 ${metric.textColor} transition-transform group-hover:scale-110 text-center`}>
                {metric.display}
              </span>

              {/* Bar track */}
              <div className="w-full max-w-[40px] bg-slate-100 rounded-2xl h-36 flex items-end p-1 relative overflow-hidden border border-slate-200/50">
                <div
                  className={`w-full ${metric.color} rounded-xl transition-all duration-700 ease-out`}
                  style={{ height: `${Math.max(metric.percentage, 8)}%` }}
                />
              </div>

              {/* Date label */}
              <span className={`text-[10px] sm:text-xs font-bold mt-2 truncate max-w-full ${isToday ? 'text-[#f26b5e] bg-rose-50 px-1.5 py-0.5 rounded-md' : 'text-slate-500'}`}>
                {isToday ? 'วันนี้' : dateLabel}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <span>ข้อมูลถูกจัดเก็บแบบเรียลไทม์ในบราวเซอร์ ไม่สูญหายเมื่อปิดหน้าเว็บ</span>
        <span className="font-semibold text-slate-600">
          เป้าหมายปัจจุบัน: {getMetricData(recentDays[recentDays.length - 1] || recentDays[0]).target}
        </span>
      </div>
    </div>
  );
};
