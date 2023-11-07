var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");
const rolelist = ["admin", "seller"]

if (role && !rolelist.includes(role)) {
  location.href = `${location.origin}/index.html`
}
axios.get('https://api-zerot-lowdb.onrender.com/orders')
  .then(function (response) {
    // Xử lý dữ liệu JSON từ phản hồi ở đây
    var orders = response.data;
    console.log(orders);

    // Tính tổng tiền của các đơn hàng
    var totalAmount = 0;
    for (var i = 0; i < orders.length; i++) {
      totalAmount += orders[i].totalPrice;
    }

    // Hiển thị tổng tiền trên trang
    var totalOrderAmountElement = document.getElementById('total-order-amount');
    totalOrderAmountElement.innerHTML = 'Tổng Tiền: ' + totalAmount + ' VNĐ';

  })
  .catch(function (error) {
    console.error('Lỗi khi tải dữ liệu từ máy chủ:', error);
  });
  


// Fetch data from the API
axios.get('https://api-zerot-lowdb.onrender.com/users')
  .then(function (response) {
    var users = response.data;

    // Filter users with the role "customer"
    var customerUsers = users.filter(function (user) {
      return user.role === "customer";
    });

    // Calculate the total customer count
    var totalCustomerCount = customerUsers.length;

    // Update the element with the total customer count
    var totalCustomerCountElement = document.getElementById('total-customer-count');
    totalCustomerCountElement.textContent = 'Tổng khách hàng: ' + totalCustomerCount;
  })
  .catch(function (error) {
    console.error('Error loading data from the server:', error);
  });
axios.get('https://api-zerot-lowdb.onrender.com/orders')
  .then(function (response) {
    var orders = response.data;

    // Calculate the total order count
    var totalOrderCount = orders.length;

    // Update the element with the total order count
    var totalOrderCountElement = document.getElementById('total-order-count');
    totalOrderCountElement.textContent = 'Tổng Đơn Hàng: ' + totalOrderCount;
  })
  .catch(function (error) {
    console.error('Error loading data from the server:', error);
  });
axios.get('https://api-zerot-lowdb.onrender.com/products')
  .then(function (response) {
    var products = response.data;

    // Calculate the total product count
    var totalProductCount = products.length;

    // Update the element with the total product count
    var totalProductCountElement = document.getElementById('total-product-count');
    totalProductCountElement.textContent = 'Tổng Sản Phẩm: ' + totalProductCount;
  })
  .catch(function (error) {
    console.error('Error loading data from the server:', error);
  });
  axios.get('https://api-zerot-lowdb.onrender.com/orders')
  .then(response => {
    const data = response.data;

    // Tạo một đối tượng để lưu trữ tổng đơn hàng trên từng ngày và từng tháng
    const dailyTotal = {};
    const monthlyTotal = {};

    // Lặp qua từng đơn hàng trong dữ liệu
    data.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const monthKey = `${orderDate.getFullYear()}-${orderDate.getMonth() + 1}`;
      
      // Tính tổng tiền theo ngày
      const date = orderDate.getDate();
      if (dailyTotal[date]) {
        dailyTotal[date] += order.totalPrice;
      } else {
        dailyTotal[date] = order.totalPrice;
      }
      
      // Tính tổng tiền theo tháng
      if (monthlyTotal[monthKey]) {
        monthlyTotal[monthKey] += order.totalPrice;
      } else {
        monthlyTotal[monthKey] = order.totalPrice;
      }
    });

    // Chuẩn bị dữ liệu ban đầu cho biểu đồ (theo ngày)
    const labels = Object.keys(dailyTotal);
    const dataPoints = Object.values(dailyTotal);

    // Vẽ biểu đồ đường
    const ctx = document.getElementById('lineChart').getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Tổng tiền theo ngày',
          data: dataPoints,
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Lắng nghe sự kiện thay đổi lựa chọn
    const selectOption = document.getElementById('selectOption');
    selectOption.addEventListener('change', function() {
      const selectedOption = selectOption.value;

      // Xóa biểu đồ hiện tại
      myChart.destroy();

      // Chuẩn bị dữ liệu mới cho biểu đồ
      let newLabels, newDataPoints, label;

      if (selectedOption === 'daily') {
        newLabels = labels;
        newDataPoints = dataPoints;
        label = 'Tổng tiền theo ngày';
      } else if (selectedOption === 'monthly') {
        // Chuẩn bị dữ liệu theo tháng
        newLabels = Object.keys(monthlyTotal);
        newDataPoints = Object.values(monthlyTotal);
        label = 'Tổng tiền theo tháng';
      }

      // Vẽ biểu đồ mới
      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: newLabels,
          datasets: [{
            label: label,
            data: newDataPoints,
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  })
  .catch(error => {
    console.error('Lỗi khi tải dữ liệu đơn hàng:', error);
  });

// Sử dụng Axios để lấy dữ liệu từ API
axios.get('https://api-zerot-lowdb.onrender.com/products')
  .then(function (response) {
    var products = response.data;

    // Sắp xếp mảng sản phẩm theo trường "sold" giảm dần
    products.sort(function (a, b) {
      return b.sold - a.sold;
    });

    // Lấy 5 sản phẩm bán nhiều nhất
    var top5Products = products.slice(0, 5);

    // Lấy tên và sold của 5 sản phẩm này
    var productNames = top5Products.map(function (product) {
      return product.name;
    });

    var productSold = top5Products.map(function (product) {
      return product.sold;
    });

    // Vẽ biểu đồ bánh
    var ctx = document.getElementById('doughnut').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: productNames,
        datasets: [{
          data: productSold,
          backgroundColor: [
            'rgba(41, 155, 99, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(120, 46, 139, 1)',
            'rgba( 165, 42, 42, 1 )'
            // Thêm màu khác tương ứng với số lượng sản phẩm (nếu cần)
          ],
          borderColor: [
            'rgba(41, 155, 99, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(120, 46, 139, 1)',
            'rgba( 165, 42, 42, 1 )'
            // Thêm màu khác tương ứng với số lượng sản phẩm (nếu cần)
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  })
  .catch(function (error) {
    console.error('Lỗi khi tải dữ liệu từ máy chủ:', error);
  });







































