import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import ConfirmModal from '../Components/ConfirmModal';
import axios from 'axios';

const PizzaList = ({ pizzas }) => {

  //Így a state-ben nyomon lehet követni (nem változás esetén is) az egyes pizzákhoz tartozó mennyiséget és méretet
  const [sizes, setSizes] = useState({});
  const [quantities, setQuantities] = useState({});

  const [notifStatus, setNotifStatus] = useState('');
  const [notifMsg, setNotifMSG] = useState('');
  const [modalStatus, setModalStatus] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalPizzaID, setModalPizzaID] = useState(null);
  const [confirmAction, setConfirmAction] = useState(() => () => {});

  const handleAddToCart = async (e, pizzaID) => {
      e.preventDefault();

      //Az adott pizza ID-hoz tartozó érték
      const quantity = quantities[pizzaID] || 1;
      const size = sizes[pizzaID] || "24";

      try {
        const response = await axios.post('/add-to-cart',  {
           quantity, 
           size, 
           pizzaID
        });

        if(response.data.added == true) {
          setModalPizzaID(pizzaID);
          setModalStatus('show');
          setModalMessage('Ez a termék már hozzá lett adva a kosaradhoz. Szeretnéd a terméket az adott mennyiséggel növelni?')
          setConfirmAction(() => () => handleAddToCartConfirm(pizzaID));
        }else {
          setModalStatus('show');
          setModalMessage('A termék sikeresn hozzáadva a kosaradhoz! Szeretnéd a kosarad tartalmát megtekinteni?')
          setConfirmAction(() => () => handleGoToCart());
        }
      }
      catch(error) {
        console.log("Error: " + error);
      }
  };

  const handleGoToCart = () => {
      router.get('/cart');
  };

  const handleAddToCartConfirm = async (pizzaID) => {

      //Az adott pizza ID-hoz tartozó érték
      const quantity = quantities[pizzaID] || 1;
      const size = sizes[pizzaID] || "24";

      try {
        const response = await axios.post('/add-to-cart-confirm',  {
           quantity, 
           size, 
           pizzaID
        });

        setModalMessage('A termék sikeresn hozzáadva a kosaradhoz! Szeretnéd a kosarad tartalmát megtekinteni?')
        setConfirmAction(() => () => handleGoToCart());
        setModalPizzaID(null);
      }

      catch(error) {
        console.log("Error: " + error);
      }
  };

  const handleCloseModal = () => {
      setModalStatus('');
      setModalMessage('');
      setModalPizzaID(null);
  };

  return (
    <>
      <ConfirmModal status={modalStatus} message={modalMessage} onConfirm={confirmAction} onClose={() => handleCloseModal()} />
      <div className="py-4">
        <div className="container-fluid  d-flex flex-column align-items-center gap-4 content">
          {pizzas.data.map((pizza, index) => (
            <div key={pizza.id} className="pizza-box d-flex flex-column flex-lg-row justify-content-lg-between align-items-center wow animate__animated animate__fadeInUp" style={{ animationDelay: index + 's' }}>
              <img src="/images/pizzas/pizza.png" alt="{pizza.name}" className="pizza_image" />
              <div className="d-flex flex-column align-items-lg-end align-items-center gap-4 col-lg-4 col-12">
                <h3>{pizza.name} - {pizza.price}Ft</h3>
                
                <div className="container p-0 d-flex gap-3 justify-content-lg-end justify-content-center">
                  {JSON.parse(pizza.toppings).map((topping, index) => (
                    <div className="topping-box px-3 py-1 d-flex justify-content-center align-items-center" key={index}>
                      {topping}
                    </div>
                  ))}
                </div>

                <div className="container p-0 d-flex gap-3 justify-content-lg-end justify-content-center">
                  {JSON.parse(pizza.keywords).map((keyword, index) => (
                    <div className="keyword-box px-3 py-1 d-flex justify-content-end align-items-center text-white" key={index}>
                      {keyword}
                    </div>
                  ))}
                </div>

                <div className="container p-0 d-flex gap-3 justify-content-lg-end justify-content-center">
                    <div className="keyword-box px-3 py-1 d-flex justify-content-end align-items-center text-white gap-2">
                      Népszerűség: {pizza.popularity} <i className="fa fa-star"></i> 
                    </div>
                </div>

                <div className="container p-0 d-flex gap-3 justify-content-lg-end justify-content-center">
                  <div className="d-flex gap-3 align-items-center">
                    <button className="btn btn-dark"
                      onClick={() => {
                        if((quantities[pizza.id] || 0) > 0) {
                          setQuantities({ ...quantities, [pizza.id]: 
                            quantities[pizza.id] - 1
                          })
                        }
                      }}
                    >
                    <i className="fa fa-minus"></i>
                    </button>
                    <p className="text-dark fs-4 p-0 m-0">{quantities[pizza.id] || 0}</p>
                    <button className="btn btn-dark"
                      onClick={() => {
                        setQuantities({ ...quantities, [pizza.id]: 
                          quantities[pizza.id] + 1 || 1
                        })
                      }}
                    >
                    <i className="fa fa-plus"></i>
                    </button>
                  </div>
                  <select value={sizes[pizza.id] || "24"} onChange={(e) => setSizes({ ...sizes, [pizza.id]: e.target.value})} className="form-control">
                    <option value="24">24"</option>
                    <option value="32">32"</option>
                    <option value="64">64"</option>
                  </select>
                  <button 
                    className="btn btn-dark d-flex align-items-center gap-2"
                    data-id={pizza.id}
                    onClick={(e) => {
                      handleAddToCart(e, e.currentTarget.dataset.id);
                    }}
                  >
                    <i className="fa fa-cart-shopping"></i> Kosárba
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex align-items-center gap-3">
              {pizzas.prev_page_url && (
                <button className="btn btn-dark" onClick={() => router.get(pizzas.prev_page_url)}> <i className="fa fa-arrow-left"></i>
                </button>
              )}
                <span>Oldal {pizzas.current_page} / {pizzas.last_page}</span>
              {pizzas.next_page_url && (
                <button className="btn btn-dark" onClick={() => router.get(pizzas.next_page_url)}> <i className="fa fa-arrow-right"></i>
                </button>
              )}
            </div>
        </div>
      </div>
    </>
  );
};

export default PizzaList;