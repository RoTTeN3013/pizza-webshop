import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function BaseLayout({ children }) {

    return (
        <>
            <Navbar />
                <main>
                    {children}
                </main>
            <Footer />
        </>
    );
}
