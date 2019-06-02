import React, { Fragment, Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles, Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { CloudDownload } from '@material-ui/icons'
import FilterListIcon from '@material-ui/icons/FilterList'
import AddIcon from '@material-ui/icons/Add'
import InputSearch from './InputSearch'
import DeleteDialog from '../dialogs/DeleteDialog'
import toolbarStyles from './jss/stylesToolbar'

class EnhancedTableToolbar extends Component {
    state = {
        filter: false,
        open: false
    }

    toggleFilter = () => {
        this.setState(({ filter }) => ({
            filter: !filter
        }))
        const { handlerChangeFilter } = this.props
        handlerChangeFilter({ target: { value: '' } })
    }
    handlerDeleteItems = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handlerDeteleItemsAccepted = () => {
        this.props.handlerDeleteItems()
        this.handleClose()
    }

    render() {
        const { numSelected, classes, title, handlerChangeFilter, handleClickOpen, handlerCreateReport } = this.props,
            { filter, open } = this.state

        return (
            <Fragment>
                <Toolbar
                    className={classNames(classes.root, {
                        [classes.highlight]: numSelected > 0,
                    })}
                >
                    <div className={classes.title}>
                        {numSelected > 0 ? (
                            <Typography color="inherit" variant="subtitle1">
                                {numSelected} selected
                            </Typography>
                        ) : (
                                <Typography variant="h6" id="tableTitle">
                                    {title}
                                </Typography>
                            )}
                    </div>
                    {filter && <InputSearch handlerChangeFilter={handlerChangeFilter} />}
                    <div className={classes.actions}>
                        {numSelected > 0 ? (
                            <Fragment>
                                <Tooltip title="Report">
                                    <IconButton aria-label="Report" onClick={handlerCreateReport}>
                                        <CloudDownload />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton aria-label="Delete" onClick={this.handlerDeleteItems}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Fragment>
                        ) : (
                                <Fragment>
                                    <Tooltip title="Filter list">
                                        <IconButton aria-label="Filter list" onClick={this.toggleFilter}>
                                            <FilterListIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Add">
                                        <IconButton aria-label="Add" onClick={handleClickOpen}>
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Fragment>
                            )}
                    </div>
                </Toolbar>
                {
                    <DeleteDialog
                        open={open}
                        handleCloseDialog={this.handleClose}
                        handlerDeteleItemsAccepted={this.handlerDeteleItemsAccepted}
                    />
                }
            </Fragment>
        )
    }

}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
}

export default withStyles(toolbarStyles)(EnhancedTableToolbar)