document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');
    const filterInput = document.getElementById('filter-input');
    const categorySuggestions = document.getElementById('category-suggestions');
  
    let products = [];
    let categories = new Set();
  
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    const displayProducts = (filteredProducts) => {
      productList.innerHTML = '';
      filteredProducts.forEach(product => {
        const productHTML = `
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${product.image}" class="img-fluid rounded-start" alt="${product.title}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">Category: ${product.category}</p>
                  <p class="card-text">Price: $${product.price}</p>
                </div>
              </div>
            </div>
          </div>
        `;
        productList.innerHTML += productHTML;
      });
    };
  
    products = await fetchProducts();
  
    products.forEach(product => categories.add(product.category));
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      categorySuggestions.appendChild(option);
    });
  
    displayProducts(products);
  
    filterInput.addEventListener('input', () => {
      const filterValue = filterInput.value.toLowerCase();  // Get and lowercase input
      const filteredProducts = products.filter(product =>
        product.category.toLowerCase().includes(filterValue) || 
        product.title.toLowerCase().includes(filterValue)
      );
      
      displayProducts(filteredProducts);
    });
  });
  