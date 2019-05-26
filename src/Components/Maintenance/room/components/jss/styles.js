export default theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing.unit * 2,
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing.unit,
    },
    fab: {
        margin: '0 auto',
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto'
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        backgroundSize: 'contain',
        width: '300px'
    }
})