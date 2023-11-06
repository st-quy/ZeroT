const tbody = document.querySelector("#table-product tbody");
axios
  .get("https://api-zerot-lowdb.onrender.com/products")

  .then(function (response) {
    const data = response.data;
    data.forEach(function (product) {
      const row = document.createElement("tr");
      row.innerHTML = `<td class="align-middle text-center data-id='${product.id}'">
                          <span class="text-secondary text-xs font-weight-bold">
                            ${product.id}
                            </span>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold">
                            ${product.name}</span>
                          
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                            >${product.price}</span>
                          
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                            >${product.description}</span>
                          
                        </td>
                        <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold"
                          >${product.image}</span>
                        
                      </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                          >${product.category}</span>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                          >${product.stock}</span>
                        </td>
                        
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold"
                        >${product.review}</span>
                      </td>
                      <td class="align-middle text-center">
                      <i class="  fa fa-pencil cursor-pointer" onclick=handleEdit(${product.id}) btn-sm"></i>
                      <span>&nbsp;</span>
                      <i class="   fa fa-trash cursor-pointer" onclick=handleDelete(${product.id}) btn-sm"></i>
                        </td>`;
      tbody.appendChild(row);
    });
  })
  .catch(function (error) {
    console.error("Error fetching data: ", error);
  });

async function handleDelete(id) {
  try {
    // Gọi API xóa
    await axios(
      `
          https://api-zerot-lowdb.onrender.com/products/${id}`,
      {
        method: "DELETE",
      }
    );
    const row = document.querySelector(`[data-id="${id}"]`);
    row.remove();
    await loadProducts();
  } catch (error) {
    console.error(error);
  }
}
async function handleEdit(id) {
  try {
    const response = await axios.get(
      `https://api-zerot-lowdb.onrender.com/products/${id}`
    );
    const product = response.data;
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    modalTitle.textContent = `Chỉnh sửa thông tin san pham : ${product.name}`;
    modalBody.innerHTML = `
  <input type="hidden" name="code" />
  <label>ID</label>
                      <div class="mb-3">
                        <input
                          readonly
                          class="form-control"
                          placeholder="${product.id}"                      
                        />
                      </div>
  <input type="hidden" name="code" />
  <label>Name</label>
  <div class="mb-3">
    <input type="text" id="nameInput" placeholder="${product.name}" value="${product.name}" />
  </div>
  <input type="hidden" name="code" />
  <label>Price</label>
  <div class="mb-3">
    <input type="text" id="priceInput" placeholder="${product.price}" value="${product.price}" />
  </div>
  <input type="hidden" name="code" /> 
  <label>STOCK</label>
  <div class="mb-3">
    <input type="text" id="stockInput" placeholder="${product.stock}" value="${product.stock}" />
  </div>
  <input type="hidden" name="code" />
  <label>Category</label>
  <div class="mb-3">
    <input type="text" id="categoryInput" placeholder="${product.category}" value="${product.category}" />
  </div>
  <input type="hidden" name="code" />


`;
    const nameInput = document.getElementById(
      "nameInput",
      "stockInput",
      "categoryInput"
    );
    const nameValue = nameInput.value;
    const priceInput = document.getElementById("priceInput");
    const priceValue = priceInput.value;
    const stockInput = document.getElementById("stockInput");
    const stockValue = stockInput.value;
    const categoryInput = document.getElementById("categoryInput");
    const categoryValue = categoryInput.value;
    //lay input
    const modal = new bootstrap.Modal(document.getElementById("myModal"));
    modal.show();
    const saveModal = document.getElementById("btnSave");
    saveModal.addEventListener("click", async function () {
      try {
        const response = await axios.patch(
          `https://api-zerot-lowdb.onrender.com/products/${id}`,
          {
            name: nameInput.value,
            price: priceInput.value,
            stock: stockInput.value,
            category: categoryInput.value,
          }
        );

        const modal = new bootstrap.Modal(document.getElementById("myModal"));
        modal.hide();
        location.reload();
      } catch (error) {
        console.error("Lỗi khi lưu thay đổi: ", error);
      }
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

async function createProduct() {
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  modalTitle.textContent = `Thêm sản phẩm mới`;
  modalBody.innerHTML = `
  <label>Name</label>
  <div class="mb-3">
    <input type="text" id="nameInput" placeholder="name"/>
  </div>

  <label>Price</label>
  <div class="mb-3">
    <input type="number" id="priceInput" placeholder="price"/>
  </div>
  <label>Description</label>
  <div class="mb-3">
    <textarea  type="text" id="description" placeholder="description"></textarea>
  </div>
 
  <label>STOCK</label>
  <div class="mb-3">
    <input type="number" id="stockInput" placeholder="stock" />
  </div>

  <label>Category</label>
  <div class="mb-3">
    <select name="category" id="categoryInput">
      <option value="laptop">Macbook</option>
      <option value="accessory">Phụ kiện</option>
    </select>
  </div>

   <label>Image</label>
  <div class="mb-3">
    <input type="file" id="imageInput" multiple />
  </div>

`;

  const modal = new bootstrap.Modal(document.getElementById("myModal"));
  modal.show();

  var nameInput = document.querySelector('input[placeholder="name"');
  var priceInput = document.querySelector('input[placeholder="price"');
  var stockInput = document.querySelector('textarea[placeholder="description"');
  var descriptionInput = document.querySelector('input[placeholder="stock"');
  var categoryInput = document.querySelector('select[name="category"');

  const btnSave = document.getElementById("btnSave");
  btnSave.addEventListener("click", async () => {
    var name = nameInput.value;
    var price = priceInput.value;
    var stock = stockInput.value;
    var description = descriptionInput.value;
    var category = categoryInput.value;

    await axios
      .post("https://api-zerot-lowdb.onrender.com/products", {
        name,
        price,
        stock,
        description,
        category,
      })
      .then((response) => {
        toastr.success("Tạo sản phẩm mới", "Thành công", {
          timeOut: 2000,
          closeButton: true,
          debug: false,
          newestOnTop: true,
          progressBar: true,
          positionClass: "toast-top-right",
          preventDuplicates: true,
          onclick: null,
          showDuration: "300",
          hideDuration: "1000",
          extendedTimeOut: "1000",
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
          tapToDismiss: false,
        });
        // console.log("success");
        // const modal = new bootstrap.Modal(document.getElementById("myModal"));
        // modal.hide();
        location.reload();
      });
  });
}
