import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CartItems from '../Components/CartItems';
import PageTitle from '../Components/PageTitle';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Contact() {

    return (
        <>
            <Head title="Kapcsolat" />
            <Navbar />
            <PageTitle title="Kapcsolat" image="contact"/>
            
            <div className="d-flex flex-column justify-content-center align-items-lg-start align-items-lg-center">
                Címünk: 1213 Budapest
            </div>

            <Footer />
        </>
    );
}
