const socket = io();

const productsIrl = document.createElement("ul");

socket.on("products", (products) => {
  productsIrl.innerHTML = "";

  products.forEach((element) => {
    productsIrl.innerHTML += `<li>
    <h3>${element.title}</h3>
    <p>${element.description}</p>
    <p>price:${element.price}</p>
    <p>stock:${element.stock}</p>
    </li>`;
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

socket.on("products", (products) => {
  const productsUl = document.getElementById("productsUl");
  productsUl.innerHTML = products.map(product => `
    <li>
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p>price:${product.price}</p>
      <p>stock:${product.stock}</p>
    </li>`).join("");
});
