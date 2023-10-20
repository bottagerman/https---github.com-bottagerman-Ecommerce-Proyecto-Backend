# Bienvenido a GB Signature guitar shop! 

Se trata de un ecommerce que consta de un servidor de express con mongo, js y manejando las vistas con handlebars.

Un ruteo completo basado en 5 capas (router, controller, service, mongo y model).

Utilizacion de `middlewares`, `variables de entorno`, `supertest` (a medias) y `documentacion` (tambien incompleta).

## RENDER (deploy del proyecto)

Aca dejo el link del servidor desplegado: [https://ecommerce-final-german-botta.onrender.com/]

## ¿De que se trata? 

Es un ecommerce donde se venden guitarras y bajos signatures, en cuanto a la experiencia dentro de la pagina, se debe logear (puede usar github), que lo mandara directamente al `/profile`, ahi encontrara una breve descripcion en ingles de lo que es la pagina y tres botones: `products`,`cart`,`logout`. entrando a products esta toda la lista de los instrumentos que se pueden comprar (existe un error a la hora de seleccionar el stock), y cuando lo agregan al carrito lo envia directamente a la pagina del carrito que puede volver a productos si desea seguir comprando. Dentro del carrito existe el boton `go to ticket` que directamente finaliza la compra generando un ticket de pago. Una vez generado se envia un mail a la direccion del usuario con el detalle del ticket. 

Ademas existe un apartado solo para el admin que permite crear productos.

## Los problemas

En cuanto a los problemas hay varias cuestiones que no pude resolver por cuestiones de tiempo, eliminar productos del carrito, o cambiar a usuario premium son cosas que me quedaron pendientes (entre otras).

## Conclusion

Una linda pagina, un proyecto que estuve a punto de abandonar. Muy contento de haber llegado a este punto teniendo en cuenta que arranque en este mundo hace poco mas de un año metiendome de lleno en algo que no tenia ni la mas palida idea. Con el tiempo fui entrando en confianza y superarme cada dia un poco mas me llena de orgullo. Es un camino que recien empieza! 
Una experiencia gratificante, gracias a los tutores y al profesor que fue el mejor que tuve en toda la carrera! (Aguante river)
