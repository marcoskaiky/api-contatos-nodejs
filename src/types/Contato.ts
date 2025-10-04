export interface Contato {
  id?: number;
  nome: string;
  telefone: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateContatoRequest {
  nome: string;
  telefone: string;
}

export interface UpdateContatoRequest {
  nome?: string;
  telefone?: string;
}
