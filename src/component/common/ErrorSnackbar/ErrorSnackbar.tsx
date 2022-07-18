import React from 'react'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks'
import Snackbar from '@mui/material/Snackbar'
import {setAppErrorAC} from '../../App/appReducer'


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC({error: null}))
    }
    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}