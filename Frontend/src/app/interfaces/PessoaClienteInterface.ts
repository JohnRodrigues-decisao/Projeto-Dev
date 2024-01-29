export interface PessoaClienteInterface {
    id_pessoa: string;
    nome: string;
    identificacao: string;
    nome_fantasia: string;
    nome_mae: string;
    inscricao_municipal: string;
    inscricao_estadual: string;
    cliente: {
      id_cliente: string;
      data_cadastro: string;
      situacao: string;
      id_pessoa: string;
    } | null;
  }