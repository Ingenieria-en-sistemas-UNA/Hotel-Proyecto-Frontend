export default theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
    },
    appBarShift: {
        width: `calc(100% - ${theme.drawerWidth}px)`,
        marginLeft: theme.drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'block'
        }
    },
    menuButtonAdmin: {
        marginLeft: 12,
        marginRight: 20,
    },
    toolbar: {
        paddingRight: 0
    },
    hide: {
        display: 'none'
    },
    buttonsPadding: {
        paddingRight: '20px'
    },
    title: {
        flex: 1,
        justifyContent: 'space-around'
    },
    links: {
        textDecoration: 'none',
        color: '#fff',
        paddingLeft: '20px'
    },
    options: {
        display: 'inline-block',
        paddingLeft: '20px'
    },
    itemContainer: {
        textAlign: 'center'
    },
    fab: {
        margin: theme.spacing.unit
    },
    headerButton: {
        display: 'inline-block',
        paddingLeft: '20px',
        [theme.breakpoints.down('xs')]:{
            display: 'none'
        }
    }
})