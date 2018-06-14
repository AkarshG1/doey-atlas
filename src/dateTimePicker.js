import React, { Fragment, PureComponent } from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { DateTimePicker } from 'material-ui-pickers';

export default function DateTimePicker2(props){
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Fragment>
          <DateTimePicker
            autoOk={true}
            animateYearScrolling={true}
            disablePast={true}
            minDateMessage={''}
            ampm={false}
            value={props.datetime}
            onChange={props.onTimeChange}
            label={props.text}
            maxDate={props.maxDate}
            minDate={props.minDate}
          />
        </Fragment>
        </MuiPickersUtilsProvider>
    );

}
