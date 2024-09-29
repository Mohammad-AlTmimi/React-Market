import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import FilterInput from "./components/FilterInput";
import "../style.css";
const App: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    };

    fetchProducts();
  }, []);
  const handleFilter = (filterText: string) => {
    const lowerCaseFilter = filterText.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.category.toLowerCase().includes(lowerCaseFilter) ||
        product.title.toLowerCase().includes(lowerCaseFilter)
    );
    setFilteredProducts(filtered);
  };
  return (
    <>
      <Header />
      <FilterInput onFilter={handleFilter} />{" "}
      <div className="product-list">
        
        {filteredProducts.map((product) => (
          <div key={product.id} className="card">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={product.image}
                  className="img-fluid rounded-start"
                  alt={product.title}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Category: {product.category}</p>
                  <p className="card-text">Price: ${product.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
