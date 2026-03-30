export interface IEstudoDiario {
  id: string;
  titulo: string;
  dataVencimento: string;
  categoria: string; // Agora aceita qualquer texto!
  prioridade: 'Alta' | 'Média' | 'Baixa';
  status: 'Pendente' | 'Em Andamento' | 'Concluido';
  anotacoes: string;
}