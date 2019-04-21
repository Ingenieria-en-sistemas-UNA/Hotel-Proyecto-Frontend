export default theme => ({
    drawer: {
        width: theme.drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: theme.drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
})