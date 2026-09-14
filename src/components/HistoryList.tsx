import React, { useState } from 'react';
import { History, Trash2, Calendar, FileDown, FileUp, CheckCircle, Droplets, Dumbbell, Moon, Scale } from 'lucide-react';
import { DailyLog, UserProfile } from '../types';
import { formatThaiDate } from '../utils/storage';
import { calculateBMI } from '../utils/bmi';

interface HistoryListProps {
  logs: DailyLog[];
  profile: UserProfile;
  onDeleteLog: (id: string) => void;
  onImportLogs: (logs: DailyLog[]) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  logs,
  profile,
  onDeleteLog,
  onImportLogs,
}) => {
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Sort descending (newest first)
  const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date));

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `health_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          onImportLogs(parsed);
          setImportStatus('นำเข้าข้อมูลสำเร็จแล้ว!');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus('รูปแบบไฟล์ไม่ถูกต้อง');
          setTimeout(() => setImportStatus(null), 3000);
        }
      } catch (err) {
        console.error('Failed to import JSON', err);
        setImportStatus('ไม่สามารถอ่านไฟล์ได้');
        setTimeout(() => setImportStatus(null), 3000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div 
      id="history-list"
      className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ded1] shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#f26b5e]" />
            <h3 className="text-lg font-bold text-[#1f2d3d]">ประวัติการบันทึก</h3>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-bold">
              {logs.length} วัน
            </span>
          </div>
          <p className="text-xs text-[#718292]">ตรวจสอบย้อนหลัง ดาวน์โหลดไฟล์สำรอง หรือนำเข้าข้อมูล</p>
        </div>

        {/* Data Backup Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 text-xs font-semibold bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#334155] border border-slate-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs"
            title="ดาวน์โหลดไฟล์ JSON สำรองข้อมูลของคุณ"
          >
            <FileDown className="w-3.5 h-3.5 text-[#f26b5e]" />
            <span>สำรองข้อมูล (JSON)</span>
          </button>

          <label className="flex items-center gap-1.5 text-xs font-semibold bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#334155] border border-slate-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs">
            <FileUp className="w-3.5 h-3.5 text-[#0d9488]" />
            <span>นำเข้าข้อมูล</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {importStatus && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          {importStatus}
        </div>
      )}

      {/* Log list */}
      <div className="space-y-3">
        {sorted.map((item) => {
          const formattedDate = formatThaiDate(item.date, true);
          const bmi = item.weightKg ? calculateBMI(item.weightKg, profile.heightCm) : null;
          const isToday = item.date === new Date().toISOString().split('T')[0];

          return (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-slate-200/80 bg-[#fbfbfb] hover:bg-white hover:border-[#fcd5ce] transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                  <Calendar className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-[#1f2d3d]">
                      {formattedDate}
                    </span>
                    {isToday && (
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.2 rounded-full">
                        วันนี้
                      </span>
                    )}
                    {item.mood && (
                      <span className="text-base" title={`อารมณ์: ${item.mood}`}>
                        {item.mood === 'great' ? '😄' : item.mood === 'good' ? '😊' : item.mood === 'neutral' ? '😐' : item.mood === 'tired' ? '🥱' : '😣'}
                      </span>
                    )}
                  </div>
                  {item.note && (
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 italic">
                      "{item.note}"
                    </p>
                  )}
                </div>
              </div>

              {/* Stats pills */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-xs bg-cyan-50 border border-cyan-100 text-cyan-800 px-2.5 py-1 rounded-xl font-medium flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-cyan-600" />
                  {item.waterMl.toLocaleString('th-TH')} มล.
                </span>

                <span className="text-xs bg-amber-50 border border-amber-100 text-amber-800 px-2.5 py-1 rounded-xl font-medium flex items-center gap-1">
                  <Dumbbell className="w-3 h-3 text-amber-600" />
                  {item.exerciseMinutes} นาที
                </span>

                <span className="text-xs bg-indigo-50 border border-indigo-100 text-indigo-800 px-2.5 py-1 rounded-xl font-medium flex items-center gap-1">
                  <Moon className="w-3 h-3 text-indigo-600" />
                  {item.sleepHours} ชม.
                </span>

                {item.weightKg && (
                  <span className="text-xs bg-rose-50 border border-rose-100 text-rose-800 px-2.5 py-1 rounded-xl font-medium flex items-center gap-1">
                    <Scale className="w-3 h-3 text-rose-600" />
                    {item.weightKg} กก. {bmi ? `(BMI ${bmi.bmi})` : ''}
                  </span>
                )}

                {/* Delete button */}
                {!isToday && (
                  <button
                    type="button"
                    onClick={() => onDeleteLog(item.id)}
                    className="text-slate-400 hover:text-rose-500 p-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer ml-1"
                    title="ลบรายการของวันนี้"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
