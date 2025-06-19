import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CartItems from '../Components/CartItems';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Cart({ cartItems, total }) {

    return (
        <>
            <Head title="Kosár" />
            <Navbar />
            <CartItems cartItems={cartItems} total={total} />
            <Footer />
        </>
    );
}
