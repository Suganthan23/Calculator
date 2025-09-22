import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  type = 'number'
}) => {
  const getButtonClass = () => {
    switch (type) {
      case 'operator':
        return 'btn-operator';
      case 'special':
        return 'btn-special';
      case 'equals':
        return 'btn-equals';
      default:
        return 'btn-number';
    }
  };

  return (
    <button
      className={`${getButtonClass()} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;