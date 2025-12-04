import React from 'react';

const Toggle = ({ label, description, checked, onChange }) => {
    return (
        <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            <div className="flex-1">
                <label className="text-sm font-semibold text-gray-700 cursor-pointer" onClick={onChange}>
                    {label}
                </label>
                {description && (
                    <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                )}
            </div>
            <button
                type="button"
                onClick={onChange}
                className={`toggle-switch ${checked ? 'toggle-switch-enabled' : 'toggle-switch-disabled'}`}
                role="switch"
                aria-checked={checked}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    );
};

export default Toggle;
