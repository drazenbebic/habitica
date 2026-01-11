import { Metadata, NextPage } from 'next';
import Link from 'next/link';

import {
  Calendar03Icon,
  Settings01Icon,
  Shield02Icon,
  StarIcon,
} from 'hugeicons-react';

import { RoadmapFeatureItem } from '@/components/RoadmapFeatureItem';
import { RoadmapPhase } from '@/components/RoadmapPhase';
import { Button } from '@/components/ui/Button';
import { Content } from '@/components/ui/Content';
import { Heading } from '@/components/ui/Heading';
import { Pill } from '@/components/ui/Pill';

export const metadata: Metadata = {
  title: 'Roadmap - Habitica Sync',
  description: 'Our development plan for the future of Habitica Sync.',
};

const RoadmapPage: NextPage = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <div className="mb-16 flex flex-col items-center text-center">
        <Heading level={1} size="4xl" className="mb-4 tracking-tight">
          The{' '}
          <span className="bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Master Plan
          </span>
        </Heading>

        <Content size="lg" className="max-w-xl text-slate-500">
          We are building the ultimate RPG workflow tool. Here is a look at the
          features currently in the forge.
        </Content>

        <Pill variant="accent" className="mt-6 ">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Calendar03Icon size={14} />
            Public Roadmap
          </span>
        </Pill>
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-8 top-4 bottom-4 w-px bg-linear-to-b from-violet-500 via-slate-200 to-transparent hidden md:block"></div>

        <div className="space-y-12">
          <RoadmapPhase
            icon={<Settings01Icon size={24} />}
            phase="Phase 1: Control Freak"
            status="In Progress"
            colorClass="text-violet-600 bg-violet-100 border-violet-200"
            dotClass="bg-violet-600 ring-violet-200"
            isFirst
          >
            <RoadmapFeatureItem
              title="Event Weight Configuration"
              description="A settings dashboard allowing you to customize exactly how much XP each action (Push, PR, Merge) is worth."
              tags={['Customization', 'Backend']}
            />
            <RoadmapFeatureItem
              title="Repository Filtering"
              description="Toggle specific repositories to 'Ignored' status so your dotfiles or test projects don't bloat your stats."
              tags={['Settings']}
            />
          </RoadmapPhase>

          <RoadmapPhase
            icon={<Shield02Icon size={24} />}
            phase="Phase 2: Anti-Cheese"
            status="Planned"
            colorClass="text-blue-600 bg-blue-100 border-blue-200"
            dotClass="bg-blue-500 ring-blue-200"
          >
            <RoadmapFeatureItem
              title="Daily XP Caps"
              description="Optional limits to prevent burnout and discourage spamming commits just for gold."
            />
            <RoadmapFeatureItem
              title="Smart Spam Detection"
              description="Automatically filter out low-effort commits (e.g. empty commits, self-approved PRs within 1 minute)."
            />
          </RoadmapPhase>

          <RoadmapPhase
            icon={<StarIcon size={24} />}
            phase="Phase 3: Gamification"
            status="Future Concepts"
            colorClass="text-emerald-600 bg-emerald-100 border-emerald-200"
            dotClass="bg-emerald-500 ring-emerald-200"
          >
            <RoadmapFeatureItem
              title="Coding Streaks"
              description="Bonus rewards for consistent contributions over consecutive days."
            />
            <RoadmapFeatureItem
              title="'Critical Hit' Bonuses"
              description="Small chance for 2x XP on significant tasks (e.g. closing >3 issues at once)."
            />
            <RoadmapFeatureItem
              title="The Activity Ledger"
              description="A transparent history log showing exactly why and when you received XP."
            />
          </RoadmapPhase>
        </div>
      </div>

      <div className="mt-24 flex flex-col items-center justify-center gap-4 text-center border-t border-slate-100 pt-12">
        <div>
          <Heading level={3} size="xl" className="mb-2">
            Have a better idea?
          </Heading>
          <Content size="sm">
            Our roadmap is driven by developers like you.
          </Content>
        </div>
        <Link
          href="https://github.com/drazenbebic/habitica/issues"
          target="_blank"
        >
          <Button variant="primary" size="lg">
            Submit Feature Request
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RoadmapPage;
