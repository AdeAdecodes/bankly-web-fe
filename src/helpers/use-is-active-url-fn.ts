import { useRouter } from 'next/router';
import React from 'react';

export default function useIsActiveUrlFn() {
  const router = useRouter();

  return React.useCallback(
    (url: string) => {
      const resolvedPath = router.asPath.substring(1);
      const resolvedUrl = url.substring(1);

      return (
        resolvedPath === resolvedUrl
        // || (resolvedPath.startsWith(resolvedUrl) && resolvedUrl !== '')
      );
    },
    [router.asPath]
  );
}
