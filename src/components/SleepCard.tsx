import React from 'react';
import { Moon, Check, Sparkles } from 'lucide-react';

interface SleepCardProps {
  currentHours: number;
  quality?: 'refreshed' | 'normal' | 'tired';
  goalHours: number;
  onUpdateSleep: (hours: number, quality?: 'refreshed' | 'normal' | 'tired') => void;
}

export const SleepCard: React.FC<SleepCardProps> = ({
  currentHours,
  quality = 'refreshed',
  goalHours,
  onUpdateSleep,
}) => {
  const isGoalReached = currentHours >= goalHours - 0.5;

  const handleHourSelect = (hrs: number) => {
    onUpdateSleep(hrs, quality);
  };

  const handleQualitySelect = (q: 'refreshed' | 'normal' | 'tired') => {
    onUpdateSleep(currentHours, q);
  };

  const commonSleepTimes = [6.0, 7.0, 7.5, 8.0, 8.5, 9.0];

  return (
    <div 
      id="sleep-card"
      className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ded1] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#eff2fe] text-[#4f46e5] flex items-center justify-center font-bold flex-shrink-0">
              <Moon className="w-6 h-6 fill-[#6366f1] text-[#4f46e5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#1f2d3d]">การนอนหลับ</h3>
                {isGoalReached && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> พักผ่อนเพียงพอ
                  </span>
                )}
              </div>
              <p className="text-xs text-[#718292]">นอนหลับฟื้นฟูร่างกายและสมอง</p>
            </div>
          </div>

          <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
            เป้า {goalHours} ชม.
          </span>
        </div>

        {/* Big Display Box */}
        <div className="bg-[#f5f7ff] border border-[#dbe1fd] rounded-2xl p-4 mb-4">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#3730a3] tracking-tight">
                {currentHours > 0 ? currentHours : '-'}
              </span>
              <span className="text-sm font-semibold text-[#4338ca] ml-1.5">ชั่วโมง</span>
            </div>
            <div className="text-xs font-medium text-slate-500">
              {currentHours >= 7 && currentHours <= 9 ? 'ชั่วโมงนอนที่เหมาะสม' : currentHours > 0 ? 'ควรนอน 7-9 ชม./วัน' : 'แตะเลือกชั่วโมงที่นอน'}
            </div>
          </div>

          {/* Quick hour chips */}
          <div className="grid grid-cols-6 gap-1.5 pt-1">
            {commonSleepTimes.map((hrs) => {
              const selected = currentHours === hrs;
              return (
                <button
                  key={hrs}
                  type="button"
                  onClick={() => handleHourSelect(hrs)}
                  className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-indigo-50 border border-indigo-100'
                  }`}
                >
                  {hrs}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quality of Sleep */}
        <div className="mb-2">
          <label className="text-xs font-bold text-[#475569] block mb-2">
            ความรู้สึกเมื่อตื่นนอน:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQualitySelect('refreshed')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                quality === 'refreshed'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-2 ring-emerald-300/40'
                  : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="text-lg">🌿</span>
              <span className="text-xs font-bold">สดชื่น กระปรี้กระเปร่า</span>
            </button>

            <button
              type="button"
              onClick={() => handleQualitySelect('normal')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                quality === 'normal'
                  ? 'bg-blue-50 border-blue-400 text-blue-800 ring-2 ring-blue-300/40'
                  : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="text-lg">🌤️</span>
              <span className="text-xs font-bold">ปกติ ทั่วไป</span>
            </button>

            <button
              type="button"
              onClick={() => handleQualitySelect('tired')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                quality === 'tired'
                  ? 'bg-amber-50 border-amber-400 text-amber-800 ring-2 ring-amber-300/40'
                  : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="text-lg">🥱</span>
              <span className="text-xs font-bold">ยังง่วง อ่อนเพลีย</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          การนอนหลับสนิทช่วยเรื่องความจำและภูมิคุ้มกัน
        </span>
      </div>
    </div>
  );
};
