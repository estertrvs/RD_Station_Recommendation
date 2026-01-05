import React from 'react';

function SubmitButton({ text, className = '', type = 'button' }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center font-semibold ${className}`}
      aria-label={text}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
