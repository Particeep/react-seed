import * as React from 'react'
import {Typography} from '@material-ui/core'

export const Em = ({children, ...other}) => <Typography color="textSecondary" {...other}>{children}</Typography>

export const Strong = ({children, bold, ...other}) => <Typography variant="subtitle1" {...other}>{children}</Typography>

export const H1 = ({children, bold = false, ...other}) => <Typography variant="h6" {...other}>{children}</Typography>

export const Div = ({children, bold = false, ...other}) => <Typography {...other}>{children}</Typography>
