import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'md', className = '', style, ...props }) => (
  <span className={`badge badge-${variant} badge-${size} ${className}`} style={style} {...props}>
    {children}
  </span>
);

export default Badge;
