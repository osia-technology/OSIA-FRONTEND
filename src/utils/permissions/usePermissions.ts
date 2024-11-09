import { useSelector } from 'react-redux';
import { selectPermissions } from 'src/store/selectors/userSelectors';

export const usePermissions = (requiredPermissions: string[]): boolean => {
  const userPermissions = useSelector(selectPermissions);
  return requiredPermissions.every(permission => userPermissions.includes(permission));
};
