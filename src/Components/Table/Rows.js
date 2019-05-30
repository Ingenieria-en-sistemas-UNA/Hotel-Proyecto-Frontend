import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { IconButton, Tooltip } from '@material-ui/core'
import { Edit } from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox'
import keyGenerator from '../../utils/KeysGenerator'

const getColumnText = (item, key, columsConfig) => {
    if (!columsConfig[key]) return item[key]
    if (!columsConfig[key].isBoolean) return columsConfig[key].customText
    if (item[key]) {
        return columsConfig[key].ifTrue
    }
    return columsConfig[key].ifFalse
}

export default ({ item, isSelected, columsConfig, handlerUpdateItem, handleClick, update = false }) => {
    const orderKey = columsConfig ? Object.keys(columsConfig) : []
    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={-1}
            selected={isSelected}
        >
            <TableCell padding="checkbox">
                <Checkbox checked={isSelected}
                    onClick={event => handleClick(event, item.id)} />
            </TableCell>
            {
                orderKey.map((key, i) => {
                    return (
                        <TableCell key={keyGenerator('Table', i)} align={'center'}>
                            {getColumnText(item, key, columsConfig)}
                        </TableCell>
                    )
                })
            }
            {
                update && (
                    <TableCell align={'center'}>
                        <Tooltip title="Edit">
                            <IconButton aria-haspopup="true"
                                onClick={handlerUpdateItem(item)}
                                color="inherit">
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                )
            }
        </TableRow>
    )
}