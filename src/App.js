import React from 'react';
import { Parallax } from 'react-parallax';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import './App.css';
import { Navigation, Form, ServiceList } from './components';
import DateFnsUtils from '@date-io/date-fns';

const insideStyles = {
    background: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
};
const image1 =
    'https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D';
const image2 =
    'https://img00.deviantart.net/2bd0/i/2009/276/c/9/magic_forrest_wallpaper_by_goergen.jpg';

function App() {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className='App'>
                <Navigation />
                <div>
                    <Parallax bgImage={image1} strength={700}>
                        <div style={{ height: 500 }}>
                            <div style={insideStyles}>
                                <ServiceList />
                            </div>
                        </div>
                    </Parallax>
                    <h1>| | |</h1>
                    <Parallax bgImage={image2} strength={700}>
                        <div style={{ height: 1200 }}>
                            <div style={insideStyles}>
                                <Form />
                            </div>
                        </div>
                    </Parallax>
                </div>
            </div>
        </MuiPickersUtilsProvider>
    );
}

export default App;
