import React from 'react'

export function Button({
    buttonText,
    type = 'button',
    bgColor= 'bg-blue-600',
    textColor = 'text-white',
    className = '',
}) {
     return (
        <>
        <button className={`px-4 py-2 rounded-md transition-all duration-300 
        hover:bg-white hover:text-black active:bg-gray-200 ${bgColor} ${textColor} ${className}`}{...props}>
            {buttonText}
        </button>
            
        </>
    )
}
export default Button