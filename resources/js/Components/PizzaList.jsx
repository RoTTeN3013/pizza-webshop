
const PizzaList = ({ pizzas }) => {

  return (
    <div className="p-4">
      <div className="container-fluid px-5 d-flex flex-column align-items-center gap-4">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="pizza-box d-flex flex-column flex-lg-row w-lg-75 justify-content-lg-between align-items-center">
            <img src="/images/pizzas/pizza.png" alt="{pizza.name}" className="pizza_image" />
            <div className="d-flex flex-column align-items-lg-end align-items-center gap-4">
              <h3>{pizza.name} - {pizza.price}Ft</h3>
              
              <div className="container p-0 d-flex gap-3 justify-content-end">
                {JSON.parse(pizza.toppings).map((topping, index) => (
                  <div className="topping-box px-3 py-1 d-flex justify-content-end align-items-center" key={index}>
                    {topping}
                  </div>
                ))}
              </div>

              <div className="container p-0 d-flex gap-3 justify-content-lg-end">
                {JSON.parse(pizza.keywords).map((keyword, index) => (
                  <div className="keyword-box px-3 py-1 d-flex justify-content-end align-items-center text-white" key={index}>
                    {keyword}
                  </div>
                ))}
              </div>

              <div className="container p-0 d-flex gap-3 justify-content-lg-end">
                  <div className="keyword-box px-3 py-1 d-flex justify-content-end align-items-center text-white gap-2">
                    Népszerűség: {pizza.popularity} <i className="fa fa-star"></i> 
                  </div>
              </div>

              <div className="container p-0 d-flex gap-3 justify-content-end">
                <input type="number" id="quantity_{pizza.id}" className="form-control" value="0" />
                <select id="size_{pizza.id}" className="form-control">
                  <option value="24">24"</option>
                  <option value="32">32"</option>
                  <option value="64">64"</option>
                </select>
                <button className="btn btn-dark d-flex align-items-center gap-2"><i className="fa fa-cart-shopping"></i> Kosárba</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PizzaList;