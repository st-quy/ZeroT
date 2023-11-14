const sortContainer = document.querySelector(".sort-container div");
const chooseSort = document.querySelector(".choose-sort");
sortContainer.addEventListener("click", () => {
  chooseSort.classList.toggle("show");
});
