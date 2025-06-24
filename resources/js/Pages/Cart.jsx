import { Head, Link } from '@inertiajs/react';
import CartItems from '../Components/CartItems';
import Header from '../Components/Header';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import BaseLayout from '../Layouts/BaseLayout';

export default function Cart({ cartItems, total }) {

    return (
        <>
            <Head title="Kosár" />

            <BaseLayout>
                <Header title="Kosár" image="cart" />
                <CartItems cartItems={cartItems} total={total} />
            </BaseLayout>
        </>
    );
}
