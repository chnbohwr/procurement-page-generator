import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import png_col1 from './col1.png';
import png_col2 from './col2.png';

const styleMain = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const styleCol1 = {
  backgroundImage: `url(${png_col1})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: 100,
  height: 100,
  marginRight: 30,
}

const styleCol2 = {
  ...styleCol1,
  backgroundImage: `url(${png_col2})`,
}

const Select = () => {
  return (
    <div style={{height: '100vh'}}>
      <h2 style={{textAlign: 'center'}}>Select layout</h2>
      <div style={styleMain}>
        <Link to="/col1">
          <div>
            <div style={styleCol1} />
            <h3>single column</h3>
          </div>
        </Link>

        <Link to="/col2">
          <div>
            <div style={styleCol2} />
            <h3>double column</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Select;