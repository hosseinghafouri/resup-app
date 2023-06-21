import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import {ipcRenderer} from 'electron';
window.React = React;

const {
    MAIN_PAGERS_DATA, 
    RENDER_DELETE_PAGER,
    RENDER_PAGE
} = require('../utils/constants');



ipcRenderer.on(MAIN_PAGERS_DATA, (event, arg)=>{
    console.log(arg);
    render( <App argument={arg} />, document.getElementById('root') );
})

//render( <App />, document.getElementById('root') );