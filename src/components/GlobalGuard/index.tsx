import {ProfileGuard} from './ProfileGuard';

interface IGlobalGuardProps {
  children: React.ReactNode;
}

export function GlobalGuard({children}: IGlobalGuardProps) {
  return <ProfileGuard>{children}</ProfileGuard>;
}
