import * as React from 'react'
import {createStyles, FormControlLabel, Radio, Theme, WithStyles, withStyles} from '@material-ui/core'
import {Btn} from 'react-components'

const styles = (t: Theme) => createStyles({});

interface IProps extends WithStyles<typeof styles> {
  value: string;
  label: string;
  children?: any;
}

// TODO(Alex) Seems not working because FormControlLabel must be a direct children
class DialogSelect extends React.Component<IProps, any> {

  render() {
    const {value, label} = this.props;
    return (
      <FormControlLabel value={value} control={<Radio/>} label={label}/>
    );
  }
}

export default withStyles(styles)(DialogSelect);
