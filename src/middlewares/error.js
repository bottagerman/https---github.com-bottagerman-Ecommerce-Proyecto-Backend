import EErros from "../service/error/enums.js";

export default (error, req, res, next) => {
  switch (error.code) {
    case EErros.ROUTING_ERROR:
      res
        .status(404)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;

    case EErros.INVALID_TYPES_ERROR:
      res
        .status(400)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;

    case EErros.DATABASES_READ_ERROR:
      res
        .status(500)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;

    case EErros.DATABASES_CONNECTION_ERROR:
      res
        .status(500)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;
    case EErros.DATABASES_LIMIT:
      res
        .status(500)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;

    default:
      res.status(500).send({ status: "error", error: "Unexpected error" });
      break;
  }
};
