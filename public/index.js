const socket = io();

socket.on("products", (products) => {
  let productsIrl = document.getElementById("productsUl");
  productsIrl.innerHTML = "";

  products.forEach((element) => {
    productsIrl.innerHTML += `<div style="width: 250px; padding: 15px; border: solid 3px; margin: 15px;">
    <p>${element.title}</p>
    <p>${element.description}</p>
    <p>${element.price}</p>
    </div>`;
  });
});
 // FORM FOR ADD IRL PRODUCT
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const inputs = form.querySelectorAll("input[type='text']");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  inputs.forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        socket.emit("addProduct", data);
        form.reset();
      }
    });
  });
});
