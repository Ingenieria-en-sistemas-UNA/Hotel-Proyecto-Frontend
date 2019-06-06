import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import Button from '@material-ui/core/Button'
import DownloadPDF from '../../PDF/components/DownloadPDF'
import PDF from '../../PDF/components/VoucherPDF'

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
})

class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0)
    }

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1)
    }

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1)
    }

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        )
    }

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        )
    }
}

TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
)

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
})

class CustomPaginationActionsTable extends React.Component {
    state = {
        rows: [],
        page: 0,
        rowsPerPage: 5,
    }

    createData = reserves => {
        let array = []
        reserves.forEach((reserve, i) => {
            const { localDate, room: { type }, voucher: { numberNight, price } } = reserve
            array = [...array, { id: i + 1, type, numberNight, price, localDate, reserve }]
        })
        return array.sort((a, b) => {
            let dateA = new Date(a.localDate)
            let dateB = new Date(b.localDate)
            return dateA < dateB ? -1 : 1
        })
    }

    componentDidMount() {
        const { ReserveHistory = [] } = this.props
        this.setRows(ReserveHistory)
    }
    setRows = (ReserveHistory) => {
        this.setState(prevState => ({ ...prevState, rows: this.createData(ReserveHistory) }))
    }
    componentWillReceiveProps({ ReserveHistory }) {
        this.setRows(ReserveHistory)
    }

    handleChangePage = (event, page) => {
        this.setState({ page })
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value })
    }

    handlerVoucher = reserve => () => {
        this.setState(prevState => ({ ...prevState, downloading: reserve }))
    }

    render() {
        const { classes } = this.props
        const { rows, rowsPerPage, page, downloading = false } = this.state
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

        return (
            <Fragment>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            #{row.id}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            Tipo: {row.type}
                                        </TableCell>
                                        <TableCell align="right">Noches: {row.numberNight}</TableCell>
                                        <TableCell component="th" scope="row">
                                            total: ${row.price}
                                        </TableCell>
                                        <TableCell align="right">Fecha: {row.localDate}</TableCell>
                                        <TableCell align="right">
                                            <Button variant='outlined' size='small' color='secondary' onClick={this.handlerVoucher(row.reserve)} >
                                                Factura
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 48 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        colSpan={3}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActionsWrapped}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>
                {
                    downloading && (
                        <DownloadPDF
                            PDF={<PDF reserve={downloading} title='Factura de Reserva' />}
                            filename={`Factura-${downloading.id}-${downloading.localDate.replace('/', '-')}`}
                            config={{ config: { data: [downloading] } }}
                        />
                    )
                }
            </Fragment>
        )
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CustomPaginationActionsTable)
