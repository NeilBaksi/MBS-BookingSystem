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
import Autocomplete from 'react-google-autocomplete';
import Fade from 'react-reveal/Fade';

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
    },
    autocompleteTextfield: {
        width: '70%',
        border: '1px solid #92929280',
        borderRadius: '4px',
        padding: '15px',
        fontSize: '1em',
        lineHeight: '1.1875em',
        '&:hover': {
            border: '1px solid #000 !important'
        },
        '&:active': {
            border: '0 !important'
        },
        '&:focus': {
            border: '2px solid #3F51B5 !important',
            outline: '0 !important'
        }
    },
    font: {
        fontFamily: 'Raleway, sans-serif'
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
        arrival: new Date(),
        address: '',
        distance: 0,
        distanceCost: 35
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
        setValues({ ...values, arrival: m });
    };

    const handleCloseAgree = () => {
        setOpen(false);
        setOpenThanks(true);
    };
    const handleCloseCancel = () => {
        setOpen(false);
    };

    const handleCloseThanks = () => {
        setOpenThanks(false);
    };

    var m = moment(selectedDate);
    var t = moment.duration(`${totalTime}:00:00`);
    m.subtract(t);

    const handleSelectedAddress = address => {
        console.log(address);
        fetch(
            'https://maps.googleapis.com/maps/api/distancematrix/json?origins=%225%20Baywater%20Dr,%20Wentworth%20Point%20NSW%202127,%20Australia%22&destinations="' +
                address.formatted_address +
                '"&key=AIzaSyB5rSaDR8wATQh7XcppVYpv5A3cILnwjNo'
        )
            .then(res => res.json())
            .then(result => {
                console.log(result.rows[0].elements[0].distance);
                let distance = Math.round(
                    Number(result.rows[0].elements[0].distance.value) / 1000
                );
                let distanceCost = 35;
                if (distance > 20) {
                    distanceCost += distance - 20;
                }
                setValues({
                    ...values,
                    distance: distance,
                    distanceCost: distanceCost
                });
            });
    };

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
                        <Fade>
                            <Grid item xs={12} className={classes.font}>
                                {state.checkedA
                                    ? 'Bookings conducted at my studio set up in Wentworth Point (WP) 2127'
                                    : `Travel fee: Outcalls for services at your location $35 (over 20km away from WP additional $1/km applies)`}
                                <br />
                                <br />
                            </Grid>
                        </Fade>
                    ) : null}
                    {state.checkedB ? (
                        <Fade>
                            <Grid item xs={12} className={classes.font}>
                                <Autocomplete
                                    className={classes.autocompleteTextfield}
                                    onPlaceSelected={address => {
                                        handleSelectedAddress(address);
                                    }}
                                    onChange={handleChange('address')}
                                    types={['address']}
                                    componentRestrictions={{
                                        country: 'au'
                                    }}
                                    placeholder='Enter Address'
                                />
                                <br />
                                <p
                                    style={{
                                        color: ' #E91E63',
                                        fontSize: '0.8em',
                                        cursor: 'pointer',
                                        margin: '0.5em 3em'
                                    }}
                                >
                                    If your address is not listed, kindly put
                                    the closest landmark. I will get back to
                                    your personally to finalise the address!
                                </p>
                                <h3>Outcall Costs: ${values.distanceCost}</h3>
                            </Grid>
                        </Fade>
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
                onClose={handleCloseCancel}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    Are you sure you want to submit the current information?
                </DialogTitle>
                <DialogContent className={classes.font}>
                    Total Basic Cost of your booking is: ${totalCost} + $
                    {values.distanceCost} =
                    <b>${totalCost + values.distanceCost}</b> <br />
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
                    <Button onClick={handleCloseCancel} color='secondary'>
                        Cancel
                    </Button>
                    <Button onClick={handleCloseAgree} color='primary'>
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
                <DialogContent className={classes.font}>
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
