import { renderHook } from '@testing-library/react';

import { GithubSelectedRepositoriesModel } from '@/generated/prisma/models/GithubSelectedRepositories';

import { useRepositoryOptions } from './useRepositoryOptions';

describe('useRepositoryOptions', () => {
  it('should return an empty array when input is empty', () => {
    const { result } = renderHook(() => useRepositoryOptions([]));
    expect(result.current).toEqual([]);
  });

  it('should correctly map repositories to options', () => {
    const mockRepositories = [
      { uuid: 'uuid-1', fullName: 'user/repo-one' },
      { uuid: 'uuid-2', fullName: 'user/repo-two' },
    ] as GithubSelectedRepositoriesModel[];

    const { result } = renderHook(() => useRepositoryOptions(mockRepositories));

    expect(result.current).toEqual([
      { value: 'uuid-1', label: 'user/repo-one' },
      { value: 'uuid-2', label: 'user/repo-two' },
    ]);
  });

  it('should memoize the result', () => {
    const mockRepositories = [
      { uuid: 'uuid-1', fullName: 'user/repo-one' },
    ] as GithubSelectedRepositoriesModel[];

    const { result, rerender } = renderHook(
      props => useRepositoryOptions(props),
      { initialProps: mockRepositories },
    );

    const firstResult = result.current;

    rerender(mockRepositories);

    expect(result.current).toBe(firstResult);
  });
});
