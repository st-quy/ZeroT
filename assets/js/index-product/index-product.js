// const url = 'https://api-zerot-lowdb.onrender.com/products';

// fetch(url)
//     .then(response => response.json())
//     .then(products => {
//             const productList = document.querySelector('.product-list');

//             const sortedProducts = products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//             const currentDate = new Date();

//             sortedProducts.forEach(product => {
//                         const productItem = document.createElement("div");
//                         productItem.classList.add("product-item");
//                         productItem.classList.add("col-12");
//                         productItem.classList.add("col-md-4");

//                         const productCreatedAt = new Date(product.createdAt);
//                         const timeDifference = currentDate - productCreatedAt;
//                         const twoDaysInMillis = 3 * 24 * 60 * 60 * 1000;

//                         if (!product.deletedAt) {
//                             productItem.innerHTML = `
//                     <div class="product-container position-relative">
//                         <div class="form-group">
//                             <img src="${product.image[0].url}" style="width: 250px; display: block; margin: 0 auto"; />           
//                             <h3 class="white-text">${product.name}</h3>
//                             <div class="description-box">
//                                 <p class="description-text">${product.description}</p>
//                             </div>
//                             <p class="white-text">${product.price}<a>₫</a></p>
//                             <div class="add-to-cart">
//                                 <button>Thêm vào giỏ hàng</button>
//                             </div>
//                         </div> 
//                         ${timeDifference <= twoDaysInMillis
//                             ? `<span class="position-absolute top-0 translate-middle badge rounded-pill bg-warning badge-product">
//                                     Mới
//                                     <span class="visually-hidden">unread messages</span>
//                                 </span>`
//                             : ''
//                         }
//                     </div>
//                 `;
//                 productList.appendChild(productItem);
//             }
//         });
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });