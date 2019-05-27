import { lighten } from '@material-ui/core/styles/colorManipulator'
export default theme => ({
    root: {
        paddingRight: theme.spacing.unit,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    actions: {
        color: theme.palette.text.secondary,
        width: '15%'
    },
    buttons: {
        display: 'inline-block',
        paddingRight: '5px'
    },
    title: {
        flex: '0 0 auto',
    },
})