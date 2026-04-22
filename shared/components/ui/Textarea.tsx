import type { TextareaHTMLAttributes } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export default function Textarea({ label, ...props }: Props) {
  return (
    <label className="field">
      <span className="label">{label}</span>
      <textarea className="textarea" {...props} />
    </label>
  );
}