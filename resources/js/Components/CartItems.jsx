import { Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import axios from 'axios';

const CartItems = ({ cartItems, total }) => {

  const [cartItemList, setCartItems] = useState(cartItems);
  const [totalPrice, setTotalPrice] = useState(total);

  const handleUpdateCart = async (index, quantity) => {
      try {
        const response = await axios.post('/update-cart',  {
          quantity, 
          index,
        });

        setCartItems(response.data.cartItems);
        setTotalPrice(response.data.total);
      }
      catch(error) {
        console.log("Error: " + error);
      }
  };

  return (
    <div className="p-4">
      <div className="d-flex flex-lg-row flex-column container-fluid justify-content-center align-items-center align-items-lg-start content wow animate__animated animate__backInRight" style={{ animationDuration: "1.5s" }}>
        <div className="p-0 mb-4 mb-lg-0 d-flex flex-column align-items-lg-between align-items-center gap-lg-4 gap-2 col-lg-8 col-12">
          {cartItemList.length > 0 ? (
            cartItemList.map((item) => (
              <div key={item.index} className="d-flex justify-content-between align-items-center cart_item_container w-100">

                  <p className="fs-6 p-0 m-0">{item.name} {item.size}" - {item.price} Ft</p>  
                  <div className="d-flex gap-3 align-items-center">
                      <button className="btn btn-dark"
                        onClick={() => {
                          if((item.quantity) > 0) {
                            handleUpdateCart(item.index, item.quantity - 1);
                          }
                        }}
                      >
                      <i className="fa fa-minus"></i>
                      </button>
                      <p className="text-dark p-0 m-0">{item.quantity}</p>
                      <button className="btn btn-dark"
                        onClick={() => {
                          handleUpdateCart(item.index, item.quantity + 1);
                        }}
                      >
                      <i className="fa fa-plus"></i>
                      </button>
                      <button className="btn btn-dark"
                        onClick={() => {
                          handleUpdateCart(item.index, 0);
                        }}
                      >
                      <i className="fa fa-trash"></i>
                      </button>
                    </div>
              </div>
            ))
          ) : (
            <p className="text-left fs-3 p-0 m-0">A kosarad jelenleg üres!</p>
          )}
        </div>
        <div className="d-flex flex-column col-lg-4 col-12 gap-4 align-items-center align-items-lg-end">
          <div className="cart_total_container d-flex justify-content-start align-items-center p-3 bg-dark text-white">
              <p className="total-price fs-5 p-0 m-0">Kosár végösszege: {totalPrice}Ft</p> 
          </div>
          <div className="d-flex gap-2 justify-content-end">
            <Link className="btn btn-dark" href="/pizzas"><i className="fa fa-shopping-cart"></i> Vásárlás folytatása</Link>
            {cartItemList.length > 0 && (
              <Link className="btn btn-dark" href="/order-confirmation"><i className="fa fa-credit-card"></i> Tovább a fizetéshez</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;