import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Parallax } from 'react-parallax';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import './App.css';
import { Navigation, Form, ServiceList } from './components';
import image1 from './images/image1.png';
import image2 from './images/image2.png';
import MomentUtils from '@date-io/moment';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import withSizes from 'react-sizes';
import 'typeface-raleway';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        maxWidth: 800
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Raleway, sans-serif'
    },
    palette: {
        fontFamily: 'Raleway, sans-serif'
    }
});
function App(props) {
    const classes = useStyles();
    return (
        <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className='App'>
                    <Navigation />
                    <div>
                        <Parallax bgImage={image1} strength={200}>
                            <Grid
                                container
                                spacing={0}
                                direction='column'
                                alignItems='center'
                                justify='center'
                                style={{
                                    height: props.isMobile ? '150vh' : '70vh'
                                }}
                            >
                                <Grid
                                    item
                                    xs={props.isMobile ? 11 : 7}
                                    style={{
                                        marginTop: props.isMobile
                                            ? null
                                            : '-6em'
                                    }}
                                >
                                    <Card>
                                        <ServiceList
                                            isMobile={props.isMobile}
                                        />
                                    </Card>
                                </Grid>
                            </Grid>
                        </Parallax>
                        <h1>Enquiry Form</h1>
                        <Parallax bgImage={image2} strength={200}>
                            <Grid
                                container
                                spacing={0}
                                direction='column'
                                alignItems='center'
                                justify='center'
                                style={{
                                    height: props.isMobile ? '220vh' : '200vh'
                                }}
                            >
                                <Grid
                                    item
                                    xs={props.isMobile ? 11 : 7}
                                    style={{ marginTop: '-6em' }}
                                >
                                    <Card>
                                        <Form isMobile={props.isMobile} />
                                    </Card>
                                </Grid>
                            </Grid>
                        </Parallax>
                    </div>
                </div>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
}
const mapSizesToProps = ({ width }) => ({
    isMobile: width < 600
});
export default withSizes(mapSizesToProps)(App);
