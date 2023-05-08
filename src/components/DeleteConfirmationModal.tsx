import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}
export default function DeleteConfirmationModal({ isOpen, onClose, onDelete }: DeleteConfirmationModalProps) {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this item?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onDelete} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
