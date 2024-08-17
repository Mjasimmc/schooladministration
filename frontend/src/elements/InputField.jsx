import React from 'react';

const InputField = ({ id, name, type, autoComplete, required, label, placeholder, helperText, ...props }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...props}
        />
      </div>
      {helperText && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;
