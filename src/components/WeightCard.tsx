import React, { useState } from 'react';
import { Scale, Info, Check, ArrowRight } from 'lucide-react';
import { calculateBMI } from '../utils/bmi';

interface WeightCardProps {
  currentWeightKg?: number;
  heightCm: number;
  targetWeightKg?: number;
  onUpdateWeight: (weightKg: number) => void;
  onOpenSettings: () => void;
}

export const WeightCard: React.FC<WeightCardProps> = ({
  currentWeightKg,
  heightCm,
  targetWeightKg,
  onUpdateWeight,
  onOpenSettings,
}) => {
  const [inputVal, setInputVal] = useState<string>(currentWeightKg ? String(currentWeightKg) : '');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const bmiData = currentWeightKg ? calculateBMI(currentWeightKg, heightCm) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputVal);
    if (!isNaN(val) && val > 20 && val < 300) {
      onUpdateWeight(Math.round(val * 10) / 10);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const diffTarget = currentWeightKg && targetWeightKg ? Math.round((currentWeightKg - targetWeightKg) * 10) / 10 : null;

  return (
    <div 
      id="weight-card"
      className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ded1] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#fff1f0] text-[#f26b5e] flex items-center justify-center font-bold flex-shrink-0">
              <Scale className="w-6 h-6 text-[#f26b5e]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#1f2d3d]">น้ำหนัก & ค่า BMI</h3>
                {savedSuccess && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full animate-pulse">
                    <Check className="w-3 h-3" /> บันทึกแล้ว
                  </span>
                )}
              </div>
              <p className="text-xs text-[#718292]">คำนวณดัชนีมวลกายอัตโนมัติ</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenSettings}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
            title="แก้ไขส่วนสูงและเป้าหมาย"
          >
            สูง {heightCm} ซม. ✏️
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                step="0.1"
                min="20"
                max="300"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="ใส่น้ำหนักวันนี้ เช่น 62.5"
                className="w-full px-4 py-3 bg-[#fff9f8] border border-[#fcd5ce] rounded-2xl text-base font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f26b5e]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                กก.
              </span>
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-[#f26b5e] hover:bg-[#e45b4e] text-white font-bold text-sm rounded-2xl transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              บันทึก
            </button>
          </div>
        </form>

        {/* BMI Results & Insights */}
        {bmiData ? (
          <div className={`p-4 rounded-2xl border transition-all ${bmiData.color}`}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black">{bmiData.bmi}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/70 shadow-2xs">
                  {bmiData.labelTh}
                </span>
              </div>
              <span className="text-[11px] font-medium opacity-80">
                เกณฑ์มาตรฐานเอเชีย
              </span>
            </div>

            <p className="text-xs leading-relaxed opacity-95">
              {bmiData.advice}
            </p>

            {diffTarget !== null && (
              <div className="mt-2.5 pt-2 border-t border-black/10 text-xs flex items-center justify-between">
                <span>เป้าหมายของคุณ: {targetWeightKg} กก.</span>
                <span className="font-bold">
                  {diffTarget === 0 
                    ? '🎯 ตรงเป้าหมายพอดี!' 
                    : diffTarget > 0 
                    ? `เหลืออีก ${diffTarget} กก. ถึงเป้า` 
                    : `ต่ำกว่าเป้า ${Math.abs(diffTarget)} กก.`}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center text-xs text-slate-500">
            <Info className="w-4 h-4 mx-auto mb-1 text-slate-400" />
            ยังไม่มีข้อมูลน้ำหนักวันนี้ ใส่น้ำหนักเพื่อดูผลการประเมิน BMI ทันที
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1">
          ส่วนสูงอ้างอิง: {heightCm} ซม.
        </span>
        <button
          type="button"
          onClick={onOpenSettings}
          className="text-[#f26b5e] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
        >
          เปลี่ยนส่วนสูง <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
