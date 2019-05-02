import React, { Fragment, Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles, Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import AddIcon from '@material-ui/icons/Add'
import InputSearch from './InputSearch'

const toolbarStyles = theme => ({
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
});

class EnhancedTableToolbar extends Component {
    state = {
        filter: false
    };

    toggleFilter = () => {
        this.setState(({filter}) => ({
            filter: !filter
        }));
        const { handlerChangeFilter } = this.props;
        handlerChangeFilter({ target: { value: '' } })
    };

    render(){
        const { numSelected, classes, title, handlerChangeFilter, handleClickOpen } = this.props,
              { filter } = this.state;
    
        return (
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
                { filter && <InputSearch handlerChangeFilter={handlerChangeFilter}/>}
                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
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
        )
    }

}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(EnhancedTableToolbar)