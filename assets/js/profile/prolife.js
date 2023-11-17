const apiUrl =
  window.location.hostname === "localhost" || "127.0.0.1"
    ? "http://localhost:4000"
    : "https://api-zerot-lowdb.onrender.com";

var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");
var me = JSON.parse(localStorage.getItem("me"));

const tbody = document.getElementById("table-body");
const row = document.createElement("tr");
row.innerHTML = `
                      <td class="table-profile">
                          <span class="username-1">Tên người dùng: ${
                            me.name
                          }</span>
                          <br>
                          <span class="username-2">Email người dùng: ${
                            me.email
                          }</span>
                          <br>
                          <span class="username-3">Số điện thoại người dùng: ${
                            me.phone
                          }</span>
                          <br>
                          <span class="username-4">Địa chỉ người dùng: ${
                            me.address ? me.address : ""
                          }</span>                                                                     
                      </td>`;
tbody.appendChild(row);

// function openModal() {
//   var modal = document.getElementById("myModal");
//   modal.style.display = "flex";
// }

// // Đóng modal
// function closeModal() {
//   //   var modal = document.getElementById("myModal");
//   //   modal.style.display = "none";
//   //   // Xóa giá trị ô input mật khẩu cũ khi đóng modal
//   //   document.getElementById("oldPassword").value = "";
// }

// Hàm thực hiện cập nhật mật khẩu mới
async function submitForm() {
  // Lấy giá trị mật khẩu mới từ input
  var newPassword = document.getElementById("newPassword").value;

  // Lấy thông tin người dùng từ local storage
  const profile = JSON.parse(localStorage.getItem("me"));

  try {
    // Gửi yêu cầu GET để lấy thông tin người dùng từ server
    const response = await axios.get(`${apiUrl}/users`);

    // Lấy danh sách người dùng từ kết quả trả về
    const users = response.data;

    // Tìm kiếm người dùng trong danh sách
    const userExist = users.find((user) => user.id === profile.id);

    // Kiểm tra mật khẩu hiện tại
    if (userExist && userExist.password === profile.password) {
      // Nếu mật khẩu hiện tại đúng, thực hiện cập nhật mật khẩu mới
      const updatedUser = {
        ...userExist,
        password: newPassword,
      };

      // Gửi yêu cầu PUT để cập nhật thông tin người dùng
      await axios.put(`${apiUrl}/users/${profile.id}`, updatedUser);

      // Thông báo cập nhật thành công (thực hiện theo ý của bạn)
      alert("Cập nhật mật khẩu thành công");

      // Đóng modal sau khi cập nhật thành công
      closeModal();
    } else {
      // Thông báo mật khẩu hiện tại không đúng (thực hiện theo ý của bạn)
      alert("Mật khẩu hiện tại không đúng");
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error updating password:", error);
  }
}
