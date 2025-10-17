import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4 py-2">
      <div className="d-flex align-items-center">
        <img src={logo} alt="logo" width="40" className="me-2" />
        <h5 className="mb-0 fw-bold">Travel Hub CRM</h5>
      </div>
    </nav>
  );
};

export default Header;
