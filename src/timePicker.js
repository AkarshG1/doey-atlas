import React from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import TimePicker from 'material-ui-pickers/TimePicker';

export default class TimePicker2 extends React.PureComponent {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          ampm={false}
          emptyLabel={this.props.text}
          value={this.props.datetime}
          onChange={this.props.onTimeChange}
        />
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}
