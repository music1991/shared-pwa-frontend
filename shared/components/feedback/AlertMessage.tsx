type Props = {
  type: 'success' | 'error';
  message: string;
};

export default function AlertMessage({ type, message }: Props) {
  return <div className={`alert alert-${type}`}>{message}</div>;
}