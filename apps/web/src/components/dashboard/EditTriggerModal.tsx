'use client';

import { FC, useTransition } from 'react';

import {
  DialogProvider,
  Form,
  FormError,
  FormSubmit,
  useFormStore,
} from '@ariakit/react';
import { PencilEdit02Icon } from 'hugeicons-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { DialogDismiss } from '@/components/ui/DialogDismiss';
import { FormInput } from '@/components/ui/FormInput';
import { FormLabel } from '@/components/ui/FormLabel';
import { FormSelect } from '@/components/ui/FormSelect';
import { Heading } from '@/components/ui/Heading';
import { SelectItem } from '@/components/ui/SelectItem';
import { TriggersModel } from '@/generated/prisma/models/Triggers';
import { useGithubEventsOptions } from '@/hooks/useGithubEventsOptions';
import { TriggerSchema, triggerSchema } from '@/schemas/triggerSchema';
import { useTriggersStore } from '@/store/useTriggersStore';

export type EditWebhookTriggerModalProps = {
  open: boolean;
  setOpenAction: (open: boolean) => void;
  trigger: TriggersModel;
  onSuccessAction?: () => void;
};

export const EditTriggerModal: FC<EditWebhookTriggerModalProps> = ({
  open,
  setOpenAction,
  trigger,
  onSuccessAction,
}) => {
  const githubEventOptions = useGithubEventsOptions();
  const updateTrigger = useTriggersStore(state => state.updateTrigger);
  const [isPending, startTransition] = useTransition();

  const form = useFormStore<TriggerSchema>({
    defaultValues: {
      event: trigger.event,
      taskTitle: trigger.taskTitle,
      taskNote: trigger.taskNote || '',
      scoreDirection: trigger.scoreDirection,
      taskPriority: trigger.taskPriority,
      taskAttribute: trigger.taskAttribute,
      taskFrequency: trigger.taskFrequency,
    },
  });

  form.useSubmit(async state => {
    const validation = triggerSchema.safeParse(state.values);

    if (!validation.success) {
      validation.error.issues.forEach(issue => {
        form.setError(issue.path[0] as string, issue.message);
      });
      return;
    }

    startTransition(async () => {
      const updatedTrigger = await updateTrigger(trigger.uuid, validation.data);

      if (updatedTrigger) {
        toast.success('Trigger updated successfully');
        setOpenAction(false);
        onSuccessAction?.();
      }
    });
  });

  return (
    <DialogProvider open={open} setOpen={setOpenAction}>
      <Dialog>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
              <PencilEdit02Icon size={20} />
            </div>
            <Heading as="h2" size="lg">
              Edit Trigger
            </Heading>
          </div>
          <DialogDismiss label="Close the edit webhook trigger modal" />
        </div>

        <Form store={form} className="space-y-4">
          <div>
            <FormLabel
              name="event"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              When this happens on GitHub...
            </FormLabel>
            <FormSelect name="event">{githubEventOptions}</FormSelect>
            <FormError name="event" className="mt-1 text-xs text-red-500" />
          </div>

          <div className="my-4 border-t border-slate-100" />

          {/* Task Details */}
          <div>
            <FormLabel name="taskTitle">...do this in Habitica</FormLabel>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FormInput
                  name="taskTitle"
                  placeholder="Task Title (e.g. Pushed Code)"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                />
                <FormError
                  name="taskTitle"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              {/* Difficulty */}
              <div>
                <FormLabel name="taskPriority">Difficulty</FormLabel>
                <FormSelect name="taskPriority">
                  <SelectItem value="0.1">Trivial</SelectItem>
                  <SelectItem value="1">Easy</SelectItem>
                  <SelectItem value="1.5">Medium</SelectItem>
                  <SelectItem value="2">Hard</SelectItem>
                </FormSelect>
              </div>

              {/* Attribute */}
              <div>
                <FormLabel name="taskAttribute">Attribute</FormLabel>
                <FormSelect name="taskAttribute">
                  <SelectItem value="str">STR</SelectItem>
                  <SelectItem value="int">INT</SelectItem>
                  <SelectItem value="con">CON</SelectItem>
                  <SelectItem value="per">PER</SelectItem>
                </FormSelect>
              </div>

              {/* Direction */}
              <div>
                <FormLabel name="scoreDirection">Action</FormLabel>
                <FormSelect name="scoreDirection">
                  <SelectItem value="up">Reward (XP/Gold)</SelectItem>
                  <SelectItem value="down">Punish (Lose Health)</SelectItem>
                </FormSelect>
              </div>

              {/* Frequency */}
              <div>
                <FormLabel name="taskFrequency">Reset Counter</FormLabel>
                <FormSelect name="taskFrequency">
                  <SelectItem value="DAILY">Daily</SelectItem>
                  <SelectItem value="WEEKLY">Weekly</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="YEARLY">Yearly</SelectItem>
                </FormSelect>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setOpenAction(false)}
              type="button"
            >
              Cancel
            </Button>
            <FormSubmit
              render={
                <Button disabled={isPending}>
                  {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              }
            />
          </div>
        </Form>
      </Dialog>
    </DialogProvider>
  );
};
