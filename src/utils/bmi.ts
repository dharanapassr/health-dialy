import { BMICalculation } from '../types';

export function calculateBMI(weightKg: number, heightCm: number): BMICalculation | null {
  if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) {
    return null;
  }

  const heightM = heightCm / 100;
  const bmiRaw = weightKg / (heightM * heightM);
  const bmi = Math.round(bmiRaw * 10) / 10;

  if (bmi < 18.5) {
    return {
      bmi,
      category: 'underweight',
      labelTh: 'น้ำหนักน้อย (ผอม)',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      advice: 'ควรทานอาหารให้ครบ 5 หมู่ และเพิ่มพลังงานและโปรตีนอย่างเหมาะสม',
    };
  } else if (bmi <= 22.9) {
    return {
      bmi,
      category: 'normal',
      labelTh: 'น้ำหนักปกติ (สมส่วน)',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      advice: 'ยอดเยี่ยม! รักษาสมดุลการกินและการออกกำลังกายแบบนี้ต่อไป',
    };
  } else if (bmi <= 24.9) {
    return {
      bmi,
      category: 'overweight',
      labelTh: 'น้ำหนักเกิน (ท้วม)',
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      advice: 'ลดหวาน มัน เค็ม และเพิ่มการเคลื่อนไหวร่างกายสม่ำเสมอ',
    };
  } else {
    return {
      bmi,
      category: 'obese',
      labelTh: 'โรคอ้วน / เสี่ยงสูง',
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      advice: 'ควรปรึกษาแพทย์หรือผู้เชี่ยวชาญ คุมอาหาร และออกกำลังกายเบาๆ สม่ำเสมอ',
    };
  }
}
