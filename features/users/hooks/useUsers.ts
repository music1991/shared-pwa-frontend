import { useEffect, useState } from 'react';
import {
  usersService,
  type UserListItem,
} from '../services/users.service';

export default function useUsers() {
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setErrorMessage('');

      try {
        const result = await usersService.getAll();
        setUsers(result);
      } catch (error: any) {
        setErrorMessage(
          error?.response?.data?.message || 'No se pudieron obtener los usuarios'
        );
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return {
    users,
    loading,
    errorMessage,
  };
}