import React from "react";
import ReactDOM from 'react-dom';

import App from './App';

//import 'dotenv/config';
import dotenv from 'dotenv'
dotenv.config();

ReactDOM.render(<App/>, document.getElementById('root'));