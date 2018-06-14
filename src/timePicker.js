import React from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';

export default function TimePicker2(props){
    return (
      <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          ampm={false}
          emptyLabel={props.text}
          value={props.datetime}
          onChange={props.onTimeChange}
        />
        </MuiPickersUtilsProvider>
      </div>
    );
}
