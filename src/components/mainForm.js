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
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import Autocomplete from 'react-google-autocomplete';
import Fade from 'react-reveal/Fade';
import { ErrorSnackbar } from './index';
import _ from 'lodash';
import { MonthSelection } from '@material-ui/pickers/views/Month/MonthView';

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
        padding: 15,
        fontFamily: 'Raleway, sans-serif'
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
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
            border: '1px solid #E91E63 !important'
        }
    }
}));

const images = [
    {
        src: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
        name: 'Hair 1',
        price: 80
    },
    {
        src: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
        name: 'Hair 2',
        price: 90
    },
    {
        src: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
        name: 'Hair 3',
        price: 100
    }
];

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
        hairType: 0,
        costs: [65, 80, 65, 100, 250],
        earlyStartCost: 0,
        arrival: moment(),
        address: '',
        distance: 0,
        distanceCost: 0,
        errorOpen: false,
        errorMessage: ''
    });
    const [totalTime, setTotalTime] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false
    });

    const [selectedDate, setSelectedDate] = useState(moment().add(1, 'days'));
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
            images[values.hairType].price * values.quantity2 +
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
            setValues({ ...values, distanceCost: 0 });
        } else {
            setState({
                ...state,
                checkedB: event.target.checked,
                checkedA: false
            });
            setValues({ ...values, distanceCost: 35 });
        }
    };
    const [open, setOpen] = useState(false);
    const [openThanks, setOpenThanks] = useState(false);

    const handleClickOpen = () => {
        var today = moment();
        var dateCheck = moment(selectedDate).diff(today, 'hours');
        var message = '';
        if (
            values.name === '' ||
            values.name === undefined ||
            values.phone === '' ||
            values.phone === undefined ||
            values.email === '' ||
            values.email === undefined ||
            dateCheck <= 0
        ) {
            if (values.name === '' || values.name === undefined)
                message = 'Please enter your Name';
            else if (
                values.phone === '' ||
                values.phone === undefined ||
                !/^[0-9]{10}$/.test(values.phone)
            )
                message = 'Please enter a valid Phone Number';
            else if (
                values.email === '' ||
                values.email === undefined ||
                !/^.+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email)
            ) {
                message = 'Please enter a valid  Email';
            } else message = 'Please enter a valid Date (in the future)';
            setValues({ ...values, errorOpen: true, errorMessage: message });
        } else if (state.checkedA && state.checkedB) {
            message = 'Please enter whether incall or outcall';
            setValues({ ...values, errorOpen: true, errorMessage: message });
        } else {
            setOpen(true);
            var m = moment(selectedDate);
            var t = moment.duration(`${totalTime}:00:00`);
            m.subtract(t);
            let es = 0;
            if (m.isBefore(moment('7:00am', 'h:mma'))) {
                es = 50;
            }
            if (m.isBefore(moment('5:00am', 'h:mma'))) {
                es = 100;
            }
            if (m.isBefore(moment('3:00am', 'h:mma'))) {
                es = 150;
            }
            setValues({ ...values, arrival: m, earlyStartCost: es });
        }
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

    const callbackCloseError = param => {
        setValues({ ...values, errorOpen: false });
    };

    var m = moment(selectedDate);
    var t = moment.duration(`${totalTime}:00:00`);
    m.subtract(t);

    const handleSelectedAddress = address => {
        console.log(address);
        var url =
            'https://maps.googleapis.com/maps/api/directions/json?origin=%225%20Baywater%20Dr,%20Wentworth%20Point%20NSW%202127,%20Australia%22&destination="' +
            address.formatted_address +
            '"&travelmode=driving&key=AIzaSyBhVWygAuZE8hyaosyAHDXWJ-RrlfJakak';

        fetch(url, {
            crossDomain: false,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'no-cors',
            credentials: 'same-origin'
        })
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                    let distance = Math.round(
                        Number(result.routes[0].legs[0].distance.value) / 1000
                    );
                    let distanceCost = 35;
                    if (distance > 20) {
                        distanceCost += distance - 20;
                    }
                    setValues({
                        ...values,
                        distance: distance,
                        distanceCost: distanceCost,
                        address: address.formatted_address
                    });
                },
                error => {
                    console.log(error);
                    setValues({
                        ...values,
                        address: address.formatted_address
                    });
                }
            );
    };

    const chooseHairstyle = key => {
        setValues({ ...values, hairType: key });
    };

    return (
        <div className={classes.font}>
            <ErrorSnackbar
                message={values.errorMessage}
                open={values.errorOpen}
                parentCallbackCloseError={callbackCloseError}
            />
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
                    <Grid item xs={12}>
                        <Fade top collapse opposite when={values.quantity2}>
                            <Grid container spacing={1}>
                                {_.map(images, (images, key) => (
                                    <Grid
                                        item
                                        key={key}
                                        xs={props.isMobile ? 12 : 4}
                                        onClick={() => chooseHairstyle(key)}
                                    >
                                        <Paper
                                            className={classes.paper}
                                            style={{
                                                backgroundColor:
                                                    key === values.hairType
                                                        ? '#E91E6340'
                                                        : null
                                            }}
                                        >
                                            <img
                                                src={images.src}
                                                alt={images.name}
                                                height={200}
                                                width='100%'
                                            />
                                            <span>
                                                <b>${images.price}</b>
                                            </span>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Fade>
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
                            style={{ width: props.isMobile ? '90%' : '50%' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <h3>Total time needed for the booking: {totalTime}</h3>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id='outlined-availability'
                            label='Prefered booking time'
                            InputLabelProps={{
                                shrink: true
                            }}
                            className={classes.textField}
                            style={{ width: props.isMobile ? '90%' : '50%' }}
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
                        <Grid
                            item
                            xs={12}
                            className={classes.font}
                            style={{ textAlign: 'center' }}
                        >
                            <Fade>
                                <p>
                                    {state.checkedA
                                        ? `Bookings conducted at my studio set up in Wentworth Point 2127`
                                        : `Travel fee: Outcalls for services at your location $35 (over 20km away from Wentworth Point additional $1/km applies)`}
                                </p>
                                <br />
                            </Fade>
                        </Grid>
                    ) : null}
                    {state.checkedB ? (
                        <div style={{ width: '100%' }}>
                            <Fade>
                                <Grid item xs={12} className={classes.font}>
                                    <Autocomplete
                                        className={
                                            classes.autocompleteTextfield
                                        }
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
                                        If your address is not listed, kindly
                                        put the closest landmark. I will get
                                        back to you personally to finalise the
                                        address!
                                    </p>
                                    {/* <h3>
                                        Minimum Outcall Costs: ${values.distanceCost}
                                    </h3> */}
                                </Grid>
                            </Fade>
                        </div>
                    ) : null}
                    <Grid item xs={12}>
                        <TextField
                            id='outlined-name'
                            label='Name'
                            autoComplete= 'true'
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
                            autoComplete= 'true'
                            required
                            value={values.email}
                            onChange={handleChange('email')}
                            className={classes.textField}
                            type='email'
                            name='email'
                            margin='normal'
                            variant='outlined'
                        />
                        <TextField
                            id='outlined-number'
                            label='Contact No.'
                            autoComplete= 'true'
                            required
                            InputProps={{
                                type: 'number',
                                pattern: '[0-9]*',
                                inputMode: 'numeric',
                                step: '1'
                            }}
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
                    Total Basic Cost of your booking is: <b>${totalCost}</b>
                    <br />
                    <br />
                    {/* {moment(selectedDate).format('MMM DD YYYY h:mm:ss a')} */}
                    Date : <b>{moment(selectedDate).format('DD MMM YYYY')}</b>
                    <br />
                    <br />
                    Time of Booking (subject to change) :{' '}
                    <b>{moment(values.arrival).format('h:mm a')}</b>
                    <br />
                    <br />
                    Booking Location:{' '}
                    <b>
                        {state.checkedB
                            ? values.address
                            : 'Baywater Drive, Wentworth Point NSW 2127,Australia*'}
                    </b>
                    <br />
                    {state.checkedB ? null : (
                        <p style={{ fontSize: '0.75em' }}>
                            *Exact address will be sent in confirmation email
                        </p>
                    )}
                    <u>Add On Charges:</u>
                    <br />
                    <p>
                        {' '}
                        Mobile Service Fee: <b>${values.distanceCost}</b>
                    </p>
                    <p>
                        {' '}
                        Early Start Fee: <b>${values.earlyStartCost}</b>
                    </p>
                    <h3 style={{ color: '#E91E63' }}>
                        Total: $
                        {totalCost +
                            values.distanceCost +
                            values.earlyStartCost}
                    </h3>
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

