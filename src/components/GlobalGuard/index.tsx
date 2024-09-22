interface IGlobalGuardProps {
  children: React.ReactNode;
}

export function GlobalGuard({children}: IGlobalGuardProps) {
  return children;
}
