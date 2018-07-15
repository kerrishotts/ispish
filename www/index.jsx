/* globals document, localStorage */
import React from 'react';
import { render } from 'react-dom';

import App from './App.jsx';

const root = document.createElement('div');
document.body.appendChild(root);

render(<App />, root);
