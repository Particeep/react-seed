import * as React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import {Page as RcPage} from 'react-components'
import {css} from '../../conf/style'

const styles = (t: Theme) => createStyles({
  root: {
    paddingTop: t.spacing.unit * 3,
    paddingBottom: t.spacing.unit * 2,
  },
});

interface IProps extends WithStyles<typeof styles> {
  animated?: boolean
  width?: number
}

class Page extends React.Component<IProps, any> {

  static defaultProps = {
    animated: true
  };

  render() {
    const {classes, width, children, animated} = this.props;
    return (
      <RcPage animated={animated} className={classes.root} width={width || css.pageWidth}>
        {children}
      </RcPage>
    );
  }
}

export default withStyles(styles)(Page);
