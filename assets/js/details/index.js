modalBtn = document.querySelector("#btnShowModal");
cancelBtn = document.querySelector("#cancel-btn");

modalBtn.addEventListener('click', function (){
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
})

cancelBtn.addEventListener('click', function (){
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.hide();
})