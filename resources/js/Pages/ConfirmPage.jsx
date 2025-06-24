import { Head, Link } from '@inertiajs/react';
import BaseLayout from '../Layouts/BaseLayout';
import Header from '../Components/Header';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function ConfirmPage() {

    return (
        <>
            <Head title="Rendelés megerősítve" />

            <BaseLayout>
                <Header title="Rendelésed rögzítve" image="confirm"/>

                <div className="d-flex flex-column align-items-center content mt-5 wow animate__animated animate__fadeInUp">
                    <div className="d-flex flex-column justify-content-center  flex-column align-items-center">
                        <h1>Köszönjük a rendelésed!</h1>
                        <p>A rendelésed megerősítve! A megadott email címre kiküldtük a megerősítő email-t a rendelésed részleteivel.</p>
                        <Link className="btn btn-dark" href="/pizzas"><i className="fa fa-shopping-cart"></i> Vissza a pizzákhoz</Link>
                    </div>
                </div>
            </BaseLayout>
        </>
    );
}
