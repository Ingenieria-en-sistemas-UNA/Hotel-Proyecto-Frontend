import React, { Component } from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { InlineDatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";

export default class extends Component {

    state = {}

    componentDidMount() {
        const { initialDate, finishDate } = this.props
        this.setState(prevState => ({ ...prevState, initialDate, finishDate }))
    }

    componentWillReceiveProps({ initialDate, finishDate }) {
        this.setState(prevState => ({ ...prevState, initialDate, finishDate }))
    }

    render() {
        const { initialDate = moment(new Date(), 'DD/MM/YYYY'), finishDate = moment(new Date(), 'DD/MM/YYYY') } = this.state
        const { handlerChangeFilter } = this.props
        return(
            <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
                <div className="picker" style={{minWidth: '140px', maxWidth: '160px'}}>
                    <InlineDatePicker
                        keyboard
                        clearable
                        label="Fecha inicial"
                        value={ moment(new Date(initialDate), 'DD/MM/YYYY')}
                        onChange={date => handlerChangeFilter('initialDate', date)}
                        format="DD/MM/YYYY"
                        adornmentPosition="end"
                    />
                </div>
                <div className="picker" style={{minWidth: '140px', maxWidth: '160px'}}>
                    <InlineDatePicker
                        keyboard
                        clearable
                        label="Fecha final"
                        value={ moment(new Date(finishDate), 'DD/MM/YYYY')}
                        onChange={date => handlerChangeFilter('finishDate', date)}
                        format="DD/MM/YYYY"
                        adornmentPosition="end"
                    />
                </div>
            </MuiPickersUtilsProvider>
        )
    }
}
