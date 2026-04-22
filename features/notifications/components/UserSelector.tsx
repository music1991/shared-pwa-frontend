import { useMemo, useState } from 'react';
import useUsers from '../../users/hooks/useUsers';
import type { UserListItem } from '../../users/services/users.service';

type SelectionMode = 'one' | 'many';

type Props = {
  mode: SelectionMode;
  selectedUserId: string;
  selectedUserIds: string[];
  onSelectOne: (userId: string) => void;
  onSelectMany: (userIds: string[]) => void;
};

export default function UserSelector({
  mode,
  selectedUserId,
  selectedUserIds,
  onSelectOne,
  onSelectMany,
}: Props) {
  const { users, loading, errorMessage } = useUsers();
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return users.filter((user) => {
      if (!normalized) return true;

      return (
        user.name.toLowerCase().includes(normalized) ||
        user.email.toLowerCase().includes(normalized) ||
        user.role.toLowerCase().includes(normalized)
      );
    });
  }, [users, search]);

  const handleToggleMany = (userId: string) => {
    const exists = selectedUserIds.includes(userId);

    if (exists) {
      onSelectMany(selectedUserIds.filter((id) => id !== userId));
      return;
    }

    onSelectMany([...selectedUserIds, userId]);
  };

  const renderUserRow = (user: UserListItem) => {
    const checked =
      mode === 'one'
        ? selectedUserId === user.id
        : selectedUserIds.includes(user.id);

    return (
      <label
        key={user.id}
        className="user-selector__item"
      >
        <div className="user-selector__control">
          {mode === 'one' ? (
            <input
              type="radio"
              name="notification-user"
              checked={checked}
              onChange={() => onSelectOne(user.id)}
            />
          ) : (
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleToggleMany(user.id)}
            />
          )}
        </div>

        <div className="user-selector__content">
          <strong>{user.name}</strong>
          <span>{user.email}</span>
          <small>Rol: {user.role}</small>
        </div>
      </label>
    );
  };

  return (
    <div className="form-stack">
      <label className="field">
        <span className="label">Buscar usuario</span>
        <input
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, email o rol"
        />
      </label>

      {loading ? (
        <div className="alert alert-success">Cargando usuarios...</div>
      ) : null}

      {errorMessage ? (
        <div className="alert alert-error">{errorMessage}</div>
      ) : null}

      {!loading && !errorMessage ? (
        <div className="user-selector">
          {filteredUsers.length === 0 ? (
            <div className="notification-card">
              <h4>Sin resultados</h4>
              <p>No se encontraron usuarios con ese filtro.</p>
            </div>
          ) : (
            filteredUsers.map(renderUserRow)
          )}
        </div>
      ) : null}
    </div>
  );
}