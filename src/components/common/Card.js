import React from 'react';

const Card = ({ children, title, className = '', action }) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
