import {AuthGuard} from './index.auth';

interface IGlobalGuardProps {
  children: React.ReactNode;
}

export function GlobalGuard({children}: IGlobalGuardProps) {
  return <AuthGuard>{children}</AuthGuard>;
}
