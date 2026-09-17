'use client';

import { useEffect, useState } from 'react';
import { getCountdownParts, type CountdownParts } from '@/lib/countdown';

type CountdownProps = { targetDateISO: string };

const UNITS: { key: keyof CountdownParts; label: string }[] = [
  { key: 'days', label: 'Dias' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Seg' },
];

const ZERO_PARTS: CountdownParts = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function Countdown({ targetDateISO }: CountdownProps) {
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const update = () => setParts(getCountdownParts(new Date(targetDateISO), new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDateISO]);

  const display = parts ?? ZERO_PARTS;

  return (
    <div className="mt-9 flex justify-center">
      {UNITS.map(({ key, label }, index) => (
        <div
          key={key}
          className={`px-5 text-center ${
            index < UNITS.length - 1 ? 'border-r border-cinza-claro' : ''
          }`}
        >
          <span className="block font-serif text-[29px] font-semibold text-preto">
            {String(display[key]).padStart(2, '0')}
          </span>
          <span className="text-[8.5px] uppercase tracking-[0.2em] text-cinza-medio">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
