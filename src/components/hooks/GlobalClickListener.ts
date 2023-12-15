import { useEffect } from 'react';

const useGlobalClickListener = (callback: any) => {
  useEffect(() => {
    const handleClick = (event: any) => {
      callback(event);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback]);

};

export default useGlobalClickListener;
