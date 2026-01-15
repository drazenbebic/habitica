'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { AddTriggerModal } from '@/components/dashboard/AddTriggerModal';
import { DeleteTriggerModal } from '@/components/dashboard/DeleteTriggerModal';
import { EditTriggerModal } from '@/components/dashboard/EditTriggerModal';
import { TriggersList } from '@/components/dashboard/TriggersList';
import { TriggersModel } from '@/generated/prisma/models/Triggers';

export default function Page() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [editingTrigger, setEditingTrigger] = useState<TriggersModel | null>(
    null,
  );
  const [deletingTrigger, setDeletingTrigger] = useState<TriggersModel | null>(
    null,
  );

  return (
    <>
      <TriggersList
        onOpenCreateAction={() => setCreateModalOpen(true)}
        onOpenDeleteAction={trigger => setDeletingTrigger(trigger)}
        onOpenEditAction={trigger => setEditingTrigger(trigger)}
      />
      <AddTriggerModal
        open={isCreateModalOpen}
        setOpenAction={setCreateModalOpen}
        onSuccessAction={() => {
          setCreateModalOpen(false);
          toast.success('Trigger created successfully.');
        }}
      />

      {editingTrigger && (
        <EditTriggerModal
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
        <DeleteTriggerModal
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
