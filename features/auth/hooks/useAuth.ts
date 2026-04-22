import { useAuthContext } from '../store/auth.context';

export default function useAuth() {
  return useAuthContext();
}