const apiUrl =
  window.location.hostname === "localhost" || "127.0.0.1"
    ? "http://localhost:4000"
    : "https://api-zerot-lowdb.onrender.com";

axios
  .get(`${apiUrl}/users`)
  .then(function (response) {
  const users = response.data;

  users.forEach(function (user) {
    const addd = document.createElement("tr");
    addd.innerHTML = `
                      <td class="table-profile">
                          <span class="username-1"
                            >${user.name}</span
                          >
                      </td>`;
    tbody.appendChild(addd);
  });
});
