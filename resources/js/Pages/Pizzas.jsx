import { Head, Link } from '@inertiajs/react';
import BaseLayout from '../Layouts/BaseLayout';
import PizzaList from '../Components/PizzaList';
import Header from '../Components/Header';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Pizzas({ pizzas, nameFilter: currentNameFilter, priceFrom: currentPriceFrom, priceTo: currentPriceTo, popularityFilter: currentPopularityFilter, keyword: currentKeyword, byPrice: currentByPrice }) {
    const [nameFilter, setNameFilter] = useState(currentNameFilter || '');
    const [priceFrom, setPriceFrom] = useState(currentPriceFrom || '');
    const [priceTo, setPriceTo] = useState(currentPriceTo || '');
    const [popularityFilter, setPopularityFilter] = useState(currentPopularityFilter || 1);
    const [keyword, setKeyword] = useState(currentKeyword || '');
    const [byPriceFilter, setByPriceFilter] = useState(currentByPrice || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/pizzas', { nameFilter, priceFrom, priceTo, popularityFilter, keyword, byPriceFilter }, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Pizzas" />
            <BaseLayout>

            <form onSubmit={handleFilter} className="filter-form d-flex flex-lg-row flex-column gap-3 justify-content-center p-3  wow animate__animated animate__fadeIn">
                <div className="form-group">
                    <input
                        type="text"
                        value={nameFilter}
                        onChange={e => setNameFilter(e.target.value)}
                        placeholder="Név"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        value={priceFrom}
                        onChange={e => setPriceFrom(e.target.value)}
                        placeholder="Forint - tól"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        value={priceTo}
                        onChange={e => setPriceTo(e.target.value)}
                        placeholder="Forint - ig"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <select 
                        value={popularityFilter}
                        onChange={e => setPopularityFilter(e.target.value)}
                        className="form-control"
                        >
                        <option value="0">---! Népszerűség szerinti rendezés !---</option>
                        <option value="1">Népszerűek elől</option>
                        <option value="2">Népszerűek hátul</option>
                    </select>
                </div>
                <div className="form-group">
                    <select 
                        value={byPriceFilter}
                        onChange={e => setByPriceFilter(e.target.value)}
                        className="form-control"
                        >
                        <option value="0">---! Ár szerinti rendezés !---</option>
                        <option value="1">Ár szerint növekvő</option>
                        <option value="2">Ár szerint csökkenő</option>
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        placeholder="Kulcsszó"
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-dark">
                    Szűrés
                </button>
            </form>

            <Header title="Pizzáink" image="pizzas" />

            <PizzaList pizzas={pizzas} />
            </BaseLayout>
        </>
    );
}
