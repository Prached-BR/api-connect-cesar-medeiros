const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {
  validarCamposObrigatoriosCriacao,
  validarEmailUnicoCriacao,
  validarCamposAtualizacao,
  validarEmailUnicoAtualizacao,
  validarUsuarioExiste
} = require('../middleware/validation');

router.get('/', userController.listarUsuarios);

router.get('/:id', validarUsuarioExiste, userController.buscarUsuarioPorId);

router.post(
  '/',
  validarCamposObrigatoriosCriacao,
  validarEmailUnicoCriacao,
  userController.criarUsuario
);

router.put(
  '/:id',
  validarUsuarioExiste,
  validarCamposObrigatoriosCriacao,
  validarEmailUnicoAtualizacao,
  userController.atualizarUsuario
);

router.patch(
  '/:id',
  validarUsuarioExiste,
  validarCamposAtualizacao,
  validarEmailUnicoAtualizacao,
  userController.atualizarUsuarioParcial
);

router.delete('/:id', validarUsuarioExiste, userController.removerUsuario);

module.exports = router;
