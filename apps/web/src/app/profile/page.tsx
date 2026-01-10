import { ReactNode } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import {
  Building03Icon,
  GithubIcon,
  Globe02Icon,
  Location01Icon,
  Mail01Icon,
} from 'hugeicons-react';

import { getUserProfile } from '@/app/actions/get-user-profile';
import { DashboardGate } from '@/components/DashboardGate';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { CardBody } from '@/components/ui/CardBody';
import { Content } from '@/components/ui/Content';
import { Heading } from '@/components/ui/Heading';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Profile | Habitica Sync',
  description:
    'View your adventurer identity, manage account details, and check your Habitica connection status.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <DashboardGate />;
  }

  const profile = await getUserProfile();

  if (!profile) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Heading level={1} size="3xl" className="mb-2">
        Adventurer Profile
      </Heading>
      <Content className="mb-10">
        Your personal identity card and connection status.
      </Content>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card variant="elevated" className="overflow-hidden text-center">
            <div className="h-24 w-full bg-linear-to-br from-violet-600 to-indigo-600"></div>
            <div className="relative -mt-12 px-6 pb-6">
              <div className="mx-auto inline-flex rounded-full bg-white p-1.5 shadow-md">
                <Image
                  src={profile.avatar || '/placeholder-avatar.png'}
                  alt={profile.handle}
                  width={96}
                  height={96}
                  className="rounded-full bg-slate-100"
                />
              </div>

              <div className="mt-3">
                <Heading level={2} size="lg">
                  {profile.name}
                </Heading>
                <p className="text-sm font-medium text-slate-500">
                  @{profile.handle}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge
                  variant={profile.isLinked ? 'success' : 'warning'}
                  size="sm"
                  hasDot
                >
                  {profile.isLinked ? 'Sync Active' : 'No Sync'}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6 md:col-span-2">
          <Card variant="outlined" className="bg-white">
            <CardBody className="flex flex-col gap-1">
              <Heading
                level={3}
                size="base"
                className="mb-4 border-b border-slate-100 pb-2"
              >
                Contact & Details
              </Heading>

              <DetailRow
                icon={<Mail01Icon size={18} />}
                label="Email"
                value={profile.email || 'Not visible'}
              />
              <DetailRow
                icon={<Building03Icon size={18} />}
                label="Company"
                value={profile.company || 'Freelance'}
              />
              <DetailRow
                icon={<Location01Icon size={18} />}
                label="Location"
                value={profile.location || 'Unknown Realm'}
              />
              <DetailRow
                icon={<Globe02Icon size={18} />}
                label="Website"
                value={profile.website}
                isLink
              />
              <DetailRow
                icon={<GithubIcon size={18} />}
                label="GitHub Profile"
                value={profile.githubUrl}
                isLink
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

const DetailRow = ({
  icon,
  label,
  value,
  isLink,
}: {
  icon: ReactNode;
  label: string;
  value: string | null;
  isLink?: boolean;
}) => {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between py-1 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3 text-slate-500">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      {isLink ? (
        <Link
          href={value}
          target="_blank"
          className="text-sm font-medium text-violet-600 hover:underline"
        >
          {value.replace(/^https?:\/\//, '')}
        </Link>
      ) : (
        <span className="text-sm font-medium text-slate-900">{value}</span>
      )}
    </div>
  );
};
