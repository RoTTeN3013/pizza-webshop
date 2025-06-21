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

        console.log(response)
        setCartItems(response.data.cartItems);
        setTotalPrice(response.data.total);
      }
      catch(error) {
        console.log("Error: " + error);
      }
  };

  return (
    <div className="p-4">
      <div className="d-flex container-fluid justify-content-center content wow animate__animated animate__backInRight" style={{ animationDuration: "1.5s" }}>
        <div className="px-5 d-flex flex-column align-items-center gap-4 col-8">
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
                    </div>
              </div>
            ))
          ) : (
            <p className="text-center fs-3">A kosár tartalma üres!</p>
          )}
        </div>
        <div className="d-flex flex-column col-4 gap-4">
          <div className="cart_total_container d-flex justify-content-start align-items-center p-3 bg-dark text-white">
              <p className="total-price fs-5 p-0 m-0">Kosár végösszege: {totalPrice}Ft</p> 
          </div>
          <div className="d-flex gap-2 justify-content-end">
            <Link className="btn btn-dark" href="/pizzas"><i className="fa fa-shopping-cart"></i> Vásárlás folytatása</Link>
            <button className="btn btn-dark"><i className="fa fa-credit-card"></i> Tovább a fizetéshez</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;