import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DateTimePicker } from '@material-ui/pickers';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';

const quantities = [
    {
        value: 0,
        label: '0'
    },
    {
        value: 1,
        label: '1'
    },
    {
        value: 2,
        label: '2'
    },
    {
        value: 3,
        label: '3'
    },
    {
        value: 4,
        label: '4'
    }
];

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: 15
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    textFieldStatic: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        fontWeight: 700
    },
    menu: {
        width: 200
    },
    submit: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4)
    }
}));

export default function OutlinedTextFields(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: '',
        phone: '',
        email: '',
        availability: '',
        quantity1: 0,
        quantity2: 0,
        quantity3: 0,
        quantity4: 0,
        quantity5: 0,
        costs: [50, 100, 100, 150, 250],
        arrival: new Date()
    });
    const [totalTime, setTotalTime] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false
    });

    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const handleChange = name => event => {
        setValues({
            ...values,
            [name]: event.target.value
        });
    };

    useEffect(() => {
        let totalTNeeded =
            Number(values.quantity1) +
            Number(values.quantity2) +
            Number(values.quantity3) +
            Number(values.quantity4) +
            Number(values.quantity5);
        setTotalTime(totalTNeeded);

        let totalCost =
            values.costs[0] * values.quantity1 +
            values.costs[1] * values.quantity2 +
            values.costs[2] * values.quantity3 +
            values.costs[3] * values.quantity4 +
            values.costs[4] * values.quantity5;
        setTotalCost(totalCost);
    }, [values]);

    const handleChangeCheckbox = name => event => {
        if (name === 'checkedA') {
            setState({
                ...state,
                checkedA: event.target.checked,
                checkedB: false
            });
        } else {
            setState({
                ...state,
                checkedB: event.target.checked,
                checkedA: false
            });
        }
    };
    const [open, setOpen] = useState(false);
    const [openThanks, setOpenThanks] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        var m = moment(selectedDate);
        var t = moment.duration(`${totalTime}:00:00`);
        m.subtract(t);
        setValues({ ...values, totalCost: totalCost, arrival: m });
    };

    const handleClose = () => {
        setOpen(false);
        setOpenThanks(true);
    };
    const handleClickOpenThanks = () => {
        setOpenThanks(true);
    };

    const handleCloseThanks = () => {
        setOpenThanks(false);
    };

    var m = moment(selectedDate);
    var t = moment.duration(`${totalTime}:00:00`);
    m.subtract(t);

    return (
        <div>
            <form className={classes.container} noValidate autoComplete='off'>
                <Grid container spacing={1}>
                    <Grid item xs={props.isMobile ? 7 : 9}>
                        <TextField
                            id='outlined-bare'
                            fullWidth
                            InputProps={{
                                readOnly: true
                            }}
                            className={classes.textFieldStatic}
                            defaultValue='Hair Downstyling'
                            margin='normal'
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={props.isMobile ? 5 : 3}>
                        <TextField
                            id='outlined-select-quantity'
                            select
                            label='Quantity'
                            className={classes.textField}
                            value={values.quantity1}
                            onChange={handleChange('quantity1')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu
                                }
                            }}
                            margin='normal'
                            variant='outlined'
                            helperText='No. of people'
                        >
                            {quantities.map(option => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={props.isMobile ? 7 : 9}>
                        <TextField
                            id='outlined-bare'
                            fullWidth
                            InputProps={{
                                readOnly: true
                            }}
                            className={classes.textFieldStatic}
                            defaultValue='Hair Upstyling'
                            margin='normal'
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={props.isMobile ? 5 : 3}>
                        <TextField
                            id='outlined-select-quantity'
                            select
                            label='Quantity'
                            className={classes.textField}
                            value={values.quantity2}
                            onChange={handleChange('quantity2')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu
                                }
                            }}
                            margin='normal'
                            variant='outlined'
                            helperText='No. of people'
                        >
                            {quantities.map(option => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={props.isMobile ? 7 : 9}>
                        <TextField
                            id='outlined-bare'
                            fullWidth
                            InputProps={{
                                readOnly: true
                            }}
                            className={classes.textFieldStatic}
                            defaultValue='Light Makeup'
                            margin='normal'
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={props.isMobile ? 5 : 3}>
                        <TextField
                            id='outlined-select-quantity'
                            select
                            label='Quantity'
                            className={classes.textField}
                            value={values.quantity3}
                            onChange={handleChange('quantity3')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu
                                }
                            }}
                            margin='normal'
                            variant='outlined'
                            helperText='No. of people'
                        >
                            {quantities.map(option => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={props.isMobile ? 7 : 9}>
                        <TextField
                            id='outlined-bare'
                            fullWidth
                            InputProps={{
                                readOnly: true
                            }}
                            className={classes.textFieldStatic}
                            defaultValue='Full Glam Makeup'
                            margin='normal'
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={props.isMobile ? 5 : 3}>
                        <TextField
                            id='outlined-select-quantity'
                            select
                            label='Quantity'
                            className={classes.textField}
                            value={values.quantity4}
                            onChange={handleChange('quantity4')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu
                                }
                            }}
                            margin='normal'
                            variant='outlined'
                            helperText='No. of people'
                        >
                            {quantities.map(option => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={props.isMobile ? 7 : 9}>
                        <TextField
                            id='outlined-bare'
                            fullWidth
                            InputProps={{
                                readOnly: true
                            }}
                            className={classes.textFieldStatic}
                            defaultValue='Bridal Package'
                            margin='normal'
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={props.isMobile ? 5 : 3}>
                        <TextField
                            id='outlined-select-quantity'
                            select
                            label='Quantity'
                            className={classes.textField}
                            value={values.quantity5}
                            onChange={handleChange('quantity5')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu
                                }
                            }}
                            margin='normal'
                            variant='outlined'
                            helperText='No. of people'
                        >
                            {quantities.map(option => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        Preferred Date along with time to be ready by:
                        <br />
                        <br />
                        <DateTimePicker
                            variant='inline'
                            inputVariant='outlined'
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <h3>Total time needed for the booking: {totalTime}</h3>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id='outlined-availability'
                            label='Prefered booking time'
                            className={classes.textField}
                            value={values.availability}
                            onChange={handleChange('availability')}
                            margin='normal'
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        Incall
                        <Checkbox
                            checked={state.checkedA}
                            onChange={handleChangeCheckbox('checkedA')}
                            value='checkedA'
                            inputProps={{
                                'aria-label': 'primary checkbox'
                            }}
                        />
                        Outcall
                        <Checkbox
                            checked={state.checkedB}
                            onChange={handleChangeCheckbox('checkedB')}
                            value='checkedB'
                            color='secondary'
                            inputProps={{
                                'aria-label': 'secondary checkbox'
                            }}
                        />
                    </Grid>
                    {state.checkedA || state.checkedB ? (
                        <Grid item xs={12}>
                            {state.checkedA
                                ? 'Drive to Wentworth Point'
                                : `I'll drive to you extra charges apply`}
                        </Grid>
                    ) : null}
                    <Grid item xs={12}>
                        <TextField
                            id='outlined-name'
                            label='Name'
                            required
                            className={classes.textField}
                            value={values.name}
                            onChange={handleChange('name')}
                            margin='normal'
                            variant='outlined'
                        />
                        <TextField
                            id='outlined-email-input'
                            label='Email'
                            required
                            value={values.email}
                            onChange={handleChange('email')}
                            className={classes.textField}
                            type='email'
                            name='email'
                            autoComplete='email'
                            margin='normal'
                            variant='outlined'
                        />
                        <TextField
                            id='outlined-number'
                            label='Contact No.'
                            required
                            value={values.age}
                            onChange={handleChange('phone')}
                            className={classes.textField}
                            margin='normal'
                            variant='outlined'
                        />
                    </Grid>
                </Grid>
            </form>
            <Button
                variant='outlined'
                color='secondary'
                onClick={handleClickOpen}
                className={classes.submit}
            >
                Submit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    Are you sure you want to submit the current information?
                </DialogTitle>
                <DialogContent>
                    Total Basic Cost of your booking is: ${totalCost} <br />
                    <br />
                    {/* {moment(selectedDate).format('MMM DD YYYY h:mm:ss a')} */}
                    Date : {moment(selectedDate).format('DD MMM YYYY')}
                    <br />
                    Time of Booking (subject to change) :{' '}
                    {moment(values.arrival).format('h:mm a')}
                    <br />
                    <br />
                    If an early start has been requested, cost of the same will
                    be confirmed in the confirmation email.
                    <br />
                    <br />
                    {state.checkedB
                        ? `As travel distance is calculated by km's, travel fee will be calculated and sent along with booking confirmation after the booking request is submitted.`
                        : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='secondary'>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color='primary'>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openThanks}
                onClose={handleCloseThanks}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogContent>
                    <h3>Thank you for your enquiry {values.name}! </h3>
                    <br />
                    You will receive a confirmation email as soon as possible on{' '}
                    {values.email}
                    <br />
                    <br />
                    For more questions and specific requests please email{' '}
                    <u>enquiries.makeupbyshimona@gmail.com</u> with your name in
                    the subject.
                    <br />
                    <br />
                    Hope you have a glam day gurl!
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseThanks} color='primary'>
                        Submit Another Enquiry
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
