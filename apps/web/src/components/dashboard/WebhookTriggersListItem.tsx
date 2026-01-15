'use client';

import { FC, useState, useTransition } from 'react';

import { Button } from '@ariakit/react';
import clsx from 'clsx';
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Cancel01Icon,
  Delete02Icon,
  Edit02Icon,
  GitCommitIcon,
  GitPullRequestIcon,
  ZapIcon,
} from 'hugeicons-react';
import { toast } from 'sonner';

import { toggleWebhookTriggerAction } from '@/app/actions/toggleWebhookTriggerAction';
import { Badge, BadgeProps } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/Switch';
import { WebhookTriggersModel } from '@/generated/prisma/models/WebhookTriggers';

const getDifficultyConfig: (priority: number) => {
  label: string;
  variant: BadgeProps['variant'];
} = (priority: number) => {
  if (priority <= 0.1) return { label: 'Trivial', variant: 'neutral' };
  if (priority === 1) return { label: 'Easy', variant: 'success' };
  if (priority === 1.5) return { label: 'Medium', variant: 'warning' };
  if (priority >= 2) return { label: 'Hard', variant: 'error' };

  return { label: 'Unknown', variant: 'primary' };
};

const getEventIcon = (event: string) => {
  if (event.includes('push')) return <GitCommitIcon size={18} />;
  if (event.includes('pull_request')) return <GitPullRequestIcon size={18} />;
  return <ZapIcon size={18} />;
};

export type WebhookTriggersListItemProps = {
  trigger: WebhookTriggersModel;
  onOpenDeleteAction?: (trigger: WebhookTriggersModel) => void;
  onOpenEditAction?: (trigger: WebhookTriggersModel) => void;
};

export const WebhookTriggersListItem: FC<WebhookTriggersListItemProps> = ({
  trigger,
  onOpenDeleteAction,
  onOpenEditAction,
}) => {
  const [isActive, setIsActive] = useState(trigger.isActive);
  const [isPending, startTransition] = useTransition();

  const difficulty = getDifficultyConfig(trigger.taskPriority);

  const handleToggle = (checked: boolean) => {
    setIsActive(checked);

    startTransition(async () => {
      try {
        await toggleWebhookTriggerAction(trigger.uuid, checked);
        toast.success('Trigger updated successfully');
      } catch {
        setIsActive(!checked);
        toast.error('Failed to update trigger status');
      }
    });
  };

  return (
    <div
      key={trigger.uuid}
      className={clsx(
        'group flex flex-col gap-4 rounded-xl p-4 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between',
        !isActive ? 'bg-slate-50/80' : 'bg-white',
      )}
    >
      <div
        className={clsx('flex items-center gap-4', !isActive && 'opacity-75')}
      >
        <div
          className={clsx(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors',
            !isActive
              ? 'bg-slate-200 text-slate-500'
              : 'bg-violet-50 text-violet-600',
          )}
        >
          {!isActive ? <Cancel01Icon size={18} /> : getEventIcon(trigger.event)}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4
              className={clsx(
                'font-semibold transition-colors',
                !isActive ? 'text-slate-500 line-through' : 'text-slate-900',
              )}
            >
              {trigger.taskTitle}
            </h4>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
            <Badge shape="square">on: {trigger.event}</Badge>
            <Badge shape="square" variant={difficulty.variant}>
              {difficulty.label}
            </Badge>
            <Badge
              shape="square"
              variant={trigger.scoreDirection === 'up' ? 'info' : 'error'}
            >
              {trigger.scoreDirection === 'up' ? (
                <>
                  <ArrowUp01Icon size={12} /> Reward
                </>
              ) : (
                <>
                  <ArrowDown01Icon size={12} /> Punish
                </>
              )}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <Switch
          checked={isActive}
          onChange={e => handleToggle(e.target.checked)}
          disabled={isPending}
          title={isActive ? 'Deactivate Trigger' : 'Activate Trigger'}
        />

        <div className="flex items-center gap-1 border-l border-slate-100 pl-4 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          <Button
            onClick={() => onOpenEditAction?.(trigger)}
            className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
            title="Edit Trigger"
          >
            <Edit02Icon size={18} />
          </Button>
          <Button
            onClick={() => onOpenDeleteAction?.(trigger)}
            className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
            title="Delete Trigger"
          >
            <Delete02Icon size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
