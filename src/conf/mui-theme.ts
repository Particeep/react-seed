import {blue, red} from '@material-ui/core/colors'

const Table = {
  MuiTableCell: {
    root: {
      whiteSpace: 'nowrap',
      paddingLeft: 12,
      paddingRight: 12,

      '&:last-child': {
        paddingRight: 'invalid property to reset default padding',
      }
    },
  },
  MuiTableRow: {
    root: {
      height: 52,
    },
    head: {
      height: 42,
    }
  }
}

const List = {
  // The goal is to be able to add divider under MuiListItemText
  MuiListItem: {
    root: {
      paddingTop: 8,
      paddingBottom: 8,

      '& .material-icons': {
        paddingBottom: 16,
      }
    },
    secondaryAction: {
      paddingRight: 0,
    }
  },
  MuiListItemText: {
    root: {
      padding: 0,
      margin: '0 16px',
      paddingBottom: 16,
    }
  },
}

export const muiTheme = (isDark?: boolean): any => ({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: isDark ? 'dark' : 'light',
    primary: blue,
    secondary: blue,
    error: red,
  },
  overrides: {
    ...Table,
    ...List,
  },
  props: {
    MuiGrid: {
      spacing: 16,
    },
  }
})
