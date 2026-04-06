import { ProfileTabPage } from '@/pages/profile-page';
import { useBreakpoint } from '@/shared/lib/hooks';

export default function ProfileRoute() {
  const { isWideWeb } = useBreakpoint();
  return <ProfileTabPage splitMode={isWideWeb} />;
}
