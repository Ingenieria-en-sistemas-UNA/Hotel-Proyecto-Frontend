import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Grid } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import { stableSort, getSorting } from './utils/FilterActions'
import styles from './jss/stylesTable'
import Row from './Rows'
class EnhancedTable extends Component {

    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 5,
    }

    handleRequestSort = (event, property) => {
        const orderBy = property
        let order = 'desc'

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc'
        }

        this.setState({ order, orderBy })
    }

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }))
            return
        }
        this.setState({ selected: [] })
    }

    handleClick = (event, id) => {
        const { selected } = this.state
        const selectedIndex = selected.indexOf(id)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }

        this.setState({ selected: newSelected })
    }

    handleChangePage = (event, page) => {
        this.setState({ page })
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value })
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1

    componentDidMount() {
        const { config: { data } } = this.props
        this.setState({ data })
    }

    componentWillReceiveProps({ config: { data } }) {
        this.setState({ data })
    }

    handlerDeleteItems = () => {
        const { selected } = this.state
        const { handlerDeleteItems } = this.props
        handlerDeleteItems(selected)
        this.cleanSelected()
    }

    cleanSelected = () => {
        this.setState({
            selected: []
        })
    }

    handlerCreateReport = () => {
        const { selected } = this.state
        const { handlerCreateReport } = this.props
        handlerCreateReport(selected)
        this.cleanSelected()
    }

    render() {
        const { classes, config: { rows, column }, title, handlerChangeFilter, handleClickOpen, handlerUpdateItem } = this.props
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
        return (
            <Grid container>
                <Paper className={classes.root}>
                    <EnhancedTableToolbar numSelected={selected.length} title={title}
                        handlerChangeFilter={handlerChangeFilter}
                        handleClickOpen={handleClickOpen}
                        handlerDeleteItems={this.handlerDeleteItems}
                        handlerCreateReport={this.handlerCreateReport}
                    />
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                                rows={rows}
                            />
                            <TableBody>
                                {stableSort(data, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(item => {
                                        const isSelected = this.isSelected(item.id)
                                        return <Row
                                            key={item.id}
                                            item={item}
                                            
                                            isSelected={isSelected}
                                            handleClick={this.handleClick}
                                            columsConfig={column}
                                            handlerUpdateItem={handlerUpdateItem}
                                        />
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>
        )
    }
}

EnhancedTable.propTypes = {
    config: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    handlerChangeFilter: PropTypes.func.isRequired,
    handleClickOpen: PropTypes.func,
    handlerUpdateItem: PropTypes.func,
    handlerDeleteItems: PropTypes.func,
    handlerCreateReport: PropTypes.func
}

export default withStyles(styles)(EnhancedTable)