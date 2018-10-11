import * as React from 'react'
import {
  CircularProgress,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
  Theme,
  WithStyles,
  withStyles
} from '@material-ui/core'
import {WithI18n, withI18n} from '../../core/i18n/withI18n'
import autobind from 'autobind-decorator'
import {Btn} from 'react-components'

const styles = (t: Theme) => createStyles({});

interface IProps extends WithStyles<typeof styles>, WithI18n {
  loading?: boolean;
  title: string;
  open: boolean;
  value?: string;
  onClose: () => void;
  selected?: string;
  children?: any;
  emptyContent: any;
  onChange: (value: string) => void;
}

class DialogSelect extends React.Component<IProps, any> {

  render() {
    const {classes, title, loading, onClose, value, open, emptyContent, children, t} = this.props;
    return (
      <Dialog maxWidth="xs" open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent style={{minWidth: 300}}>
          {loading
            ? (
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <CircularProgress/>
              </div>
            ) : (
              <>
                {React.Children.count(children) > 0 ? (
                  <RadioGroup value={value} onChange={this.onChange}>
                    {children}
                  </RadioGroup>
                ) : (
                  <>
                    {emptyContent}
                  </>
                )}
              </>
            )
          }
        </DialogContent>
        <DialogActions>
          <Btn onClick={onClose} color='primary'>{t.close}</Btn>
        </DialogActions>
      </Dialog>
    );
  }

  @autobind
  private onChange(event: React.ChangeEvent<{}>, value: string) {
    this.props.onChange(value);
  }
}

export default withStyles(styles)(withI18n(DialogSelect));
