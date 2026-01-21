import { Metadata } from 'next';

import { HabiticaUserForm } from '@/components/dashboard/HabiticaUserForm';
import { generatePageMetadata } from '@/utils/seo';

export const generateMetadata = async (): Promise<Metadata> => {
  return generatePageMetadata({
    title: 'Settings',
    description:
      'Manage your account configuration. Securely update your Habitica User ID and API Token to ensure seamless synchronization between GitHub and your character.',
    suffix: 'Octogriffin Dashboard',
    path: 'dashboard/settings',
  });
};

export default function DashboardSettingsPage() {
  return <HabiticaUserForm />;
}
