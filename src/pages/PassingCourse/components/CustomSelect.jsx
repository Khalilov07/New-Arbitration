import React, { useState } from 'react';
import { ChevronDown } from '../../../ui/icons';

const CustomSelect = ({ options, onChange, defaultValue, widthPc, widthMob }) => {
    const [selected, setSelected] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value) => {
        setSelected(value);
        if (onChange) onChange(value);
        setIsOpen(false);
    };

    return (
        <div
            className="flex relative sm:w-auto"
            style={{ width: widthMob, minWidth: widthPc }}
            tabIndex={0}
            onBlur={() => setIsOpen(false)}
        >
            <div
                className="w-full border border-[#402D1D] bg-[#F2F2F3] rounded-xl p-2 flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className='text-xs sm:text-base'>
                    {options.find(opt => opt.value === selected)?.label ?? "Select an option"}
                </span>
                <ChevronDown width='16px' className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </div>

            {isOpen && (
                <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
