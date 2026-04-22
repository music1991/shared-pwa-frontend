import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function Input({ label, ...props }: Props) {
  return (
    <label className="field">
      <span className="label">{label}</span>
      <input className="input" {...props} />
    </label>
  );
}