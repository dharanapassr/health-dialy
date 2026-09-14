import React, { useState } from 'react';
import { Droplets, Plus, Minus, Check, Sparkles } from 'lucide-react';

interface WaterCardProps {
  currentMl: number;
  goalMl: number;
  onUpdateWater: (newMl: number) => void;
}

export const WaterCard: React.FC<WaterCardProps> = ({ currentMl, goalMl, onUpdateWater }) => {
  const [customVal, setCustomVal] = useState<string>('');
  const [showCustom, setShowCustom] = useState<boolean>(false);

  const percentage = Math.min(Math.round((currentMl / goalMl) * 100), 100);
  const glasses = Math.round(currentMl / 250);
  const goalGlasses = Math.round(goalMl / 250);
  const isGoalReached = currentMl >= goalMl;

  const handleAdd = (amount: number) => {
    const updated = Math.max(0, currentMl + amount);
    onUpdateWater(updated);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(customVal, 10);
    if (!isNaN(parsed) && parsed > 0) {
      handleAdd(parsed);
      setCustomVal('');
      setShowCustom(false);
    }
  };

  return (
    <div 
      id="water-card"
      className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ded1] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#e6f8f6] text-[#2ba89c] flex items-center justify-center font-bold flex-shrink-0">
              <Droplets className="w-6 h-6 fill-[#38bfb3] text-[#2ba89c]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#1f2d3d]">น้ำดื่ม</h3>
                {isGoalReached && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> ครบเป้าแล้ว
                  </span>
                )}
              </div>
              <p className="text-xs text-[#718292]">เติมความชุ่มชื้น สดชื่นตลอดวัน</p>
            </div>
          </div>

          <span className="text-xs font-semibold text-[#0d9488] bg-[#ccfbf1] px-2.5 py-1 rounded-full">
            ~{glasses} / {goalGlasses} แก้ว
          </span>
        </div>

        {/* Big Value Display */}
        <div className="bg-[#f2faf9] border border-[#d6f0ed] rounded-2xl p-4 mb-4">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#115e59] tracking-tight">
                {currentMl.toLocaleString('th-TH')}
              </span>
              <span className="text-sm font-semibold text-[#0f766e] ml-1.5">มล.</span>
            </div>
            <div className="text-xs font-semibold text-[#64748b]">
              เป้าหมาย {goalMl.toLocaleString('th-TH')} มล. ({percentage}%)
            </div>
          </div>

          <div className="w-full bg-[#d5ece9] h-3.5 rounded-full overflow-hidden p-0.5">
            <div 
              className="bg-gradient-to-r from-[#38bfb3] to-[#0ea5e9] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(percentage, 2)}%` }}
            />
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <button
            id="water-add-250"
            type="button"
            onClick={() => handleAdd(250)}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#f0fdfa] hover:bg-[#ccfbf1] border border-[#99f6e4] text-[#0f766e] transition-all active:scale-95 cursor-pointer"
          >
            <span className="text-xs font-bold flex items-center gap-0.5">
              <Plus className="w-3.5 h-3.5" /> 250 มล.
            </span>
            <span className="text-[10px] text-[#0d9488]">1 แก้วน้ำ</span>
          </button>

          <button
            id="water-add-500"
            type="button"
            onClick={() => handleAdd(500)}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#f0fdfa] hover:bg-[#ccfbf1] border border-[#99f6e4] text-[#0f766e] transition-all active:scale-95 cursor-pointer"
          >
            <span className="text-xs font-bold flex items-center gap-0.5">
              <Plus className="w-3.5 h-3.5" /> 500 มล.
            </span>
            <span className="text-[10px] text-[#0d9488]">1 ขวดเล็ก</span>
          </button>

          <button
            id="water-add-1000"
            type="button"
            onClick={() => handleAdd(1000)}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#f0fdfa] hover:bg-[#ccfbf1] border border-[#99f6e4] text-[#0f766e] transition-all active:scale-95 cursor-pointer"
          >
            <span className="text-xs font-bold flex items-center gap-0.5">
              <Plus className="w-3.5 h-3.5" /> 1,000 มล.
            </span>
            <span className="text-[10px] text-[#0d9488]">1 ลิตร</span>
          </button>
        </div>
      </div>

      {/* Footer controls: Minus & Custom */}
      <div>
        {showCustom ? (
          <form onSubmit={handleCustomSubmit} className="flex gap-2 mb-2">
            <input
              type="number"
              step="50"
              min="1"
              value={customVal}
              onChange={(e) => setCustomVal(e.target.value)}
              placeholder="ระบุจำนวน (มล.)"
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#99f6e4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#38bfb3]"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#0f766e] text-white text-xs font-bold rounded-lg hover:bg-[#115e59] cursor-pointer"
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
              className="text-[#0d9488] hover:underline font-semibold cursor-pointer text-xs flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> ใส่จำนวนเอง
            </button>

            {currentMl > 0 && (
              <button
                type="button"
                onClick={() => handleAdd(-250)}
                className="text-slate-400 hover:text-rose-500 font-medium cursor-pointer text-xs flex items-center gap-1 transition-colors"
                title="ลบ 250 มล. เมื่อกดผิด"
              >
                <Minus className="w-3 h-3" /> ลบ 250 มล.
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
