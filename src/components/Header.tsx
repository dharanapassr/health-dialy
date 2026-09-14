import React from 'react';
import { Sparkles, Flame, Settings, Heart, Calendar, HardDrive } from 'lucide-react';
import { formatThaiFullDate } from '../utils/storage';

interface HeaderProps {
  streak: number;
  lastSavedTime: string;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ streak, lastSavedTime, onOpenSettings }) => {
  const fullDateStr = formatThaiFullDate();

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-[#ebdccd] sticky top-0 z-20 transition-all shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#f26b5e] to-[#ff927e] flex items-center justify-center text-white shadow-md shadow-[#f26b5e]/20 flex-shrink-0">
            <Heart className="w-6 h-6 fill-white text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-[#1f2d3d] tracking-tight">
                สุขภาพดีทุกวัน
              </h1>
              <span className="hidden xs:inline-flex items-center gap-1 text-[11px] font-semibold text-[#f26b5e] bg-[#fef0ee] px-2 py-0.5 rounded-full border border-[#fbd4cf]">
                <Sparkles className="w-3 h-3" />
                บันทึกจริงในเครื่อง
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <p className="text-xs text-[#738394] font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#a0b0c0]" />
                {fullDateStr}
              </p>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-md font-medium flex items-center gap-1">
                <HardDrive className="w-3 h-3 text-emerald-600" />
                บันทึกอัตโนมัติแล้ว {lastSavedTime ? `(${lastSavedTime})` : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Action / Streak & Settings */}
        <div className="flex items-center gap-2.5 self-end sm:self-center">
          <div 
            id="streak-badge"
            className="flex items-center gap-1.5 bg-[#fff8ee] text-[#b45309] border border-[#fde68a] px-3 py-1.5 rounded-full text-xs font-bold shadow-xs"
            title="จำนวนวันที่บันทึกดูแลตัวเองต่อเนื่อง"
          >
            <Flame className="w-4 h-4 text-[#f59e0b] fill-[#f59e0b]" />
            <span>ทำต่อเนื่อง {streak} วัน</span>
          </div>

          <button
            id="settings-btn"
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors active:scale-95"
            aria-label="ตั้งค่าเป้าหมายและข้อมูล"
          >
            <Settings className="w-4 h-4 text-[#64748b]" />
            <span className="hidden sm:inline">ตั้งค่าเป้าหมาย</span>
          </button>
        </div>

      </div>
    </header>
  );
};
