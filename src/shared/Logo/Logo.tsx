import * as React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import classNames from 'classnames'
import {config} from 'src/conf/config'

const styles = (t: Theme) => createStyles({
  root: {}
});

interface IProps extends WithStyles<typeof styles> {
  size?: number;
  className?: any;
}

class Logo extends React.Component<IProps, {}> {

  render() {
    const {classes, size, className} = this.props;
    return (
      <img src={config.baseUrl + '/assets/images/Particeep-Plug.png'}
           className={classNames(classes.root, className)}
           style={{height: size || 60}}/>
    );
  }
}

export default withStyles(styles)(Logo);
