import { router } from '@inertiajs/react';
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
      <div className="container-fluid px-5 d-flex flex-column align-items-center gap-4">
        {cartItemList.map((item) => (
          <div key={item.index} className="pizza-box d-flex flex-column flex-lg-row w-lg-75 justify-content-lg-between align-items-center">
            <img src="/images/pizzas/pizza.png" alt="{item.name}" className="pizza_image" />
            <div className="d-flex flex-column align-items-lg-end align-items-center gap-4">
              <h3>{item.name} {item.size} - {item.price} Ft</h3>  
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
          </div>
        ))}
        <div className="container-fluid d-flex justify-content-end p-3">
           <p className="total-price">{totalPrice}Ft</p> 
        </div>
      </div>
    </div>
  );
};

export default CartItems;