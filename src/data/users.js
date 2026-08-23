const { v4: uuidv4 } = require('uuid');

let usuarios = [
  {
    id: uuidv4(),
    nome: 'João Silva',
    email: 'joao.silva@exemplo.com',
    idade: 28,
    cargo: 'Desenvolvedor Front-end',
    criadoEm: new Date('2026-01-15T10:30:00Z').toISOString(),
    atualizadoEm: new Date('2026-01-15T10:30:00Z').toISOString()
  },
  {
    id: uuidv4(),
    nome: 'Maria Souza',
    email: 'maria.souza@exemplo.com',
    idade: 34,
    cargo: 'Product Manager',
    criadoEm: new Date('2026-02-03T14:20:00Z').toISOString(),
    atualizadoEm: new Date('2026-02-10T09:15:00Z').toISOString()
  },
  {
    id: uuidv4(),
    nome: 'Pedro Santos',
    email: 'pedro.santos@exemplo.com',
    idade: 25,
    cargo: 'Desenvolvedor Back-end',
    criadoEm: new Date('2026-03-20T08:00:00Z').toISOString(),
    atualizadoEm: new Date('2026-03-20T08:00:00Z').toISOString()
  }
];

const listarTodos = () => {
  return [...usuarios];
};

const buscarPorId = (id) => {
  return usuarios.find(u => u.id === id) || null;
};

const buscarPorEmail = (email) => {
  return usuarios.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
};

const criar = (dados) => {
  const agora = new Date().toISOString();
  const novoUsuario = {
    id: uuidv4(),
    nome: dados.nome.trim(),
    email: dados.email.trim().toLowerCase(),
    idade: dados.idade,
    cargo: dados.cargo ? dados.cargo.trim() : null,
    criadoEm: agora,
    atualizadoEm: agora
  };
  usuarios.push(novoUsuario);
  return novoUsuario;
};

const atualizar = (id, dados) => {
  const indice = usuarios.findIndex(u => u.id === id);
  if (indice === -1) return null;

  const existente = usuarios[indice];
  const atualizado = {
    ...existente,
    nome: dados.nome !== undefined ? dados.nome.trim() : existente.nome,
    email: dados.email !== undefined ? dados.email.trim().toLowerCase() : existente.email,
    idade: dados.idade !== undefined ? dados.idade : existente.idade,
    cargo: dados.cargo !== undefined ? (dados.cargo ? dados.cargo.trim() : null) : existente.cargo,
    atualizadoEm: new Date().toISOString()
  };
  usuarios[indice] = atualizado;
  return atualizado;
};

const remover = (id) => {
  const indice = usuarios.findIndex(u => u.id === id);
  if (indice === -1) return false;
  usuarios.splice(indice, 1);
  return true;
};

module.exports = {
  listarTodos,
  buscarPorId,
  buscarPorEmail,
  criar,
  atualizar,
  remover
};
