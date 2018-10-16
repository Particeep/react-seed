import * as React from 'react'
import {AnimateList, IconBtn, withGlobalProgress, withToast} from 'react-components'
import {TextField} from '@material-ui/core'
import {BaseTextFieldProps} from '@material-ui/core/TextField'
import {OutlinedInputProps} from '@material-ui/core/OutlinedInput'

export interface IProps extends BaseTextFieldProps {
  InputProps?: Partial<OutlinedInputProps>;
  inputProps?: OutlinedInputProps['inputProps'];
}

class Select extends React.Component<IProps, {}> {

  render() {
    const {children, ...other} = this.props
    return (
      <TextField
        {...other}
        id="outlined-select-currency"
        select
        label="Select"
        variant="outlined"
      >
        {children}
      </TextField>
    )
  }
}

export default Select
