export class Estado {
  codigo?: number;
  nome?: string;
}

export class Cidade {
  codigo?: number;
  nome?: string;
  estado = new Estado();
}

export class Endereco {
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  estado?: string;
}

export class Contato {
  codigo?: number;
  nome?: string;
  email?: string;
  telefone?: string;

  constructor(codigo?: number,
    nome?: string,
    email?: string,
    telefone?: string) {
    this.codigo = codigo;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }
}

export class Pessoa {
  codigo?: number;
  nome?: string;
  endereco = new Endereco();
  ativo = true;
  contatos = new Array<Contato>();
}

export class Categoria {
  codigo?: number;
  nome?: string;
}

export class Lancamento {
  codigo?: number;
  tipo = 'RECEITA';
  descricao?: string;
  dataVencimento?: Date;
  dataPagamento?: Date;
  valor?: number;
  observacao?: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
  anexo?: string;
  urlAnexo?: string;
}


export class Usuario {
  id?: number;
  nome?: string;
  dataNascimento?: Date;
  cpf?: string;
  telefone?: string;
  endereco = new Endereco();
  perfil = new Perfil();
  email?: string;
  senha?: string;
  tipoServicos = new Array<TipoServico>();
  tipoServicosConcatenados?: string;
}

export class Perfil {
  id?: number;
  nome?: string;
}

export enum PerfilEnum {
  'Administrador' = 1,
  'Cliente' = 2,
  'Prestador de Serviços' = 3
}

export class TipoServico {
  id?: number;
  nome?: string;
  selecionado?: boolean;
}

export class Agenda {
  id?: number;
  dataServico: Date = new Date();
  dataServicoFim: Date = new Date();
  tipoServico = new TipoServico();
  valorServico?: number;
  valorServicoFormatado?: String;
  cliente = new Usuario();
  prestadorServico = new Usuario();
  horarioServico?: string;
  horarioServicoFim?: string;
  dataServicoFormatada?: string;
  dataInicioServicoFormatada?: string;
  dataFimServicoFormatada?: string;
}



