import { Popover } from "@mui/material";
import { ReactNode } from "react";

interface PopoverProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    children?: ReactNode | ReactNode[];
    handleClose: () => void;
}

export const CustomPopover = (props: PopoverProps) => {

    const { open, anchorEl, children, handleClose } = props;

    if (!anchorEl) return null;
    
    return (
        <Popover open={open}
            anchorEl={anchorEl}
            disablePortal={false}
            onClose={handleClose}
        >
            {children}
        </Popover>
    );
}