import React from 'react';
import ReactDOM from 'react-dom';

import 'styles/theme.css';
import 'styles/global';

const MOUNT_NODE = document.getElementById('app');
const App = () => (
  <div>
    <h1>App</h1>
  </div>
);

ReactDOM.render(<App />, MOUNT_NODE);