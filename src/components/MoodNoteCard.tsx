import React, { useState } from 'react';
import { Smile, Check, PenLine } from 'lucide-react';
import { MoodType } from '../types';

interface MoodNoteCardProps {
  currentMood?: MoodType;
  currentNote?: string;
  onUpdateMoodNote: (mood: MoodType, note: string) => void;
}

const MOODS: { type: MoodType; emoji: string; label: string }[] = [
  { type: 'great', emoji: '😄', label: 'ยอดเยี่ยม' },
  { type: 'good', emoji: '😊', label: 'สบายใจ' },
  { type: 'neutral', emoji: '😐', label: 'เฉยๆ' },
  { type: 'tired', emoji: '🥱', label: 'เหนื่อยล้า' },
  { type: 'stressed', emoji: '😣', label: 'เครียด/กังวล' },
];

export const MoodNoteCard: React.FC<MoodNoteCardProps> = ({
  currentMood = 'good',
  currentNote = '',
  onUpdateMoodNote,
}) => {
  const [mood, setMood] = useState<MoodType>(currentMood);
  const [note, setNote] = useState<string>(currentNote);
  const [saved, setSaved] = useState<boolean>(false);

  const handleSelectMood = (m: MoodType) => {
    setMood(m);
    onUpdateMoodNote(m, note);
  };

  const handleSaveNote = () => {
    onUpdateMoodNote(mood, note);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div 
      id="mood-note-card"
      className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e8ded1] shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#fdf2f8] text-[#db2777] flex items-center justify-center font-bold flex-shrink-0">
            <Smile className="w-6 h-6 text-[#db2777]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#1f2d3d]">อารมณ์และบันทึกประจำวัน</h3>
              {saved && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <Check className="w-3 h-3" /> บันทึกแล้ว
                </span>
              )}
            </div>
            <p className="text-xs text-[#718292]">บันทึกความรู้สึกและสิ่งดีๆ ที่เกิดขึ้น</p>
          </div>
        </div>
      </div>

      {/* Mood Selector */}
      <div className="mb-4">
        <label className="text-xs font-bold text-[#475569] block mb-2">
          วันนี้คุณรู้สึกอย่างไร:
        </label>
        <div className="grid grid-cols-5 gap-2">
          {MOODS.map((item) => {
            const isSelected = mood === item.type;
            return (
              <button
                key={item.type}
                type="button"
                onClick={() => handleSelectMood(item.type)}
                className={`py-2 px-1 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  isSelected
                    ? 'bg-rose-50 border-rose-400 text-rose-800 ring-2 ring-rose-300/40 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-[11px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Note */}
      <div>
        <label className="text-xs font-bold text-[#475569] block mb-1.5 flex items-center gap-1">
          <PenLine className="w-3.5 h-3.5 text-slate-500" />
          ไดอารี่สั้นๆ หรือข้อความให้กำลังใจตัวเอง:
        </label>
        <textarea
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={handleSaveNote}
          placeholder="เช่น วันนี้กินผักเยอะ รู้สึกสบายท้อง, วิ่งตอนเช้าอากาศดีมาก..."
          className="w-full px-3.5 py-2.5 bg-[#fafaf9] border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f26b5e] focus:bg-white resize-none"
        />
        <div className="flex justify-between items-center mt-1.5 text-[11px] text-slate-400">
          <span>บันทึกอัตโนมัติเมื่อพิมพ์เสร็จ</span>
          <button
            type="button"
            onClick={handleSaveNote}
            className="text-xs font-bold text-[#f26b5e] hover:underline cursor-pointer"
          >
            กดบันทึกข้อความ
          </button>
        </div>
      </div>
    </div>
  );
};
