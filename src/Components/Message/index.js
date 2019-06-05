import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import SnackbarContentWrapper from './SnackbarContentWrapper'




class Message extends React.Component {
  state = {
    open: true
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    this.setState({ open: false })
  }

  render() {
    const { message, type } = this.props
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <SnackbarContentWrapper
            onClose={this.handleClose}
            variant={type}
            message={message}
          />
        </Snackbar>
      </div>
    )
  }
}


export default Message
