import * as React from 'react'
import {createStyles, Icon, Theme, WithStyles, withStyles} from '@material-ui/core'

const styles = (t: Theme) => createStyles({
  root: {
    // height: `calc(100% - ${marginBottom(t)}px)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${t.palette.divider}`,
    borderRadius: 3,
    color: t.palette.text.disabled,
    minHeight: 180,
    transition: t.transitions.create('all'),
    height: '100%',

    '&:hover': {
      color: t.palette.primary[300],
      borderColor: t.palette.primary[100],
    },
    '&:active': {
      color: t.palette.primary.main,
      borderColor: t.palette.primary[300],
      background: 'rgba(0, 0, 0, .05)',
    }
  },
  icon: {
    fontSize: 50,
  }
});

interface IProps extends WithStyles<typeof styles> {
}

class CardAdd extends React.Component<IProps, any> {


  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Icon className={classes.icon}>add</Icon>
      </div>
    );
  }
}

export default withStyles(styles)(CardAdd);
