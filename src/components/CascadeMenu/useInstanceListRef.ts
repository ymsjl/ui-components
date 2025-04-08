import React from 'react';

export const useInstanceListRef = <T>(): [React.RefObject<T[]>, (ref: T, index: number) => void] => {
  const instanceListRef = React.useRef<T[]>([]);
  const getInstanceRef = (ref: T, index: number) => {
    if (
      instanceListRef.current &&
      Array.isArray(instanceListRef.current)
    ) {
      instanceListRef.current[index] = ref;
    }
  };
  return [instanceListRef, getInstanceRef];
};