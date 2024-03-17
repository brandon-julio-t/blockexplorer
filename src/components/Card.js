import clsx from 'clsx';
import React from 'react';

/**
 * @param {import('react').ComponentProps<'div'>} params
 */
const Card = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx(className, 'card bg-base-100 rounded-xl border border-base-300')}>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
