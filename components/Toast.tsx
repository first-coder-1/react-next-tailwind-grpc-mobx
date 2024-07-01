import React, { useEffect, useState } from 'react';

// Custom Props
interface ToastProps {
    borderColor: string;
    icon?: string; 
    message: string; 
    secondaryMessage?: string;
    isVisible: boolean;
    onClose: () => void; 
}


const Toast: React.FC<ToastProps> = ({ borderColor, icon, message, secondaryMessage, isVisible, onClose }) => {
    const [show, setShow] = useState(isVisible);

    useEffect(() => {
        setShow(isVisible);
    }, [isVisible]);

    // Close Toast after interval
    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setShow(false);
                onClose();
            }, 4000);
        }
    }, [show, onClose]);

    // Rendering area
    return (

        <div className={`fixed top-[21.91rem] left-0 transform ${show ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 w-[22.25rem] h-[3.13rem] rounded-br-lg shadow-lg bg-gray-200 flex items-center`}>

            {/* Border Color */}
            <div style={{ backgroundColor: borderColor }} className="relative rounded-tl-3xs rounded-br-none w-[0.5rem] h-full"></div>
            
            <img src={icon} alt="Ícone" className="inline-block h-[1.5rem] w-[1.5rem] p-2 my-auto ml-4" />
            <p className="text-[1.5rem] uppercase font-semibold font-mango-grotesque text-neutrals-color-neutral-100 text-center w-full">
                {message}
            </p>
            {secondaryMessage && (
                <p className="text-[0.75rem] w-full text-center break-words">
                    {secondaryMessage}
                </p>
            )}
        </div>
    );

};

export default Toast;

