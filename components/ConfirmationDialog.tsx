import React, { useEffect } from 'react';

// Custom Props
interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    icon?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, icon, message, onConfirm, onCancel }) => {
    // Transferir focus for modal when open
    useEffect(() => {
        if (isOpen) {
            // Logic for modal mode if necessary
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Rendering area
    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>

            {/* Modal */}
            <div className="fixed top-[273px] left-[555px] w-[20.75rem] h-[13.69rem] bg-gray-200 rounded-lg z-50">
                {/* Ícone e Mensagem */}
                <div className="flex justify-center items-center h-16 relative">
                    {icon && <img src={icon} alt="Ícone" className="absolute h-auto w-auto top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
                </div>

                {/* Message */}
                <div className="absolute text-[2.63rem] leading-[2.25rem] uppercase font-semibold font-mango-grotesque text-neutrals-color-neutral-100 text-center inline-block top-[3rem] left-[0.75rem] right-[0.81rem] w-[19.31rem] h-[2.5rem]">
                    <p>{message}</p>
                </div>

                {/* Buttons */}
                <div className="absolute bottom-[1.94rem] left-[2.06rem]" onClick={onConfirm}>
                    <button
                        className="rounded-md bg-brand-color-brand-orange-high w-[7.81rem] h-[2.63rem] cursor-pointer">
                        <b className="uppercase">SIM</b>
                    </button>
                </div>
                <div className="absolute bottom-[1.94rem] left-[10.88rem]" onClick={onCancel}>
                    <button
                        className="rounded-md border border-neutrals-color-neutral-100 w-[7.81rem] h-[2.63rem] cursor-pointer">
                        <b className="uppercase">NÃO</b>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ConfirmationDialog;
