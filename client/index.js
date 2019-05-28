import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
require('./index.scss');
import toastr from 'toastr';
import Root from './components/Root.js';

if (document.getElementById('root')) {
  ReactDOM.render(<Root />, document.getElementById('root'));
}
