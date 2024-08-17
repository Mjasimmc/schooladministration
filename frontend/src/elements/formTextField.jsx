import React from 'react';

const FormTextField = ({ id, name, type, placeholder, label, helperText, icon, ...props }) => {
    return (
        <div className="relative">
            <input
                id={id}
                name={name}
                type={type}
                placeholder=""
                className="peer w-full p-4 pt-6 pl-10 pr-4 bg-inherit border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed border-gray-500 focus:border-purple-500"
                {...props}
            />
            <label
                htmlFor={id}
                className="absolute text-gray-500 text-base duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-purple-500"
            >
                {label}
            </label>
            {icon && (
                <svg
                    className="absolute top-6 left-4"
                    fill=""
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                >
                    {icon}
                </svg>
            )}
            {helperText && (
                <label className="pt-1 block text-gray-500 text-sm">
                    {helperText}
                </label>
            )}
        </div>
    );

}

export default FormTextField;
