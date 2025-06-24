import { Head, Link } from '@inertiajs/react';
import BaseLayout from '../Layouts/BaseLayout';
import Header from '../Components/Header';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import Cart from './Cart';

export default function OrderConfirm({cartItems, total}) {

    //State változók
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [confirm, setConfirm] = useState(false);

    const [address, setAddress] = useState({
        'city' : '',
        'street' : '',
        'number' : '',
        'zipcode' : ''
    });

    const handleOrderConfirm = async () => {
        try {
            const response = await axios.post('/confirm-order', {
                name, 
                email, 
                phone,
                confirm,
                address,
                total,
                cartItems
            });

            //Felhasználó átirányítása a megerősítést megjelenítő oldalra, state változók nullázása
            clearState();
            router.get('/confirm-page');

        } catch (error) {
            if( error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    //State változók nullázása
    const clearState = () => {
        setName('');
        setEmail('');
        setPhone('');
        setConfirm(false);
        setErrors({});
        setAddress({
            'city' : '',
            'street' : '',
            'number' : '',
            'zipcode' : ''
        });
    };

    return (
        <>
            <Head title="Rendelés megerősítése" />

            <BaseLayout>
                <Header title="Rendelés megerősítése" image="order_confirm"/>

                <div className="d-flex flex-column align-items-center content mt-5 wow animate__animated animate__fadeInUp">
                    <h3>Rendelés összesítő:</h3>
                    <table className="table text-center">
                        <thead className="table-dark">
                            <tr>
                                <td>Termék neve</td>
                                <td>Méret</td>
                                <td>mennyiség</td>
                                <td>Összesen</td>
                            </tr>
                        </thead>
                        <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.size}"</td>
                                <td>{item.quantity}db</td>
                                <td>{item.price}Ft</td>
                            </tr>
                        ))}
                        </tbody>
                    </table> 
                    <h3>Végösszeg:</h3>
                    <p className="fs-5 p-0 m-0">{total}Ft</p>
                    <hr className="my-2 w-50 border border-dark" />
                    <div className="d-flex gap-2">
                        <Link className="btn btn-dark mt-3" href="/pizzas"><i className="fa fa-shopping-cart"></i> Vásárlás folytatása</Link>
                        <Link className="btn btn-dark mt-3" href="/cart"><i className="fa fa-shopping-cart"></i> Vásárlás módosítása (kosár)</Link>
                    </div>
                    <h5 className="mt-5 mb-4">Személyes adatok</h5>
                    <div className="row gap-4 contact-form justify-content-center align-items-center">
                        <div className="col-lg-6 col-12">
                            <input type="text" className="form-control text-center" placeholder="Név" value={name}
                            onChange={(e) => {setName(e.target.value)}}
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <input type="text" className="form-control col-6 text-center" placeholder="Email cím" value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <input type="text" className="form-control col-6 text-center" placeholder="Telefonszám (opcionális)" value={phone}
                            onChange={(e) => {setPhone(e.target.value)}}
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <input type="text" className="form-control col-6 text-center" placeholder="Város" value={address.city}
                            onChange={(e) => {
                                setAddress(() => ({...address, ['city'] : e.target.value})
                            )}}
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <input type="text" className="form-control col-6 text-center" placeholder="Utca" value={address.street}
                            onChange={(e) => {
                                setAddress(() => ({...address, ['street'] : e.target.value})
                            )}}
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <input type="text" className="form-control col-6 text-center" placeholder="Házszám" value={address.number}
                            onChange={(e) => {
                                setAddress(() => ({...address, ['number'] : e.target.value})
                            )}}
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <input type="text" className="form-control col-6 text-center" placeholder="Irányítószám" value={address.zipcode}
                            onChange={(e) => {
                                setAddress(() => ({...address, ['zipcode'] : e.target.value})
                            )}}
                            />
                        </div>
                        <div className="d-flex justify-content-center align-items-center flex-column gap-2 col-lg-6 col-12">
                        {Object.values(errors).flat().map((error, index) => (
                            <div key={index} className="w-100 error-box d-flex justify-content-center align-items-center">
                                <p className="p-0 m-0 d-flex flex-column flex-lg-row justify-content-lg-between align-items-center">
                                    {error}
                                </p>
                            </div>
                        ))}
                        </div>
                        <div className="d-flex gap-4 col-lg-6 col-12">
                            <input type="checkbox" id="aszf" required checked={confirm || false}
                            onChange={(e) => {setConfirm(e.target.checked)}}
                            />
                            <label htmlFor="aszf" className="form-check-label">Általános Szerződési Feltételek
                            A weboldal használatával és a megrendelés elküldésével Ön elfogadja az Általános Szerződési Feltételeket. Az ÁSZF tartalmazza a rendelés menetét, fizetési és szállítási feltételeket, valamint a vásárlói jogokat és kötelezettségeket.
                            Kérjük, olvassa el figyelmesen az ÁSZF-et a megrendelés véglegesítése előtt.</label>
                        </div>
                        <div className="col-lg-6 col-12 mx-auto d-flex justify-content-center mb-5">
                            <button className="btn btn-dark" onClick={() => {handleOrderConfirm()}}>Megerősítés</button>
                        </div>
                    </div>
                </div>
            </BaseLayout>
        </>
    );
}
