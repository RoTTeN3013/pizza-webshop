import { Head, Link } from '@inertiajs/react';
import BaseLayout from '../Layouts/BaseLayout';
import Header from '../Components/Header';


export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Kezdőoldal" />
            <BaseLayout>
                <Header title="PizzaWebshop" image="Welcome" />
                <div className="content d-flex align-items-center flex-column">
                    <div className="article-container d-flex flex-column align-items-center justify-content-center mt-5 mb-2 px-5 wow animate__animated animate__fadeInUp">
                        <h2>Rólunk</h2>
                        <p className="fs-5 text-center">
                            Üdvözlünk a PizzaWebshopnál, ahol az olasz pizzakultúra és a hazai ízlésvilág találkozik! Több mint 15 éve készítünk valódi olasz pizzákat eredeti receptek alapján, prémium minőségű alapanyagokkal – megfizethető áron.
                            Célunk, hogy minden szelet pizzánkban érezd a tradíciót, a szenvedélyt és a frissességet. Legyen szó klasszikus Margheritáról, vagy különlegesebb ízkombinációkról, nálunk garantáltan megtalálod a kedvenced!
                            Gyors kiszállítás, barátságos csapat, és mindig friss, forró pizza – ez a PizzaWebshop!
                        </p>
                    </div>
                    <div className="d-flex justify-content-center article_img_holder wow animate__animated animate__fadeIn" style={{animationDuration : '2s'}}>
                        <img src={`/images/pizzas/article_1.jpg`} alt="Article 1 Pizza" className="article_image" />
                    </div>
                    <Link className="btn btn-dark mt-4 wow animate__animated animate__fadeInUp" style={{animationDuration : '3s'}} href="/pizzas"><i className="fa fa-shopping-cart"></i> Rendelj most!</Link>
                    <div className="article-container d-flex flex-column align-items-center justify-content-center mt-5 mb-2 px-5 wow animate__animated animate__fadeInUp">
                        <h2>Együtt a pizza körül</h2>
                        <p className="fs-5 text-center">
                            A pizza nem csak étel – egy igazi közösségi élmény! Itt, a PizzaWebshopnál hiszünk abban, hogy a finom falatok összehozzák az embereket. Barátok, családtagok vagy akár új ismerősök, mindannyian köré gyűlünk a meleg, ropogós pizzaszeletek körül.
                            Legyen egy gyors vacsora vagy egy nagyobb összejövetel, a pizza a legjobb alapja a jó beszélgetéseknek, nevetéseknek és emlékeknek. Mert a pizza nem csak megédesíti a napot – meg is erősíti a kapcsolatokat!
                        </p>
                    </div>
                    <div className="d-flex justify-content-center article_img_holder wow animate__animated animate__fadeIn" style={{animationDuration : '2s'}}>
                        <img src={`/images/pizzas/article_2.jpg`} alt="Article 2 Pizza" className="article_image" />
                    </div>
                     <div className="article-container d-flex flex-column align-items-center justify-content-center mt-5 mb-2 px-5 wow animate__animated animate__fadeIn">
                        <h2>Kérdezz bátran, itt vagyunk neked!</h2>
                        <p className="fs-5 text-center">
                            Ha bármi kérdésed van pizzáinkkal, rendeléseddel vagy akár az étterem lefoglalásával kapcsolatban, ne habozz megkeresni minket! Szívesen segítünk, hogy a legjobb élményben legyen részed.
                            Használd a Kapcsolat menüpontot, küldj nekünk üzenetet, vagy hívd fel ügyfélszolgálatunkat – várjuk a megkeresésedet! Legyen szó egy különleges eseményről, csoportos foglalásról vagy csak egy gyors kérdésről, nálunk mindenre nyitottak vagyunk.
                            Várjuk, hogy segíthessünk neked!
                        </p>
                    </div>
                    <div className="d-flex justify-content-center article_img_holder wow animate__animated animate__fadeIn" style={{animationDuration : '2s'}}>
                        <img src={`/images/pizzas/article_3.jpg`} alt="Article 3 Pizza" className="article_image" />
                    </div>
                    <Link className="btn btn-dark mt-4 wow animate__animated animate__fadeInUp" style={{animationDuration : '3s'}} href="/contact"><i className="fa fa-comment"></i> Írj nekünk üzenetet</Link>
                </div>
            </BaseLayout>
        </>
    );
}
