import { Head, Link } from '@inertiajs/react';
import BaseLayout from '../Layouts/BaseLayout';
import CartItems from '../Components/CartItems';
import Header from '../Components/Header';
import Notification from '../Components/Notification';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Contact() {

    //State változók
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [confirm, setConfirm] = useState(false);

    const [notifStatus, setNotifStatus] = useState('');
    const [notifMessage, setNotifMessage] = useState('');

    const handleSendEmail = async () => {
        try {
            const response = await axios.post('/send-contact-email', {
                name, 
                email, 
                phone,
                message,
                confirm
            });

             clearState();

             //Üzenet megjelenítése
             setNotifStatus('show');
             setNotifMessage('Az üzeneted sikeres elküldve! Hamarosan válaszolunk!');

             setTimeout(() => {
                setNotifStatus('');
                setNotifMessage('');
             }, 3000);

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
        setMessage('');
        setConfirm(false);
        setErrors({});
    };

    return (
        <>
            <Head title="Kapcsolat" />

            <BaseLayout>
                <Header title="Kapcsolat" image="contact"/>

                <Notification status={notifStatus} message={notifMessage} />
                
                <div className="d-flex flex-column align-items-center content mt-5 wow animate__animated animate__fadeInUp">
                    <div className="d-flex flex-column justify-content-center  flex-column align-items-center">
                        <p>Címünk: Bartók Béla út 35. 1114 Budapest, Magyarország</p>
                        <p>Telefonszám: +36 1 234 5678</p>
                        <p>E-mail: rendeles@mammamiapizza.hu</p>
                        <p>Nyitvatartás: Hétfő – Vasárnap: 11:00 – 23:00</p>
                    </div>
                    <div className="row gap-4 contact-form mt-5 justify-content-center">
                        <div className="col-lg-6 col-12">
                            <input type="text" className="form-control text-center" placeholder="Név" value={name || ''}
                            onChange={(e) => {setName(e.target.value)}}
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <input type="text" className="form-control col-6 text-center" placeholder="Email cím" value={email || ''}
                            onChange={(e) => {setEmail(e.target.value)}}
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <input type="text" className="form-control col-6 text-center" placeholder="Telefonszám (opcionális)" value={phone || ''}
                            onChange={(e) => {setPhone(e.target.value)}}
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <textarea className="form-control text-center col-6" rows="8" placeholder="Üzenet" value={message || ''}
                            onChange={(e) => {setMessage(e.target.value)}}></textarea>
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
                            <button className="btn btn-dark " onClick={handleSendEmail}>Küldés</button>
                        </div>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.542653693203!2d19.0472727767277!3d47.47934109675618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc4d324f86c1%3A0x29010ac8f1dc5050!2zQnVkYXBlc3QsIEJhcnTDs2sgQsOpbGEgw7p0IDM1LCAxMTE0!5e0!3m2!1sen!2shu!4v1750660712044!5m2!1sen!2shu" width="100%" height="450" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </BaseLayout>
        </>
    );
}
