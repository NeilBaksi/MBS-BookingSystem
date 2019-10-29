import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'left',
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
    serviceName: {
        fontWeight: 700
    },
    head: {
        textAlign: 'center',
        marginBottom: '2em'
    }
}));

export default function OutlinedTextFields() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Grid container spacing={1}>
                <Grid item xs={3} className={classes.head}>
                    Service Type
                </Grid>
                <Grid item xs={8} className={classes.head}>
                    Description
                </Grid>
                <Grid item xs={1} className={classes.head}>
                    Time
                </Grid>
                <Grid item xs={3}>
                    <span className={classes.serviceName}>
                        Hair Downstyling
                    </span>
                </Grid>
                <Grid item xs={8}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Grid>
                <Grid item xs={1} className={classes.head}>
                    <span className={classes.serviceName}>1 hr</span>
                </Grid>

                <Grid item xs={3}>
                    <span className={classes.serviceName}>Hair Upstyling</span>
                </Grid>
                <Grid item xs={8}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Grid>
                <Grid item xs={1} className={classes.head}>
                    <span className={classes.serviceName}>1 hr</span>
                </Grid>

                <Grid item xs={3}>
                    <span className={classes.serviceName}>Light Makeup</span>
                </Grid>
                <Grid item xs={8}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Grid>
                <Grid item xs={1} className={classes.head}>
                    <span className={classes.serviceName}>1 hr</span>
                </Grid>

                <Grid item xs={3}>
                    <span className={classes.serviceName}>
                        Full Glam Makeup
                    </span>
                </Grid>
                <Grid item xs={8}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Grid>
                <Grid item xs={1} className={classes.head}>
                    <span className={classes.serviceName}>1 hr</span>
                </Grid>

                <Grid item xs={3}>
                    <span className={classes.serviceName}>Bridal Package</span>
                </Grid>
                <Grid item xs={8}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Grid>
                <Grid item xs={1} className={classes.head}>
                    <span className={classes.serviceName}>1 hr</span>
                </Grid>
            </Grid>
        </div>
    );
}
