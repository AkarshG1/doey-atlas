import React, { Fragment, PureComponent } from 'react';

import TextField from '@material-ui/core/TextField';

export default function DateTimePicker2(props){
    return (
        <form>
          <TextField
            id="datetime-local"
            label={props.text}
            type="datetime-local"
            defaultValue="YYYY-MM-24THH:MM"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
    );

}
