import {blue, red} from '@material-ui/core/colors'

const Table = {
  MuiTableCell: {
    root: {
      whiteSpace: 'nowrap',
      paddingLeft: 12,
      paddingRight: 12,
    },
  },
  MuiTableRow: {
    head: {
      height: 42,
    }
  }
};

export const muiTheme: any = {
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
    primary: blue,
    secondary: blue,
    error: red,
  },
  overrides: {
    ...Table,
  },
  props: {
    MuiGrid: {
      spacing: 16,
    },
  }
};
