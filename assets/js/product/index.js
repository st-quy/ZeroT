const tbody = document.querySelector("#table-product tbody");
axios
  .get("https://api-zerot-lowdb.onrender.com/products")
  .then(function (response) {
    let index = 1;
    const products = response.data.reverse();
    products.forEach(function (product) {
      if (!product.deletedAt) {
        const row = document.createElement("tr");
        row.innerHTML = `
                            
                  <td class="align-middle text-center data-id='${product.id}'>
                  <span class="text-secondary text-xs font-weight-bold">${index}</span>
                  </td>
                  
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${
                      product.name
                    }</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${
                      product.price
                    } VND</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${product.description.substring(
                      0,
                      15
                    )}</span>
                  </td>
                  <td class="align-middle text-center">
                      ${
                        Array.isArray(product.image)
                          ? `<img src="${product.image[0]?.url}" style="width: 150px" />`
                          : `<img src="${product.image}" style="width: 150px" />`
                      }
                  </td>
                  
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${
                      product.category
                    }</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${
                      product.stock
                    }</span>
                  </td>
                  <td class="align-middle text-center">
                  ${
                    product.review?.length > 0
                      ? `<span class='text-secondary text-xs font-weight-bold'>
                        ${product.review}
                      </span>`
                      : `<span class='text-secondary text-xs font-weight-bold'>Sản phẩm chưa có review</span>`
                  }
                  </td>
                  <td class="align-middle text-center">
                  <a onclick=handleEdit(${product.id}) class="">
                    <i class="fa fa-pencil cursor-pointer" ></i>                   
                  </a>
                  <a onclick=handleDelete(${product.id}) class="">
                    <i class="fa fa-trash cursor-pointer"></i>
                  </a>
                  </td>`;

        tbody.appendChild(row);
        index++;
      }
    });
    $("#table-product").DataTable({
      language: {
        paginate: {
          previous: "‹",
          next: "›",
        },
        aria: {
          paginate: {
            previous: "Previous",
            next: "Next",
          },
        },
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Vietnamese.json",
      },
    });
  })

  .catch(function (error) {
    console.error("Error fetching data: ", error);
  });

async function handleEdit(id) {
  try {
    const response = await axios.get(
      `https://api-zerot-lowdb.onrender.com/products/${id}`
    );
    const product = response.data;
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    modalTitle.textContent = `Chỉnh sửa thông tin sản phẩm: ${product.name}`;
    modalBody.innerHTML = `
  <div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <label for="nameInput">Tên sản phẩm</label>
        <input type="text" class="form-control" id="nameInput" placeholder="Tên sản phẩm" value="${
          product.name
        }" />
      </div>
      <div class="form-group">
        <label for="priceInput">Giá sản phẩm</label>
        <input type="number" min="1" class="form-control" id="priceInput" placeholder="Giá sản phẩm (VND)" value="${
          product.price
        }" />
      </div>
      <div class="form-group">
        <label for="descriptionInput">Mô tả sản phẩm</label>
        <textarea style="resize: none;"  type="text" class="form-control" id="descriptionInput" placeholder="Mô tả sản phẩm" required>${
          product.description
        }</textarea>
      </div>
      <div class="form-group">
        <label for="stockInput">Hàng lưu giữ</label>
        <input type="number" min="0" class="form-control" id="stockInput" placeholder="Hàng lưu trữ" value="${
          product.stock
        }" />
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
      <label for="categoryInput">Loại sản phẩm</label>
      <select name="category" class="form-control" id="categoryInput" required>
        <option value="laptop">Laptop</option>
        <option value="Phụ kiện">Phụ kiện</option>
      </select>
    </div>
      <div class="form-group">
        <label for="productImage">Hình ảnh sản phẩm</label>
        <div class="mb-3">
              <button class="btn btn-primary mt-1" style="display:block" id="editImageButton">Sửa hình ảnh</button>
              <input type="file" id="imageInput" style="display: none" multiple/>
            ${
              Array.isArray(product.image)
                ? product.image
                    .map((image, index) => {
                      return `<img src="${product.image[index].url}" style="width:100px; padding: 10px"/>`;
                    })
                    .join("")
                : `<img src="${product.image}" style="width:100px; padding: 10px"/>`
            }
          </div>
          <div>
            <label id="labelNewImage"></label>
            <div id="previewNewImage"></div>
          </div>
      </div>
    </div>
  </div>
        `;

    const modal = new bootstrap.Modal(document.getElementById("myModal"));
    modal.show();

    const editImageButton = document.getElementById("editImageButton");
    const imageInput = document.getElementById("imageInput");
    editImageButton.addEventListener("click", () => {
      imageInput.click();
    });
    const labelNewImage = document.getElementById("labelNewImage");
    const previewNewImage = document.getElementById("previewNewImage");

    imageInput.addEventListener("change", async (e) => {
      labelNewImage.innerHTML = "Hình ảnh mới";
      previewNewImage.innerHTML = "";
      if (imageInput.files.length > 0) {
        for (const file of imageInput.files) {
          const reader = new FileReader();

          reader.onload = function (e) {
            const imageUrl = e.target.result;
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            imgElement.alt = "Selected Image";
            imgElement.style.width = "100px";
            imgElement.style.padding = "10px";
            previewNewImage.appendChild(imgElement);
          };

          reader.readAsDataURL(file);
        }
      }
    });

    const saveModal = document.getElementById("btnSave");
    saveModal.innerHTML = "Cập nhật";
    saveModal.addEventListener("click", async function () {
      try {
        const nameInput = document.getElementById("nameInput");
        const priceInput = document.getElementById("priceInput");
        const stockInput = document.getElementById("stockInput");
        const categoryInput = document.getElementById("categoryInput");
        const descriptionInput = document.getElementById("descriptionInput");
        const imageInput = document.getElementById("imageInput");

        var name = nameInput.value.trim();
        var price = Number(priceInput.value);
        var stock = Number(stockInput.value);
        var category = categoryInput.value;
        var description = descriptionInput.value.trim();

        if (name === "") {
          alert("Tên sản phẩm không được để trống");
          return;
        }
        if (price <= 0) {
          alert("Giá sản phẩm phải là một số dương");
          return;
        }
        if (description === "") {
          alert("Mô tả không được để trống");
          return;
        }
        if (category === "") {
          alert("Loại sản phẩm không được để trống");
          return;
        }
        if (stock < 0) {
          alert("Hàng lưu giữ phải là một số không âm");
          return;
        }

        if (imageInput.files.length > 0) {
          // delete old images
          const CLOUD_NAME = "dyk82loo2";
          const apiKey = "277715959481595";
          const apiSecret = "heBz5pvNQ9Pi6Oh13qjBAUOz-_c";

          const deleteUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`;

          for (const image of product.image) {
            const timestamp = new Date().getTime();
            const string = `public_id=${image.public_id}&timestamp=${timestamp}${apiSecret}`;
            var signature = sha1(string);
            const formData = new FormData();
            formData.append("public_id", image.public_id);
            formData.append("api_key", apiKey);
            formData.append("signature", signature);
            formData.append("timestamp", timestamp);
            axios.post(deleteUrl, formData);
          }
          const urls = await uploadFile(imageInput.files);
          try {
            await axios
              .patch(`https://api-zerot-lowdb.onrender.com/products/${id}`, {
                name,
                price,
                stock,
                category,
                description,
                image: urls,
              })
              .then((response) => {
                const modal = new bootstrap.Modal(
                  document.getElementById("myModal")
                );
                modal.hide();
                location.reload();
              });
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            await axios
              .patch(`https://api-zerot-lowdb.onrender.com/products/${id}`, {
                name: nameInput.value,
                price: Number(priceInput.value),
                stock: Number(stockInput.value),
                category: categoryInput.value,
                description: descriptionInput.value,
              })
              .then((response) => {
                const modal = new bootstrap.Modal(
                  document.getElementById("myModal")
                );
                modal.hide();
                location.reload();
              });
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lưu thay đổi: ", error);
      }
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin sản phẩm: ", error);
  }
}

async function handleDelete(id) {
  try {
    const response = await axios.get(
      `https://api-zerot-lowdb.onrender.com/products/${id}`
    );
    const product = response.data;

    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    modalTitle.textContent = `Xóa sản phẩm: ${product.name}`;
    modalBody.innerHTML = `Bạn có chắc chắn rằng bạn muốn xóa sản phẩm ${product.name} không ?`;

    const saveModal = document.getElementById("btnSave");
    saveModal.addEventListener("click", async function () {
      try {
        const deleteResponse = await axios.delete(
          `https://api-zerot-lowdb.onrender.com/products/${id}`
        );
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Sản phẩm đã được xóa thành công",
        }).then((result) => {
          if (result.isConfirmed) {
            const modal = new bootstrap.Modal(
              document.getElementById("myModal")
            );
            modal.hide();
            location.reload();
          }
        });
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm: ", error);
      }
    });

    const modal = new bootstrap.Modal(document.getElementById("myModal"));
    modal.show();
  } catch (error) {
    console.error("Lỗi khi lấy thông tin sản phẩm: ", error);
  }
}

async function createProduct() {
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  modalTitle.textContent = `Thêm sản phẩm mới`;
  modalBody.innerHTML = `
    <div class="row">
    <div class="col-md-6">
      <label>Tên sản phẩm</label>
      <div class="mb-3">
        <input type="text" class="form-control" id="nameInput" placeholder="Tên sản phẩm" required/>
      </div>
    
      <label>Giá sản phẩm</label>
      <div class="mb-3">
        <input type="number" min="1" class="form-control" id="priceInput" placeholder="Giá sản phẩm (VND)" required/>
      </div>
      <label>Mô tả sản phẩm</label>
      <div class="mb-3">
        <textarea style="resize: none;"  type="text" class="form-control" id="description" placeholder="Mô tả sản phẩm" required></textarea>
      </div>
    
      <label>Hàng lưu trữ</label>
      <div class="mb-3">
        <input type="number" min="0" class="form-control" id="stockInput" placeholder="Hàng lưu trữ" required/>
      </div>
    </div>

    <div class="col-md-6">
      <label>Loại sản phẩm</label>
      <div class="mb-3">
        <select name="category"class="form-control" id="categoryInput" required>
          <option value="laptop">Laptop</option>
          <option value="phụ kiện">Phụ kiện</option>
        </select>
      </div>

      <label>Ảnh </label>
      <div class="mb-3">
        <input class="form-control" type="file" id="imageInput" multiple required/>
      </div>

      <div id="previewImage"></div>

    </div>
    </div>

  

`;

  const modal = new bootstrap.Modal(document.getElementById("myModal"));
  modal.show();

  var nameInput = document.querySelector('input[placeholder="Tên sản phẩm"');
  var priceInput = document.querySelector(
    'input[placeholder="Giá sản phẩm (VND)"'
  );
  var stockInput = document.querySelector('input[placeholder="Hàng lưu trữ"');
  var descriptionInput = document.querySelector(
    'textarea[placeholder="Mô tả sản phẩm"'
  );
  var categoryInput = document.querySelector('select[name="category"');
  var fileInput = document.querySelector('input[type="file"');
  var previewImage = document.getElementById("previewImage");
  const btnSave = document.getElementById("btnSave");
  btnSave.innerHTML = "Thêm mới";
  fileInput.addEventListener("change", () => {
    previewImage.innerHTML = "";
    if (fileInput.files.length > 0) {
      for (const file of fileInput.files) {
        const reader = new FileReader();

        reader.onload = function (e) {
          const imageUrl = e.target.result;
          const imgElement = document.createElement("img");
          imgElement.src = imageUrl;
          imgElement.alt = "Selected Image";
          imgElement.style.width = "100px";
          imgElement.style.padding = "10px";
          previewImage.appendChild(imgElement);
        };

        reader.readAsDataURL(file);
      }
    }
  });

  btnSave.addEventListener("click", async () => {
    var name = nameInput.value.trim();
    var price = Number(priceInput.value);
    var stock = Number(stockInput.value);
    var description = descriptionInput.value.trim();
    var category = categoryInput.value.trim();

    if (
      name &&
      price > 0 &&
      stock > 0 &&
      description &&
      category &&
      fileInput.files.length > 0
    ) {
      var urls = await uploadFile(fileInput.files);
      try {
        await axios
          .post("https://api-zerot-lowdb.onrender.com/products", {
            name,
            price,
            stock,
            description,
            category,
            image: urls,
            review: [],
          })
          .then((response) => {
            const modal = new bootstrap.Modal(
              document.getElementById("myModal")
            );
            modal.hide();
            location.reload();
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      const modal = new bootstrap.Modal(document.getElementById("myModal"));
      alert("Vui lòng nhập đầy đủ thông tin sản phẩm");
      return;
    }
  });
}

const uploadFile = async (files) => {
  const CLOUD_NAME = "dyk82loo2";
  const PRESET_NAME = "demo-upload";
  const FOLDER_NAME = "products";
  const urls = [];
  const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

  const formData = new FormData();

  formData.append("upload_preset", PRESET_NAME);
  formData.append("folder", FOLDER_NAME);

  for (const file of files) {
    formData.append("file", file);
    const response = await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    urls.push({
      url: response.data.url,
      public_id: response.data.public_id,
    });
  }
  return urls;
};
