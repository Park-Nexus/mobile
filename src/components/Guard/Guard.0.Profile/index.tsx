import {RouterOutput} from '../../../trpc';
import {GuardTemplate} from '../Guard.Template';

interface IProfileGuardProps {
  children: React.ReactNode;
}
export function ProfileGuard({children}: IProfileGuardProps) {
  const isLoading = false;

  return (
    <GuardTemplate
      isLoading={isLoading}
      message="Loading your profile ...."
      children={children}
    />
  );
}
