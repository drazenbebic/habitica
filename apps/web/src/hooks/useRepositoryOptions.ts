'use client';

import { useMemo } from 'react';

import { ComboboxItemType } from '@/components/ui/Combobox';
import { GithubSelectedRepositoriesModel } from '@/generated/prisma/models/GithubSelectedRepositories';

export const useRepositoryOptions = (
  repositories: GithubSelectedRepositoriesModel[],
): ComboboxItemType[] => {
  return useMemo(
    () =>
      repositories.map(repository => ({
        value: repository.uuid,
        label: repository.fullName,
      })),
    [repositories],
  );
};
