import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { deepOrange, orange, indigo } from '@material-ui/core/colors';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
      },
    palette: {
        primary: indigo,
        secondary: orange,
    }
})

export default ({ children }) => {
    return (
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
    )
}
