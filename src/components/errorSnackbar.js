import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

export default function ErrorSnackbar(props) {
    const [state, setState] = useState({
        vertical: 'top',
        horizontal: 'center',
        Transition: Slide
    });

    const { vertical, horizontal } = state;

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={props.open}
                autoHideDuration={5000}
                TransitionComponent={state.Transition}
                onClose={() => props.parentCallbackCloseError(false)}
                ContentProps={{
                    'aria-describedby': 'message-id'
                }}
                message={props.message}
            />
        </div>
    );
}
