import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import styles from './jss/stylesInputSearch'

const CustomizedInputBase = props => {
    const { classes, handlerChangeFilter } = props

    return (
        <Paper className={classes.root} elevation={1}>
            <InputBase name="search" className={classes.input} placeholder="Search" onChange={handlerChangeFilter}/>
            <IconButton  className={classes.iconButton} disabled>
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

CustomizedInputBase.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CustomizedInputBase)