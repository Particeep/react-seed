import * as React from 'react'
import {Avatar as MuiAvatar, createStyles, Icon, Theme, withStyles, WithStyles} from '@material-ui/core'

const styles = (t: Theme) => createStyles({})

interface IProps extends WithStyles<typeof styles> {
  size?: number;
  src?: string;
  icon?: string;
  style?: object;
  className?: string;
}

class Avatar extends React.Component<IProps, {}> {
  render() {
    const {size, icon, style, ...other} = this.props
    const avatarStyle = {...style, ...(size && {height: size, width: size})}
    return (
      <MuiAvatar {...other} style={avatarStyle}>
        {!this.props.src && <Icon style={size ? {fontSize: size * .72} : {}}>{icon || 'person'}</Icon>}
      </MuiAvatar>
    )
  }
}

export default withStyles(styles)(Avatar)
