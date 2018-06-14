import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Place from 'material-ui-icons/Place';

const styles = {
  chip: {
    margin: 4,
    gridRow:1,
  },


};

export default function LocationChip(props){
    return (
            <Chip
              avatar = {<Avatar color="#0ae" style={{marginLeft:0}}><Place /></Avatar>}
              onClick={props.handleClick}
              label = {props.location}
              style={styles.chip}
            />
    );
}
