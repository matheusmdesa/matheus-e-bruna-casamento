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

export function Countdown({ targetDateISO }: CountdownProps) {
  const target = new Date(targetDateISO);
  const [parts, setParts] = useState<CountdownParts>(() =>
    getCountdownParts(target, new Date())
  );

  useEffect(() => {
    const id = setInterval(() => {
      setParts(getCountdownParts(new Date(targetDateISO), new Date()));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDateISO]);

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
            {String(parts[key]).padStart(2, '0')}
          </span>
          <span className="text-[8.5px] uppercase tracking-[0.2em] text-cinza-medio">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
