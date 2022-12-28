const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O Título É obrigatório")
      .isString()
      .withMessage("O Título É obrigatório")
      .isLength({ min: 3 })
      .withMessage("O Título Precisa Terno Mínimo 3 caracteres"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O Título é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O Título Precisa Terno Mínimo 3 caracteres"),
  ];
};

const commentValidation = () => {
  return [body("comment").isString().withMessage("O Comentário é obrigatório")];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
};
