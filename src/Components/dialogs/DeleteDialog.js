import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'

const Transition = props => {
  return <Slide direction="up" {...props} />
}

class AlertDialogSlide extends React.Component {

  render() {
      const { open, handleCloseDialog, handlerDeteleItemsAccepted } = this.props
    return (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Eliminar
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              ¿Esta totalmente seguro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={handlerDeteleItemsAccepted} color="primary">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

export default AlertDialogSlide