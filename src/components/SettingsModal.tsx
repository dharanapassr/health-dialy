import React, { useState } from 'react';
import { X, Settings, Check, RotateCcw } from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onResetData,
}) => {
  const [form, setForm] = useState<UserProfile>(profile);
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">ตั้งค่าเป้าหมายและข้อมูล</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              ส่วนสูงของคุณ (ซม.) <span className="text-slate-400 font-normal">- ใช้คำนวณค่า BMI</span>
            </label>
            <input
              type="number"
              min="100"
              max="250"
              value={form.heightCm}
              onChange={(e) => setForm({ ...form, heightCm: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#f26b5e]"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              เป้าหมายดื่มน้ำต่อวัน (มล.)
            </label>
            <input
              type="number"
              step="100"
              min="500"
              max="6000"
              value={form.waterGoalMl}
              onChange={(e) => setForm({ ...form, waterGoalMl: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#f26b5e]"
              required
            />
            <span className="text-[11px] text-slate-400">เฉลี่ย 2,000 มล. หรือประมาณ 8 แก้ว</span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              เป้าหมายออกกำลังกายต่อวัน (นาที)
            </label>
            <input
              type="number"
              step="5"
              min="5"
              max="300"
              value={form.exerciseGoalMin}
              onChange={(e) => setForm({ ...form, exerciseGoalMin: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#f26b5e]"
              required
            />
            <span className="text-[11px] text-slate-400">แนะนำ 30 นาที/วัน ตามคำแนะนำของแพทย์</span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              เป้าหมายชั่วโมงการนอน (ชม.)
            </label>
            <input
              type="number"
              step="0.5"
              min="4"
              max="14"
              value={form.sleepGoalHours}
              onChange={(e) => setForm({ ...form, sleepGoalHours: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#f26b5e]"
              required
            />
            <span className="text-[11px] text-slate-400">ผู้ใหญ่วัยทำงานควรนอน 7 - 8 ชั่วโมง</span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              น้ำหนักเป้าหมายที่ต้องการ (กก.)
            </label>
            <input
              type="number"
              step="0.5"
              min="30"
              max="200"
              value={form.targetWeightKg || ''}
              onChange={(e) => setForm({ ...form, targetWeightKg: Number(e.target.value) || undefined })}
              placeholder="เช่น 60"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#f26b5e]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#f26b5e] hover:bg-[#e45b4e] text-white font-bold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <Check className="w-4 h-4" />
              บันทึกการตั้งค่า
            </button>
          </div>
        </form>

        {/* Danger zone / Reset */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          {!showConfirmReset ? (
            <button
              type="button"
              onClick={() => setShowConfirmReset(true)}
              className="w-full text-xs text-rose-500 hover:text-rose-700 py-1.5 font-semibold flex items-center justify-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้น
            </button>
          ) : (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-center">
              <p className="text-xs font-bold text-rose-800 mb-2">
                ต้องการรีเซ็ตข้อมูลและล้างบันทึกทั้งหมดจริงหรือไม่?
              </p>
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onResetData();
                    setShowConfirmReset(false);
                    onClose();
                  }}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  ยืนยันรีเซ็ต
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmReset(false)}
                  className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg cursor-pointer"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
