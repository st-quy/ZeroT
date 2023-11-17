const apiUrl =
  window.location.hostname === "localhost" || "127.0.0.1"
    ? "http://localhost:4000"
    : "https://api-zerot-lowdb.onrender.com";
var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");

if (!role || !["admin", "seller"].includes(role)) {
  location.href = `${location.origin}/index.html`;
}
if (role === "customer") {
  location.href = `${location.origin}/unauthorized.html`;
}
if (!role || !["admin", "seller"].includes(role)) {
  location.href = `${location.origin}/index.html`;
}

// if (role === "customer") {
//   location.href = `${location.origin}/unauthorized.html`;
// }

axios
  .get(`${apiUrl}/orders`)
  .then(function (response) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const orders = response.data;

    const currentMonthOrders = orders.filter(function (order) {
      const orderDate = new Date(order.createdAt);
      const orderMonth = orderDate.getMonth() + 1;
      const orderYear = orderDate.getFullYear();
      return orderMonth === currentMonth && orderYear === currentYear;
    });

    const previousMonthOrders = orders.filter(function (order) {
      const orderDate = new Date(order.createdAt);
      const orderMonth = orderDate.getMonth() + 1;
      const orderYear = orderDate.getFullYear();
      return orderMonth === currentMonth - 1 && orderYear === currentYear;
    });

    const currentMonthRevenue = currentMonthOrders.reduce(function (
      total,
      order
    ) {
      return total + order.totalPrice;
    },
    0);

    const previousMonthRevenue = previousMonthOrders.reduce(function (
      total,
      order
    ) {
      return total + order.totalPrice;
    },
    0);

    const revenueComparison = currentMonthRevenue - previousMonthRevenue;
    let percentageChange = 0;
    if (previousMonthRevenue !== 0) {
      percentageChange = (
        (revenueComparison / previousMonthRevenue) *
        100
      ).toFixed(2);
    }

    let arrow = "";
    if (revenueComparison > 0) {
      arrow = "↑";
    } else if (revenueComparison < 0) {
      arrow = "↓";
    }

    const totalOrderAmountElement =
      document.getElementById("total-order-amount");
    totalOrderAmountElement.textContent = `Tổng tiền : ${currentMonthRevenue} VND`;

    const phantramElement = document.getElementById("phan-tram");
    phantramElement.textContent = ` ${arrow} ${percentageChange}% `;
  })
  .catch(function (error) {
    console.error("Lỗi khi tải dữ liệu từ API:", error);
  });
// Tổng users
axios
  .get(`${apiUrl}/users`)
  .then(function (response) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const users = response.data;

    const previousMonthCustomers = users.filter(function (user) {
      const userDate = new Date(user.createdAt);
      const userMonth = userDate.getMonth() + 1;
      const userYear = userDate.getFullYear();
      return (
        userMonth === currentMonth - 1 &&
        userYear === currentYear &&
        user.role === "customer"
      );
    });

    const currentMonthCustomers = users.filter(function (user) {
      const userDate = new Date(user.createdAt);
      const userMonth = userDate.getMonth() + 1;
      const userYear = userDate.getFullYear();
      return (
        userMonth === currentMonth &&
        userYear === currentYear &&
        user.role === "customer"
      );
    });

    const previousMonthCustomerCount = previousMonthCustomers.length;
    const currentMonthCustomerCount = currentMonthCustomers.length;

    const totalCustomerCountElement = document.getElementById(
      "total-customer-count"
    );
    const totalCustomerTextElement = document.createElement("span");
    totalCustomerTextElement.innerText = "Tổng người dùng : ";
    totalCustomerCountElement.appendChild(totalCustomerTextElement);

    const customerCountTextElement = document.createElement("span");
    customerCountTextElement.setAttribute("id", "customer-count-text");
    customerCountTextElement.innerText = currentMonthCustomerCount.toString();
    totalCustomerCountElement.appendChild(customerCountTextElement);

    const arrowElement = document.getElementById("customer-count-arrow");
    if (arrowElement) {
      const percentageChange =
        ((currentMonthCustomerCount - previousMonthCustomerCount) /
          previousMonthCustomerCount) *
        100;
      if (isFinite(percentageChange)) {
        arrowElement.innerHTML = `↑ ${percentageChange.toFixed(2)}%`;
      } else {
        arrowElement.innerHTML = `↑ 0%`;
      }
    }
  })
  .catch(function (error) {
    console.error("Lỗi khi tải dữ liệu từ API:", error);
  });

axios
  .get(`${apiUrl}/orders`)
  .then(function (response) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const orders = response.data;
    const currentMonthOrders = orders.filter(function (order) {
      const orderDate = new Date(order.createdAt);
      const orderMonth = orderDate.getMonth() + 1;
      const orderYear = orderDate.getFullYear();
      return orderMonth === currentMonth && orderYear === currentYear;
    });
    const previousMonthOrders = orders.filter(function (order) {
      const orderDate = new Date(order.createdAt);
      const orderMonth = orderDate.getMonth() + 1;
      const orderYear = orderDate.getFullYear();
      return orderMonth === currentMonth - 1 && orderYear === currentYear;
    });

    const currentMonthOrderCount = currentMonthOrders.length;
    const previousMonthOrderCount = previousMonthOrders.length;

    let percentageChange = 0;
    if (previousMonthOrderCount !== 0) {
      const orderCountComparison =
        currentMonthOrderCount - previousMonthOrderCount;
      percentageChange = (
        (orderCountComparison / previousMonthOrderCount) *
        100
      ).toFixed(2);
    }
    let arrow = "";
    if (currentMonthOrderCount > previousMonthOrderCount) {
      arrow = "↑";
    } else if (currentMonthOrderCount < previousMonthOrderCount) {
      arrow = "↓";
    }

    const totalOrderAmountElement =
      document.getElementById("total-order-count");
    totalOrderAmountElement.textContent = `Tổng đơn hàng: ${currentMonthOrderCount} `;

    const percentageChangeElement =
      document.getElementById("percentage-change");
    percentageChangeElement.textContent = ` ${arrow} ${percentageChange}% `;
  })
  .catch(function (error) {
    console.error("Lỗi khi tải dữ liệu từ API:", error);
  });

//products
axios
  .get(`${apiUrl}/products`)
  .then(function (response) {
    const products = response.data;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    // Calculate the previous month
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    // Filter products based on current month and year
    const currentMonthProducts = products.filter(function (product) {
      const productDate = new Date(product.createdAt);
      const productMonth = productDate.getMonth() + 1;
      const productYear = productDate.getFullYear();
      return productMonth === currentMonth && productYear === currentYear;
    });
    // Filter products based on previous month and year
    const previousMonthProducts = products.filter(function (product) {
      const productDate = new Date(product.createdAt);
      const productMonth = productDate.getMonth() + 1;
      const productYear = productDate.getFullYear();
      return productMonth === previousMonth && productYear === previousYear;
    });
    // Get the count of products
    const currentMonthProductCount = currentMonthProducts.length;
    const previousMonthProductCount = previousMonthProducts.length;
    // Calculate the percentage change
    const percentageChange =
      ((currentMonthProductCount - previousMonthProductCount) /
        previousMonthProductCount) *
      100;
    // Display the total product count
    const totalProductCountElement = document.getElementById(
      "total-product-count"
    );
    totalProductCountElement.textContent = `Tổng sản phẩm : ${currentMonthProductCount}`;
    // Display the percentage change and arrow
    const percentageChangeElement =
      document.getElementById("total-product-last");
    percentageChangeElement.textContent = `${percentageChange.toFixed(2)}%`;
    const arrowElement = document.createElement("span");
    arrowElement.classList.add("arrow");
    if (percentageChange > 0) {
      arrowElement.textContent = "↑";
      arrowElement.classList.add("up");
    } else if (percentageChange < 0) {
      arrowElement.textContent = "↓";
      arrowElement.classList.add("down");
    } else {
      arrowElement.textContent = "→";
      arrowElement.classList.add("right");
    }
    percentageChangeElement.insertAdjacentElement("afterbegin", arrowElement); // Chèn mũi tên vào phía trước phần trăm
  })
  .catch(function (error) {
    console.error("Lỗi khi tải dữ liệu từ API:", error);
  });

axios
  .get(`${apiUrl}/orders`)
  .then((response) => {
    const data = response.data;
    // Tạo một đối tượng để lưu trữ tổng đơn hàng trên từng ngày và từng tháng
    const dailyTotal = {};
    const monthlyTotal = {};
    // Lặp qua từng đơn hàng trong dữ liệu
    data.forEach((order) => {
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
    const ctx = document.getElementById("lineChart").getContext("2d");
    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Tổng tiền theo ngày",
            data: dataPoints,
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            borderColor: "rgba(0, 123, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value, index, values) {
                return value.toLocaleString() + " VND";
              },
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return (
                  context.dataset.label +
                  ": " +
                  context.parsed.y.toLocaleString() +
                  " VND"
                );
              },
            },
          },
        },
      },
    });
    // Lắng nghe sự kiện thay đổi lựa chọn
    const selectOption = document.getElementById("selectOption");
    selectOption.addEventListener("change", function () {
      const selectedOption = selectOption.value;
      // Xóa biểu đồ hiện tại
      myChart.destroy();
      // Chuẩn bị dữ liệu mới cho biểu đồ
      let newLabels, newDataPoints, label;
      if (selectedOption === "daily") {
        newLabels = labels;
        newDataPoints = dataPoints;
        label = "Tổng tiền theo ngày";
      } else if (selectedOption === "monthly") {
        // Chuẩn bị dữ liệu theo tháng
        newLabels = Object.keys(monthlyTotal);
        newDataPoints = Object.values(monthlyTotal);
        label = "Tổng tiền theo tháng";
      }
      // Vẽ biểu đồ mới
      myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: newLabels,
          datasets: [
            {
              label: label,
              data: newDataPoints,
              backgroundColor: "rgba(0, 123, 255, 0.2)",
              borderColor: "rgba(0, 123, 255, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value, index, values) {
                  return value.toLocaleString() + " VND";
                },
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  return (
                    context.dataset.label +
                    ": " +
                    context.parsed.y.toLocaleString() +
                    " VND"
                  );
                },
              },
            },
          },
        },
      });
    });
  })
  .catch((error) => {
    console.error("Lỗi khi tải dữ liệu đơn hàng:", error);
  });

// Sử dụng Axios để lấy dữ liệu từ API
axios
  .get(`${apiUrl}/products`)
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
    var ctx = document.getElementById("doughnut").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: productNames,
        datasets: [
          {
            data: productSold,
            backgroundColor: [
              "rgba(41, 155, 99, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(120, 46, 139, 1)",
              "rgba( 165, 42, 42, 1 )",
              // Thêm màu khác tương ứng với số lượng sản phẩm (nếu cần)
            ],
            borderColor: [
              "rgba(41, 155, 99, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(120, 46, 139, 1)",
              "rgba( 165, 42, 42, 1 )",
              // Thêm màu khác tương ứng với số lượng sản phẩm (nếu cần)
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  })
  .catch(function (error) {
    console.error("Lỗi khi tải dữ liệu từ máy chủ:", error);
  });

// // Toggle Sidenav
const iconNavbarSidenav = document.getElementById("iconNavbarSidenav");
const iconSidenav = document.getElementById("iconSidenav");
const sidenav = document.getElementById("sidenav-main");
let body = document.getElementsByTagName("body")[0];
let className = "g-sidenav-pinned";

if (iconNavbarSidenav) {
  iconNavbarSidenav.addEventListener("click", toggleSidenav);
}

if (iconSidenav) {
  iconSidenav.addEventListener("click", toggleSidenav);
}

function toggleSidenav() {
  if (body.classList.contains(className)) {
    body.classList.remove(className);
    setTimeout(function () {
      sidenav.classList.remove("bg-white");
    }, 100);
    sidenav.classList.remove("bg-transparent");
  } else {
    body.classList.add(className);
    sidenav.classList.add("bg-white");
    sidenav.classList.remove("bg-transparent");
    iconSidenav.classList.remove("d-none");
  }
}

