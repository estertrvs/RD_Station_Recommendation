import React from 'react';

function Checkbox({
  id,
  name,
  type = 'checkbox',
  value,
  checked = false,
  onChange = () => {},
  className = '',
  children,
  ...rest
}) {
  const isRadio = type === 'radio';

  const baseVisual = 'flex-none flex items-center justify-center w-5 h-5 md:w-6 md:h-6 border-2 transition-colors';
  const checkedClasses = 'bg-indigo-600 border-indigo-600';
  const uncheckedClasses = 'bg-white border-gray-300';
  const visualClasses = `${baseVisual} ${checked ? checkedClasses : uncheckedClasses} ${isRadio ? 'rounded-full' : 'rounded-md'}`;

  return (
    <label htmlFor={id} className={`flex items-start gap-3 cursor-pointer select-none ${className}`}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e)}
        className="sr-only"
        {...rest}
      />

      <span aria-hidden="true" className={visualClasses}>
        {isRadio ? (
          checked ? <span className="w-2.5 h-2.5 bg-white rounded-full" /> : null
        ) : (
          checked ? (
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M4 10l3 3 9-9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : null
        )}
      </span>

      <span className="flex-1 text-sm md:text-base text-gray-700 leading-tight break-words">
        {children}
      </span>
    </label>
  );
}

export default Checkbox;
