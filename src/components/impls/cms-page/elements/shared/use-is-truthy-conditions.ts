import { useRouter } from 'next/router';
import React from 'react';
import { RecordLike } from '~/types';

type Condition = RecordLike<{
  key: string;
  value: string;
}>;

function useIsTruthyConditions(conditions: Condition[]) {
  const router = useRouter();

  return React.useMemo(
    () =>
      conditions?.every((condition) => {
        const actualValue = router.query[condition.key];
        const expectedValue = condition.value;
        const isOptional = expectedValue.endsWith('?');

        return actualValue === expectedValue || (isOptional && !actualValue);
      }),
    [conditions, router.query]
  );
}

export default useIsTruthyConditions;
