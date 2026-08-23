const usersData = require('../data/users');

const listarUsuarios = (req, res) => {
  try {
    const usuarios = usersData.listarTodos();
    res.status(200).json({
      status: 'success',
      code: 200,
      total: usuarios.length,
      dados: usuarios
    });
  } catch (err) {
    console.error('[ERRO listarUsuarios]', err);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Erro ao listar usuários'
    });
  }
};

const buscarUsuarioPorId = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      code: 200,
      dados: req.usuario
    });
  } catch (err) {
    console.error('[ERRO buscarUsuarioPorId]', err);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Erro ao buscar usuário'
    });
  }
};

const criarUsuario = (req, res) => {
  try {
    const novoUsuario = usersData.criar(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Usuário criado com sucesso',
      dados: novoUsuario
    });
  } catch (err) {
    console.error('[ERRO criarUsuario]', err);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Erro ao criar usuário'
    });
  }
};

const atualizarUsuario = (req, res) => {
  try {
    const { id } = req.params;
    const atualizado = usersData.atualizar(id, req.body);
    if (!atualizado) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Usuário não encontrado'
      });
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Usuário atualizado com sucesso',
      dados: atualizado
    });
  } catch (err) {
    console.error('[ERRO atualizarUsuario]', err);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Erro ao atualizar usuário'
    });
  }
};

const atualizarUsuarioParcial = (req, res) => {
  atualizarUsuario(req, res);
};

const removerUsuario = (req, res) => {
  try {
    const { id } = req.params;
    const removido = usersData.remover(id);
    if (!removido) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Usuário não encontrado'
      });
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Usuário removido com sucesso',
      idRemovido: id
    });
  } catch (err) {
    console.error('[ERRO removerUsuario]', err);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Erro ao remover usuário'
    });
  }
};

module.exports = {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  atualizarUsuarioParcial,
  removerUsuario
};
