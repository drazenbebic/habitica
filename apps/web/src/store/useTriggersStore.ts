import { toast } from 'sonner';
import { create } from 'zustand';

import { createTriggerAction } from '@/actions/triggers/createTriggerAction';
import { deleteTriggerAction } from '@/actions/triggers/deleteTriggerAction';
import { getTriggersAction } from '@/actions/triggers/getTriggersAction';
import { toggleTriggerAction } from '@/actions/triggers/toggleTriggerAction';
import { updateTriggerAction } from '@/actions/triggers/updateTriggerAction';
import { TriggersModel } from '@/generated/prisma/models/Triggers';
import { ToggleTriggerSchema } from '@/schemas/toggleTriggerSchema';
import { TriggerSchema } from '@/schemas/triggerSchema';

type TriggersStoreState = {
  trigger: TriggersModel | null;
  triggers: TriggersModel[];
  isLoading: boolean;
  fetchTriggers: () => Promise<void>;
  createTrigger: (data: TriggerSchema) => Promise<TriggersModel | null>;
  deleteTrigger: (uuid: string) => Promise<TriggersModel | null>;
  toggleTrigger: (data: ToggleTriggerSchema) => Promise<TriggersModel | null>;
  updateTrigger: (
    uuid: string,
    data: TriggerSchema,
  ) => Promise<TriggersModel | null>;
};

export const useTriggersStore = create<TriggersStoreState>((set, get) => ({
  trigger: null,
  triggers: [],
  isLoading: false,
  fetchTriggers: async () => {
    set({ isLoading: true });

    try {
      const result = await getTriggersAction();

      if (result.success && result.data) {
        set({ triggers: result.data });
      } else {
        console.error('Failed to fetch triggers:', result.error);
      }
    } catch (error) {
      console.error('Zustand fetchTriggers error:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  createTrigger: async data => {
    set({ isLoading: true });

    try {
      const result = await createTriggerAction(data);

      if (!result.success || !result.data) {
        toast.error(result.error || 'Failed to create trigger');
        return null;
      }

      set(state => ({ triggers: [result.data!, ...state.triggers] }));

      return result.data;
    } catch (error) {
      console.error('Zustand createTrigger error:', error);
      toast.error('An unexpected error occurred');
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteTrigger: async uuid => {
    const previousTriggers = get().triggers;

    set(state => ({
      triggers: state.triggers.filter(t => t.uuid !== uuid),
    }));

    try {
      const result = await deleteTriggerAction(uuid);

      if (!result.success || !result.data) {
        toast.error(result.error || 'Failed to delete trigger');
        set({ triggers: previousTriggers });
        return null;
      }

      return result.data;
    } catch (error) {
      console.error('Zustand deleteTrigger error:', error);
      toast.error('An unexpected error occurred');
      set({ triggers: previousTriggers });
      return null;
    }
  },
  toggleTrigger: async data => {
    const previousTriggers = get().triggers;

    set(state => ({
      triggers: state.triggers.map(t =>
        t.uuid === data.uuid ? { ...t, isActive: data.isActive } : t,
      ),
    }));

    try {
      const result = await toggleTriggerAction(data);

      if (!result.success || !result.data) {
        toast.error(result.error || 'Failed to update status');
        set({ triggers: previousTriggers });
        return null;
      }

      return result.data;
    } catch (error) {
      console.error('Zustand toggleTrigger error:', error);
      toast.error('An unexpected error occurred');
      set({ triggers: previousTriggers });
      return null;
    }
  },
  updateTrigger: async (uuid, data) => {
    const previousTriggers = get().triggers;

    set(state => ({
      triggers: state.triggers.map(t =>
        t.uuid === uuid ? { ...t, ...data } : t,
      ),
    }));

    try {
      const result = await updateTriggerAction(uuid, data);

      if (!result.success || !result.data) {
        toast.error(result.error || 'Failed to update trigger');

        set({ triggers: previousTriggers });
        return null;
      }

      set(state => ({
        triggers: state.triggers.map(t => (t.uuid === uuid ? result.data! : t)),
      }));

      return result.data;
    } catch (error) {
      console.error('Zustand updateTrigger error:', error);
      toast.error('An unexpected error occurred');

      set({ triggers: previousTriggers });
      return null;
    }
  },
}));
