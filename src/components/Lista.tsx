import { useEffect, useState, useMemo } from 'react';
import { api } from '../services/api';
import type { IEstudoDiario } from '../@types/tarefa';
import styles from './Lista.module.css';

interface ListaProps {
  aoEditar: (item: IEstudoDiario) => void;
}

export function Lista({ aoEditar }: ListaProps) {
  const [estudos, setEstudos] = useState<IEstudoDiario[]>([]);
  
  // 1. Criamos o estado de Loading começando como 'true'
  const [loading, setLoading] = useState(true);

  const carregarDados = async () => {
    try {
      setLoading(true); // Inicia o carregamento
      const response = await api.get('/tarefas');
      setEstudos(response.data);
    } catch (error) {
      console.error("Erro ao carregar dados do servidor.");
    } finally {
      // 2. O 'finally' garante que o loading pare, dando certo ou errado
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const estudosOrdenados = useMemo(() => {
    return [...estudos].sort((a, b) => 
      new Date(a.dataVencimento).getTime() - new Date(b.dataVencimento).getTime()
    );
  }, [estudos]);

  const handleExcluir = async (id: string) => {
    if (confirm("Deseja excluir este compromisso?")) {
      try {
        await api.delete(`/tarefas/${id}`);
        setEstudos(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        alert("Erro ao excluir o item.");
      }
    }
  };

  const handleToggleStatus = async (item: IEstudoDiario) => {
    const novoStatus = item.status === 'Concluido' ? 'Pendente' : 'Concluido';
    try {
      await api.patch(`/tarefas/${item.id}`, { status: novoStatus });
      carregarDados();
    } catch (error) {
      console.error("Erro ao atualizar status.");
    }
  };

  // 3. SE ESTIVER CARREGANDO, MOSTRA ESTA MENSAGEM:
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>Carregando prazos...</p>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.tituloSecao}>PRAZOS DA SEMANA</h2>
      <div className={styles.grid}>
        {estudosOrdenados.map(item => {
          const hoje = new Date();
          const vencimento = new Date(item.dataVencimento + 'T12:00:00');
          const diff = Math.ceil((vencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
          const ehUrgente = diff <= 2 && item.status !== 'Concluido';

          return (
            <div key={item.id} className={`${styles.card} ${ehUrgente ? styles.urgente : ''}`}>
              <small className={styles.categoriaCard}>{item.categoria || 'Geral'}</small>
              <h3 className={item.status === 'Concluido' ? styles.concluido : ''}>
                {item.titulo}
              </h3>
              <p>Vence em: <strong>{vencimento.toLocaleDateString('pt-BR')}</strong></p>

              {item.anotacoes && (
                <div className={styles.anotacoesContainer}>
                  <p className={styles.labelAnotacao}>Obs:</p>
                  <p className={styles.textoAnotacao}>{item.anotacoes}</p>
                </div>
              )}
              
              <div className={styles.actions}>
                <button className={styles.btnAction} onClick={() => handleToggleStatus(item)}>
                  {item.status === 'Concluido' ? 'Desfazer' : 'Concluir'}
                </button>
                <button className={styles.btnAction} onClick={() => aoEditar(item)}>
                  Editar
                </button>
                <button className={styles.btnDeleteAction} onClick={() => handleExcluir(item.id)}>
                  Excluir
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* 4. MENSAGEM DE LISTA VAZIA */}
      {estudos.length === 0 && (
        <p className={styles.vazio}>Nenhum prazo encontrado no sistema.</p>
      )}
    </section>
  );
}