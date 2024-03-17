import clsx from 'clsx';
import React from 'react';

/**
 * @param {import('react').ComponentProps<'div'>} props
 */
const Skeleton = ({ ...props }) => {
  return <div {...props} className={clsx(props.className, 'animate-pulse w-full bg-base-300 rounded-xl')} />;
};

export default Skeleton;
