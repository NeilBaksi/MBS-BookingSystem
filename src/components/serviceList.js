import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'left',
        padding: 15,
        wordWrap: 'break-word',
        fontFamily: 'Raleway, sans-serif'
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

export default function OutlinedTextFields(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Grid container spacing={1}>
                <Grid item xs={props.isMobile ? 4 : 3} className={classes.head}>
                    <u>Service Type</u>
                </Grid>
                <Grid item xs={props.isMobile ? 4 : 7} className={classes.head}>
                    <u>Description</u>
                </Grid>
                <Grid item xs={props.isMobile ? 2 : 1} className={classes.head}>
                    <u>Price</u>
                </Grid>
                <Grid item xs={props.isMobile ? 2 : 1} className={classes.head}>
                    <u>Time</u>
                </Grid>
                <Grid item xs={props.isMobile ? 4 : 3}>
                    <span className={classes.serviceName}>
                        Hair Downstyling
                    </span>
                </Grid>
                <Grid item xs={props.isMobile ? 4 : 7}>
                    Simple hair styling which is strictly for hair that is let
                    down - GHD curls, beachy waves, glamour waves & straightened
                    hair
                </Grid>
                <Grid item xs={props.isMobile ? 2 : 1} className={classes.head}>
                    <span className={classes.serviceName}>$65</span>
                </Grid>
                <Grid item xs={props.isMobile ? 2 : 1} className={classes.head}>
                    <span className={classes.serviceName}>1 hr</span>
                </Grid>

                <Grid item xs={props.isMobile ? 4 : 3}>
                    <span className={classes.serviceName}>Hair Upstyling</span>
                </Grid>
                <Grid item xs={props.isMobile ? 4 : 7}>
                    All Upstyling
                    <br />
                    <span style={{ fontSize: '0.8em' }}>
                        Price may range between $80 - $100 based on special
                        requests
                    </span>
                </Grid>
                <Grid item xs={props.isMobile ? 2 : 1} className={classes.head}>
                    <span className={classes.serviceName}>$80</span>
                </Grid>
                <Grid item xs={props.isMobile ? 2 : 1} className={classes.head}>
                    <span className={classes.serviceName}>1 hr</span>
                </Grid>

                <Grid item xs={props.isMobile ? 4 : 3}>
                    <span className={classes.serviceName}>Light Makeup</span>
                </Grid>
                <Grid item xs={props.isMobile ? 4 : 7}>
                    Light makeup (foundation, eyeliner, mascara, lipgloss,
                    blush) - Best for mature skin
                </Grid>
                <Grid item xs={props.isMobile ? 2 : 1} className={classes.head}>
                    <span className={classes.serviceName}>$65</span>
                </Grid>
                <Grid item xs={props.isMobile ? 2 : 1} className={classes.head}>
                    <span className={classes.serviceName}>1 hr</span>
                </Grid>

                <Grid item xs={props.isMobile ? 4 : 3}>
                    <span className={classes.serviceName}>
                        Full Glam Makeup
                    </span>
                </Grid>
                <Grid item xs={props.isMobile ? 4 : 7}>
                    Full glam makeup (with complimentary lashes)​ - Best for
                    photography​ & big events
                </Grid>
                <Grid item xs={props.isMobile ? 2 : 1} className={classes.head}>
                    <span className={classes.serviceName}>$100</span>
                </Grid>
                <Grid item xs={props.isMobile ? 2 : 1} className={classes.head}>
                    <span className={classes.serviceName}>1 hr</span>
                </Grid>
                <Grid item xs={props.isMobile ? 4 : 3}>
                    <span className={classes.serviceName}>Bridal Package</span>
                </Grid>
                <Grid item xs={props.isMobile ? 4 : 7}>
                    Full glam makeup and hair package (with complimentary
                    lashes) <br />
                    <br />
                    Standard makeup and hair rates apply to bridesmaids,
                    mother/sister of the bride, relatives etc.
                </Grid>
                <Grid item xs={props.isMobile ? 2 : 1} className={classes.head}>
                    <span className={classes.serviceName}>$250</span>
                </Grid>
                <Grid item xs={props.isMobile ? 2 : 1} className={classes.head}>
                    <span className={classes.serviceName}>1 hr</span>
                </Grid>
            </Grid>
            <p style={{ fontSize: '0.8em' }}>
                All prices and times are per person
            </p>
        </div>
    );
}
