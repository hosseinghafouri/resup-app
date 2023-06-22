import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import Header from "./components/Header"
import {ipcRenderer} from 'electron';
window.React = React;

const {
    MAIN_PAGERS_DATA, 
    RENDER_DELETE_PAGER,
    RENDER_PAGE
} = require('../utils/constants');


render( <Header /> , document.getElementById('header') );
ipcRenderer.on(MAIN_PAGERS_DATA, (event, arg)=>{
    console.log(arg);
    render( <div><App argument={arg} /></div> , document.getElementById('root') );
})

//render( <App />, document.getElementById('root') );