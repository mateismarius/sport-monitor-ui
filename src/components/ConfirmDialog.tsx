import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {Box, Button, IconButton, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";


const ConfirmDialog = () => {
    return (
        <
            Dialog open={true} maxWidth="sm" fullWidth>
            <DialogTitle>Confirm the action</DialogTitle>
            <Box position="absolute" top={0} right={0}>
                <IconButton>
                    <Close />
                </IconButton>
            </Box>
            <DialogContent>
                <Typography>some message here</Typography>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained">
                    Cancel
                </Button>
                <Button color="secondary" variant="contained">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;