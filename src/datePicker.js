import React from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';

/**
 * `DatePicker` can be implemented as a controlled input,
 * where `value` is handled by state in the parent component.
 */
export default class DatePicker2 extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      controlledDate: null,
    };
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
  };

  render() {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        emptyLabel={this.props.text}
        value={this.props.date}
        onChange={this.props.onDateChange}
        disablePast={true}
        minDateMessage={''}
      />
      </MuiPickersUtilsProvider>
    );
  }
}
