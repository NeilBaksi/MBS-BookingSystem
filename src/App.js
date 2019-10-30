import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Parallax } from 'react-parallax';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import './App.css';
import { Navigation, Form, ServiceList } from './components';
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

const image1 =
    'https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D';
const image2 =
    'https://img00.deviantart.net/2bd0/i/2009/276/c/9/magic_forrest_wallpaper_by_goergen.jpg';

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
                        <Parallax bgImage={image1} strength={700}>
                            <Grid
                                container
                                spacing={0}
                                direction='column'
                                alignItems='center'
                                justify='center'
                                style={{ height: 500 }}
                            >
                                <Grid item xs={props.isMobile ? 11 : 6}>
                                    <Card>
                                        <ServiceList
                                            isMobile={props.isMobile}
                                        />
                                    </Card>
                                </Grid>
                            </Grid>
                        </Parallax>
                        <h1>Enquiry Form</h1>
                        <Parallax bgImage={image2} strength={1300}>
                            <Grid
                                container
                                spacing={0}
                                direction='column'
                                alignItems='center'
                                justify='center'
                                style={{ height: 1450 }}
                            >
                                <Grid item xs={props.isMobile ? 11 : 6}>
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
