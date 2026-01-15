'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { AddWebhookTriggerModal } from '@/components/dashboard/AddWebhookTriggerModal';
import { DeleteWebhookTriggerModal } from '@/components/dashboard/DeleteWebhookTriggerModal';
import { EditWebhookTriggerModal } from '@/components/dashboard/EditWebhookTriggerModal';
import { WebhookTriggersList } from '@/components/dashboard/WebhookTriggersList';
import { WebhookTriggersModel } from '@/generated/prisma/models/WebhookTriggers';

export default function Page() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [editingTrigger, setEditingTrigger] =
    useState<WebhookTriggersModel | null>(null);
  const [deletingTrigger, setDeletingTrigger] =
    useState<WebhookTriggersModel | null>(null);

  return (
    <>
      <WebhookTriggersList
        onOpenCreateAction={() => setCreateModalOpen(true)}
        onOpenDeleteAction={trigger => setDeletingTrigger(trigger)}
        onOpenEditAction={trigger => setEditingTrigger(trigger)}
      />
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
    </>
  );
}
