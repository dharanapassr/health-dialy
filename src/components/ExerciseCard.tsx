import React, { useState } from 'react';
import { Dumbbell, Plus, Flame, Check, RotateCcw } from 'lucide-react';
import { ActivityType } from '../types';

interface ExerciseCardProps {
  currentMinutes: number;
  currentType?: ActivityType;
  goalMinutes: number;
  onUpdateExercise: (minutes: number, type?: ActivityType) => void;
}

const ACTIVITIES: { type: ActivityType; label: string; icon: string; kcalPerMin: number }[] = [
  { type: 'walk', label: 'เดิน', icon: '🚶', kcalPerMin: 4 },
  { type: 'run', label: 'วิ่ง', icon: '🏃', kcalPerMin: 10 },
  { type: 'cycle', label: 'ปั่นจักรยาน', icon: '🚴', kcalPerMin: 7 },
  { type: 'workout', label: 'เวท / ฟิตเนส', icon: '🏋️', kcalPerMin: 6 },
  { type: 'yoga', label: 'โยคะ / ยืดเส้น', icon: '🧘', kcalPerMin: 3.5 },
  { type: 'swim', label: 'ว่ายน้ำ', icon: '🏊', kcalPerMin: 8.5 },
  { type: 'housework', label: 'งานบ้าน', icon: '🧹', kcalPerMin: 3 },
  { type: 'other', label: 'อื่นๆ', icon: '⚡', kcalPerMin: 5 },
];

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  currentMinutes,
  currentType = 'walk',
  goalMinutes,
  onUpdateExercise,
}) => {
  const [selectedType, setSelectedType] = useState<ActivityType>(currentType);
  const [customVal, setCustomVal] = useState<string>('');
  const [showCustom, setShowCustom] = useState<boolean>(false);

  const selectedActivity = ACTIVITIES.find((a) => a.type === selectedType) || ACTIVITIES[0];
  const estCalories = Math.round(currentMinutes * selectedActivity.kcalPerMin);
  const percentage = Math.min(Math.round((currentMinutes / goalMinutes) * 100), 100);
  const isGoalReached = currentMinutes >= goalMinutes;

  const handleAddMinutes = (mins: number) => {
    const updated = Math.max(0, currentMinutes + mins);
    onUpdateExercise(updated, selectedType);
  };

  const handleSelectType = (t: ActivityType) => {
    setSelectedType(t);
    onUpdateExercise(currentMinutes, t);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customVal, 10);
    if (!isNaN(val) && val > 0) {
      handleAddMinutes(val);
      setCustomVal('');
      setShowCustom(false);
    }
  };

  return (
    <div 
      id="exercise-card"
      className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ded1] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#fef5e7] text-[#d97706] flex items-center justify-center font-bold flex-shrink-0">
              <Dumbbell className="w-6 h-6 text-[#d97706]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#1f2d3d]">ออกกำลังกาย</h3>
                {isGoalReached && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> สำเร็จ
                  </span>
                )}
              </div>
              <p className="text-xs text-[#718292]">ขยับร่างกาย เผาผลาญพลังงาน</p>
            </div>
          </div>

          <span className="text-xs font-semibold text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            ~{estCalories} แคลอรี่
          </span>
        </div>

        {/* Display Box */}
        <div className="bg-[#fef9f0] border border-[#fae2be] rounded-2xl p-4 mb-4">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#92400e] tracking-tight">
                {currentMinutes}
              </span>
              <span className="text-sm font-semibold text-[#b45309] ml-1.5">นาที</span>
            </div>
            <div className="text-xs font-semibold text-[#64748b]">
              เป้าหมาย {goalMinutes} นาที ({percentage}%)
            </div>
          </div>

          <div className="w-full bg-[#fde8c8] h-3.5 rounded-full overflow-hidden p-0.5">
            <div 
              className="bg-gradient-to-r from-[#f59e0b] to-[#ea580c] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(percentage, 2)}%` }}
            />
          </div>
        </div>

        {/* Activity Type Selector */}
        <div className="mb-3">
          <label className="text-xs font-bold text-[#475569] block mb-1.5">
            ประเภทกิจกรรมที่ทำ:
          </label>
          <div className="flex gap-1.5 flex-wrap">
            {ACTIVITIES.map((act) => {
              const active = selectedType === act.type;
              return (
                <button
                  key={act.type}
                  type="button"
                  onClick={() => handleSelectType(act.type)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    active
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-[#f8fafc] text-slate-600 hover:bg-slate-100 border border-slate-200/70'
                  }`}
                >
                  <span>{act.icon}</span>
                  <span>{act.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <button
            type="button"
            onClick={() => handleAddMinutes(15)}
            className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 transition-all active:scale-95 cursor-pointer text-center"
          >
            <span className="text-xs font-bold flex items-center justify-center gap-0.5">
              <Plus className="w-3.5 h-3.5" /> 15 นาที
            </span>
            <span className="text-[10px] text-amber-700">ยืดเส้นเบาๆ</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddMinutes(30)}
            className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 transition-all active:scale-95 cursor-pointer text-center"
          >
            <span className="text-xs font-bold flex items-center justify-center gap-0.5">
              <Plus className="w-3.5 h-3.5" /> 30 นาที
            </span>
            <span className="text-[10px] text-amber-700">เหงื่อออกกำลังดี</span>
          </button>

          <button
            type="button"
            onClick={() => handleAddMinutes(45)}
            className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 transition-all active:scale-95 cursor-pointer text-center"
          >
            <span className="text-xs font-bold flex items-center justify-center gap-0.5">
              <Plus className="w-3.5 h-3.5" /> 45 นาที
            </span>
            <span className="text-[10px] text-amber-700">ออกกำลังเต็มที่</span>
          </button>
        </div>
      </div>

      {/* Footer controls: custom & reset */}
      <div>
        {showCustom ? (
          <form onSubmit={handleCustomSubmit} className="flex gap-2 mb-2">
            <input
              type="number"
              step="5"
              min="1"
              value={customVal}
              onChange={(e) => setCustomVal(e.target.value)}
              placeholder="ระบุเวลา (นาที)"
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 cursor-pointer"
            >
              เพิ่ม
            </button>
            <button
              type="button"
              onClick={() => setShowCustom(false)}
              className="px-2 py-1.5 text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
            >
              ยกเลิก
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-[#64748b]">
            <button
              type="button"
              onClick={() => setShowCustom(true)}
              className="text-amber-700 hover:underline font-semibold cursor-pointer text-xs"
            >
              + ใส่เวลาเอง
            </button>

            {currentMinutes > 0 && (
              <button
                type="button"
                onClick={() => onUpdateExercise(0, selectedType)}
                className="text-slate-400 hover:text-rose-500 font-medium cursor-pointer text-xs flex items-center gap-1 transition-colors"
                title="เริ่มนับเวลาใหม่"
              >
                <RotateCcw className="w-3 h-3" /> เริ่มใหม่
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
