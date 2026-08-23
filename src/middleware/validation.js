const usersData = require('../data/users');

const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validarCamposObrigatoriosCriacao = (req, res, next) => {
  const { nome, email, idade } = req.body;
  const erros = [];

  if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
    erros.push('Campo "nome" é obrigatório e deve ser um texto não vazio');
  } else if (nome.trim().length < 2) {
    erros.push('Campo "nome" deve ter pelo menos 2 caracteres');
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    erros.push('Campo "email" é obrigatório e deve ser um texto não vazio');
  } else if (!validarEmail(email)) {
    erros.push('Campo "email" deve conter um endereço de e-mail válido');
  }

  if (idade !== undefined && idade !== null) {
    if (typeof idade !== 'number' || !Number.isInteger(idade)) {
      erros.push('Campo "idade" deve ser um número inteiro');
    } else if (idade < 0 || idade > 150) {
      erros.push('Campo "idade" deve estar entre 0 e 150');
    }
  }

  if (erros.length > 0) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Dados de entrada inválidos',
      erros
    });
  }

  next();
};

const validarEmailUnicoCriacao = (req, res, next) => {
  const { email } = req.body;
  const existente = usersData.buscarPorEmail(email);
  if (existente) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Conflito de dados',
      detalhe: 'Já existe um usuário cadastrado com este e-mail'
    });
  }
  next();
};

const validarCamposAtualizacao = (req, res, next) => {
  const { nome, email, idade, cargo } = req.body;
  const erros = [];

  const temCampo = nome !== undefined || email !== undefined || idade !== undefined || cargo !== undefined;
  if (!temCampo) {
    erros.push('Pelo menos um campo deve ser informado para atualização');
  }

  if (nome !== undefined) {
    if (typeof nome !== 'string' || nome.trim().length === 0) {
      erros.push('Campo "nome" deve ser um texto não vazio');
    } else if (nome.trim().length < 2) {
      erros.push('Campo "nome" deve ter pelo menos 2 caracteres');
    }
  }

  if (email !== undefined) {
    if (typeof email !== 'string' || email.trim().length === 0) {
      erros.push('Campo "email" deve ser um texto não vazio');
    } else if (!validarEmail(email)) {
      erros.push('Campo "email" deve conter um endereço de e-mail válido');
    }
  }

  if (idade !== undefined && idade !== null) {
    if (typeof idade !== 'number' || !Number.isInteger(idade)) {
      erros.push('Campo "idade" deve ser um número inteiro');
    } else if (idade < 0 || idade > 150) {
      erros.push('Campo "idade" deve estar entre 0 e 150');
    }
  }

  if (cargo !== undefined && cargo !== null) {
    if (typeof cargo !== 'string') {
      erros.push('Campo "cargo" deve ser um texto');
    }
  }

  if (erros.length > 0) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Dados de entrada inválidos',
      erros
    });
  }

  next();
};

const validarEmailUnicoAtualizacao = (req, res, next) => {
  const { email } = req.body;
  const { id } = req.params;
  if (email === undefined) return next();

  const existente = usersData.buscarPorEmail(email);
  if (existente && existente.id !== id) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Conflito de dados',
      detalhe: 'Já existe um usuário cadastrado com este e-mail'
    });
  }
  next();
};

const validarUsuarioExiste = (req, res, next) => {
  const { id } = req.params;
  const usuario = usersData.buscarPorId(id);
  if (!usuario) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Usuário não encontrado',
      detalhe: `Nenhum usuário encontrado com o ID: ${id}`
    });
  }
  req.usuario = usuario;
  next();
};

module.exports = {
  validarCamposObrigatoriosCriacao,
  validarEmailUnicoCriacao,
  validarCamposAtualizacao,
  validarEmailUnicoAtualizacao,
  validarUsuarioExiste
};
