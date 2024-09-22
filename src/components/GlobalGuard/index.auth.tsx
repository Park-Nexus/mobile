interface IAuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({children}: IAuthGuardProps) {
  return children;
}
