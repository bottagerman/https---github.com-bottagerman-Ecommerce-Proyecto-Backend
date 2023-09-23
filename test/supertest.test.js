import chai from "chai";
import supertest from "supertest";
import { loggerDev } from "../src/utils/logger.js";

//chai
const expect = chai.expect;

//supertest
const requester = supertest("http://localhost:8080");

// describe("Testing API Products", () => {
//   //ENDPOINT API PRODUCTS
//   let productId;
//   describe("Test products", () => {
//     it("Hace un POST en el endpoint api/products debe crear un producto", async () => {
//       const testProduct = {
//         name: "Fender Testcaster",
//         description: "Fender White Testcaster Hendrix Signature",
//         price: 10000,
//         stock: 13,
//         thumbnails: "no image",
//         status: true,
//         code: Math.floor(Math.random() * 9000) + 1000,
//         category: "electric guitar",
//       };
//       const response = await requester.post("/api/products").send(testProduct);
//       const { status, ok, _body } = response;
//       productId = _body.data._id;

//       // loggerDev.info(productId);

//       expect(status).to.equal(201);
//       expect(_body.data).to.have.property("_id");
//     });
//     it("Hace un GET en el endpoint api/products debe devolver todos los productos", async () => {
//       const getTestProduct = [];

//       const response = await requester
//         .get("/api/products")
//         .send(getTestProduct);
//       const { status, ok, _body } = response;
//       loggerDev.info(_body);
//       expect(status).to.equal(200);
//     });
//     it("Hace un DELETE para eliminar un producto", async () => {
//       const response = await requester.delete(`/api/products/${productId}`);
//       const { status, ok, _body } = response;

//       loggerDev.info(productId);

//       expect(status).to.equal(200);
//       expect(_body).to.be.ok;
//     });
//   });
// });
describe("Testing API Carts", () => {
  //ENDPOINT API CARTS
  let cartId;
  describe("Test carts", () => {
    it("Hace un POST en el endpoint api/carts debe crear un carrito", async () => {
      const response = await requester.post("/views/carts")
      const { status, ok, _body } = response;
      //cartId = _body._id

      loggerDev.info(_body);

      expect(status).to.equal(200);
      expect(_body).to.have.property("_id");
    });
    // it("Hace un GET para buscar el cart creado", async () => {
    //   const response = await requester.get(`/views/carts/${cartId}`);
    //   const { status, ok, _body } = response;

    //   expect(status).to.equal(200);
    //   expect(_body).to.be.ok;
    // });
  });
});
