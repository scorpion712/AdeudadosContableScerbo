import { Breakpoint, Dialog, DialogActions, DialogContent, IconButton, Slide, Stack, SvgIcon, Typography } from '@mui/material';
import React from 'react' 
import CloseIcon from '@mui/icons-material/Close';

import { usePopUp } from '../hooks';
 

const Transition = React.forwardRef(function Transition(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: any,
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const CustomPopUp = () => {
    const { state, dispatch } = usePopUp();

    const handleClose = () => {
        dispatch({ type: 'CLOSE_POPUP' });
    };

    return (
        <Dialog
            open={state.open}
            TransitionComponent={Transition}
            onClose={handleClose}
            fullWidth
            maxWidth={state.maxWidth ? state.maxWidth as Breakpoint : "md"} 
            sx={{
                '& .MuiPaper-root': {
                    padding: 2,
                    borderRadius: 2
                },
                '& .MuiDialogContent-root': {
                    justifyContent: "center",
                    alignItems: 'center'
                },
                "& .MuiDialog-paper": {
                    borderRadius: "18px",
                },
            }}
        >
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={3}
                sx={{
                    px: 3,
                    py: 2,
                }}
            >
                <Typography variant="h6">{state.title}</Typography>
                <IconButton
                    color="inherit"
                    onClick={handleClose}
                >
                    <SvgIcon>
                        <CloseIcon />
                    </SvgIcon>
                </IconButton>
            </Stack>
            <DialogContent >
                {state.content}
            </DialogContent>
            <DialogActions>
                {state.actionContent}
            </DialogActions>
        </Dialog>
    )
} 
