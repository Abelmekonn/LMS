import React, { FC } from 'react';
import { Modal, Box } from '@mui/material';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number | string; // Replace with a more specific type if needed
    component: React.ComponentType<{ setOpen: (open: boolean) => void; setRoute: (route: string) => void; refetch?: () => void }>; // Make refetch optional
    setRoute: (route: string) => void;
    refetch?: () => void; // Optional refetch function
};
const CustomModel: FC<Props> = ({ open, setOpen, setRoute, component: Component, activeItem,refetch }) => {
    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className="absolute top-[50%] left-[54%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none"
            >
                <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch} />
            </Box>
        </Modal>
    );
};

export default CustomModel;
