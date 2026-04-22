import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
};

export default function Button({
  children,
  variant = 'primary',
  ...props
}: Props) {
  return <button className={`btn btn-${variant}`} {...props}>{children}</button>;
}