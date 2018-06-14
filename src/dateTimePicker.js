import React, { Fragment, PureComponent } from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { DateTimePicker } from 'material-ui-pickers';
import { IconButton, Icon, InputAdornment } from '@material-ui/core';

export default class DateTimePicker2 extends PureComponent {
    constructor(props) {
      super(props);
    }

  render() {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Fragment>
          <DateTimePicker
            autoOk={true}
            animateYearScrolling={true}
            disablePast={true}
            minDateMessage={''}
            ampm={false}
            value={this.props.datetime}
            onChange={this.props.onTimeChange}
            label={this.props.text}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
          />
        </Fragment>
        </MuiPickersUtilsProvider>
    );
  }
}
