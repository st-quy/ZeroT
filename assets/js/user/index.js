'use strict';

const tbody = document.querySelector('#data-table tbody');

axios
  .get('https://api-zerot.onrender.com/user')
  .then((response) => {
    // Lấy dữ liệu từ phản hồi của API
    const data = response.data;
    console.log(data);
    data
      .filter((acc) => acc.deletedAt === false || !acc.deletedAt)
      .map((item, index) => {
        console.log(index);
        const row = document.createElement('tr');
        row.innerHTML = `<td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                            >${index + 1}</span
                          >
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                            >${item.email}</span
                          >
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                            >${item.name}</span
                          >
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                            >${item.phone}</span
                          >
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span class="badge badge-sm bg-gradient-${item.role}"
                            >${item.role}</span
                          >
                        </td>
                        <td class="align-middle">
                          <i class="fa fa-pencil cursor-pointer" aria-hidden="true" onclick="handleEdit(${
                            item.id
                          })"></i>
                          <i class="fa fa-trash cursor-pointer" onclick="handleDelete(${
                            item.id
                          })"></i>
                        </td>
                        `;
        tbody.appendChild(row);
      });
    // new DataTable('#data-table');
    $('#data-table').DataTable({
      language: {
        paginate: {
          previous: '‹',
          next: '›',
        },
        aria: {
          paginate: {
            previous: 'Previous',
            next: 'Next',
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error('Error fetching data: ', error);
  });

async function handleEdit(userId) {
  try {
    const response = await axios.get(
      `https://api-zerot.onrender.com/user/${userId}`
    );
    const userData = response.data;

    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.textContent = `Chỉnh sửa thông tin: ${userData.name.toUpperCase()}`;
    modalBody.innerHTML = `
      <input type="hidden" name="code" />
                      <label>Email</label>
                      <div class="mb-3">
                        <input
                          readonly
                          class="form-control"
                          placeholder="${userData.email}"
                          aria-label="Email"
                          aria-describedby="email-addon"
                        />
                      </div>
      <input type="hidden" name="code" />
                      <label>Name</label>
                      <div class="mb-3">
                        <input
                          readonly
                          class="form-control"
                          placeholder="${userData.name}"
                          aria-label="Name"
                          aria-describedby="name-addon"
                        />
                      </div>
      <input type="hidden" name="code" />
                      <label>Phone Number</label>
                      <div class="mb-3">
                        <input
                          readonly
                          class="form-control"
                          placeholder="${userData.phone}"
                          aria-label="Phone"
                          aria-describedby="phone-addon"
                        />
                      </div>
                      <label>Role</label>
  <select class="form-control" id="selectRole">
    <option selected value="${userData.role}">${userData.role}</option>
    <option value="admin">Admin</option>
    <option value="customer">Customer</option>
    <option value="seller">Seller</option>
    <option value="delivery">Delivery Man</option>
  </select>
    `;
    const roleSelect = document.getElementById('selectRole');
    const saveModal = document.getElementById('btnSave');
    saveModal.addEventListener('click', async function () {
      try {
        const response = await axios.patch(
          `https://api-zerot.onrender.com/user/${userId}`,
          {
            role: roleSelect.value,
          }
        );

        console.log(response.data);

        const modal = new bootstrap.Modal(document.getElementById('myModal'));
        modal.hide();
        location.reload();
      } catch (error) {
        console.error('Lỗi khi lưu thay đổi role: ', error);
      }
    });
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}

async function handleDelete(userId) {
  try {
    const response = await axios.get(
      `https://api-zerot.onrender.com/user/${userId}`
    );
    const userData = response.data;

    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.textContent = `Delete user ${userData.id}: ${userData.name}`;
    modalBody.innerHTML = `Are you sure you want delete account ${userData.name} ?`;
    const roleSelect = document.getElementById('selectRole');
    const saveModal = document.getElementById('btnSave');
    saveModal.addEventListener('click', async function () {
      try {
        const response = await axios.patch(
          `https://api-zerot.onrender.com/user/${userId}`,
          {
            deletedAt: true,
          }
        );

        const modal = new bootstrap.Modal(document.getElementById('myModal'));
        modal.hide();
        location.reload();
      } catch (error) {
        console.error('Lỗi khi lưu thay đổi role: ', error);
      }
    });
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}
