import { Head, Link } from '@inertiajs/react';
import CartItems from '../Components/CartItems';
import PageTitle from '../Components/PageTitle';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import BaseLayout from '../Layouts/BaseLayout';

export default function Cart({ cartItems, total }) {

    return (
        <>
            <Head title="Kosár" />

            <BaseLayout>
                <PageTitle title="Kosár" image="cart" />
                <CartItems cartItems={cartItems} total={total} />
            </BaseLayout>
        </>
    );
}
