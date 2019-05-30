const imgUrl = 'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80'

export default theme => ({
    heroUnit: {
        backgroundImage: `url(${imgUrl})`,
        backgroundrepeat: 'no-repeat',
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 5,
        marginBottom: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 5}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 5
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    }
})