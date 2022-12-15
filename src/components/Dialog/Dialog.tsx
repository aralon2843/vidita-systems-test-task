import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FC } from 'react';
import { Document } from '../../types/document';

interface IAlertDialog {
  open: boolean;
  title: string;
  selected: Pick<Document, 'id' | 'name'>[];
  handleClose: () => void;
  handleConfirm: (documentsId: string[]) => void;
}

const AlertDialog: FC<IAlertDialog> = ({ open, title, selected, handleClose, handleConfirm }) => {
  console.log(title);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{selected.map((document) => document.name).join(', ')}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отменить</Button>
        <Button
          color='error'
          onClick={() => {
            handleConfirm(selected.map((document) => document.id));
            handleClose();
          }}
          autoFocus
        >
          Применить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
