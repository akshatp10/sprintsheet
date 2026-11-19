import { useEffect, useState } from 'react';
import { useIsFetching } from '@tanstack/react-query';

export const useIsSyncing = (delay = 300) => {
  const busy =
    useIsFetching({
      predicate: (query) => query.meta?.syncIndicator === true,
    }) > 0;

  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setShow(busy);
      },
      busy ? delay : 0,
    );

    return () => clearTimeout(timer);
  }, [busy, delay]);

  return busy && show;
};
