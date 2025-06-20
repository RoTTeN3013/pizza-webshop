import React from 'react'
import { Head, Link } from '@inertiajs/react';

const Navbar = () => {
  return (
    <div className="navbar px-4 d-flex justify-content-between align-items-center  wow animate__animated animate__fadeIn">
        <div className="d-flex gap-3 justify-content-center align-items-center">
          <Link href="/" className="nav-link">Kezdőoldal</Link>
          <Link href="/pizzas" className="nav-link">Pizzák</Link>
          <Link href="/" className="nav-link">Kapcsolat</Link>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Link href="/cart" className="nav-link"><i className="fa fa-shopping-cart"></i> Kosár</Link>
        </div>
    </div>
  )
}

export default Navbar