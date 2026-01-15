'use client';

import { FC, ReactNode, useState } from 'react';

import { Tab, TabList, TabPanel, TabProvider } from '@ariakit/react';
import clsx from 'clsx';
import { Activity01Icon, FlashIcon, Settings01Icon } from 'hugeicons-react';
import { toast } from 'sonner';

import { AddWebhookTriggerModal } from '@/components/dashboard/AddWebhookTriggerModal';
import { DeleteWebhookTriggerModal } from '@/components/dashboard/DeleteWebhookTriggerModal';
import { EditWebhookTriggerModal } from '@/components/dashboard/EditWebhookTriggerModal';
import { HabiticaUserForm } from '@/components/dashboard/HabiticaUserForm';
import { WebhookTriggersList } from '@/components/dashboard/WebhookTriggersList';
import { Card } from '@/components/ui/Card';
import { CardBody } from '@/components/ui/CardBody';
import { WebhookTriggersModel } from '@/generated/prisma/models/WebhookTriggers';

export const MainPanel: FC = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [editingTrigger, setEditingTrigger] =
    useState<WebhookTriggersModel | null>(null);
  const [deletingTrigger, setDeletingTrigger] =
    useState<WebhookTriggersModel | null>(null);

  return (
    <Card variant="elevated" className="h-full">
      <TabProvider defaultSelectedId="triggers">
        <div className="border-b border-slate-100 px-6 pt-6">
          <TabList
            className="-mb-px flex space-x-6"
            aria-label="Dashboard Views"
          >
            <TabItem id="triggers" icon={FlashIcon}>
              Triggers
            </TabItem>
            <TabItem id="history" icon={Activity01Icon}>
              History
            </TabItem>
            <TabItem id="settings" icon={Settings01Icon}>
              Settings
            </TabItem>
          </TabList>
        </div>

        <CardBody className="h-full">
          <TabPanel tabId="triggers" className="outline-none h-full">
            <WebhookTriggersList
              onOpenCreateAction={() => setCreateModalOpen(true)}
              onOpenDeleteAction={trigger => setDeletingTrigger(trigger)}
              onOpenEditAction={trigger => setEditingTrigger(trigger)}
            />
          </TabPanel>

          <TabPanel tabId="history" className="outline-none">
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
              <p className="text-slate-500">Recent Webhooks Table goes here</p>
            </div>
          </TabPanel>

          <TabPanel tabId="settings" className="outline-none">
            <HabiticaUserForm />
          </TabPanel>
        </CardBody>
      </TabProvider>

      <AddWebhookTriggerModal
        open={isCreateModalOpen}
        setOpenAction={setCreateModalOpen}
        onSuccessAction={() => {
          setCreateModalOpen(false);
          toast.success('Trigger created successfully.');
        }}
      />

      {editingTrigger && (
        <EditWebhookTriggerModal
          key={`edit-${editingTrigger.uuid}`}
          trigger={editingTrigger}
          open={!!editingTrigger}
          setOpenAction={open => {
            if (!open) {
              setEditingTrigger(null);
            }
          }}
          onSuccessAction={() => {
            setEditingTrigger(null);
            toast.success('Trigger updated successfully.');
          }}
        />
      )}

      {deletingTrigger && (
        <DeleteWebhookTriggerModal
          key={`delete-${deletingTrigger.uuid}`}
          trigger={deletingTrigger}
          open={!!deletingTrigger}
          setOpenAction={open => {
            if (!open) {
              setDeletingTrigger(null);
            }
          }}
          onSuccessAction={() => {
            setEditingTrigger(null);
            toast.success('Trigger deleted successfully.');
          }}
        />
      )}
    </Card>
  );
};

type TabItemProps = {
  id: string;
  children: ReactNode;
  icon: FC<{ size: number; className?: string }>;
};

const TabItem: FC<TabItemProps> = ({ id, children, icon: Icon }) => {
  return (
    <Tab
      id={id}
      className={clsx(
        'group cursor-pointer inline-flex items-center gap-2 border-b-2 border-transparent py-4 text-sm font-medium text-slate-500 transition-colors outline-none',
        'hover:border-slate-300 hover:text-slate-700',
        'focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2',
        'data-active-item:border-violet-600 data-active-item:text-violet-600',
      )}
    >
      <Icon
        size={18}
        className={clsx(
          'text-slate-400 transition-colors group-hover:text-slate-500',
          'group-data-active-item:text-violet-600',
        )}
      />
      {children}
    </Tab>
  );
};
