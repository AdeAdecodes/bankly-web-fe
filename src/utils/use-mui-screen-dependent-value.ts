import { useTheme } from '@mui/material';
import throttle from 'lodash/throttle';
import React from 'react';

type Values<T> = Record<string, T>;

export function useScreenDependentValueFn<T = unknown>() {
  const theme = useTheme();
  const matchedKey = useMatchedScreenKey(['sm']);

  return (values: Values<T>) => {
    if (matchedKey in values) {
      return values[matchedKey];
    }

    return values[getMatchedKey(Object.keys(values), theme.breakpoints.up)];
  };
}

export function useScreenDependentValue<T = unknown>(values: Values<T>) {
  const matchedScreenKey = useMatchedScreenKey(Object.keys(values));
  return values[matchedScreenKey];
}

function useMatchedScreenKey(keys: any) {
  const theme = useTheme();
  const [matchedKey, setMatchedKey] = React.useState(() =>
    getMatchedKey(keys, theme.breakpoints.up)
  );
  const prevMatchedKeyRef = React.useRef(matchedKey);

  React.useEffect(() => {
    let active = true;

    const handleWindowResize = throttle(() => {
      if (active) {
        const newMatchedKey = getMatchedKey(keys, theme.breakpoints.up);

        if (prevMatchedKeyRef.current !== newMatchedKey) {
          setMatchedKey(newMatchedKey);
        }

        prevMatchedKeyRef.current = newMatchedKey;
      }
    }, 50);

    window.addEventListener('resize', handleWindowResize);

    return () => {
      handleWindowResize.cancel();
      active = false;
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [keys, theme.breakpoints]);

  return matchedKey;
}

function getMatchedKey(keys: string[], queryFn: (key: any) => string) {
  if (typeof window !== 'undefined') {
    for (let i = keys.length - 1; i >= 0; i--) {
      const key = keys[i];
      const query = queryFn(key).replace(/^@media( ?)/m, '');

      if (window.matchMedia(query).matches) {
        return key;
      }
    }
  }

  return keys[keys.length - 1];
}
