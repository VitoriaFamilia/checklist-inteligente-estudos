import { useState, useRef, useEffect } from 'react';
import type { IEstudoDiario } from '../@types/tarefa';
import { api } from '../services/api';
import styles from './Formulario.module.css';

interface FormProps {
  aoSalvar: () => void;
  dadosIniciais?: IEstudoDiario | null;
}

export function Formulario({ aoSalvar, dadosIniciais }: FormProps) {
  const tituloInputRef = useRef<HTMLInputElement>(null);

  const [estudoDiario, setEstudoDiario] = useState<Omit<IEstudoDiario, 'id'> & { id?: string }>({
    titulo: '',
    dataVencimento: '',
    categoria: '',
    prioridade: 'Média', // Valor padrão interno
    status: 'Pendente',
    anotacoes: ''
  });

  useEffect(() => {
    if (dadosIniciais) {
      setEstudoDiario(dadosIniciais);
      tituloInputRef.current?.focus();
    }
  }, [dadosIniciais]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEstudoDiario(prev => ({ ...prev, [name]: value }));
  };

  const handleLimparFormulario = () => {
    setEstudoDiario({
      titulo: '',
      dataVencimento: '',
      categoria: '',
      prioridade: 'Média',
      status: 'Pendente',
      anotacoes: ''
    });
    if (!estudoDiario.id) tituloInputRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!estudoDiario.titulo.trim() || !estudoDiario.dataVencimento || !estudoDiario.categoria.trim()) {
      alert("Por favor, preencha o título, a data e a instituição.");
      return;
    }

    try {
      if (estudoDiario.id) {
        await api.put(`/estudos/${estudoDiario.id}`, estudoDiario);
        alert("Alteração salva com sucesso!");
      } else {
        await api.post('/estudos', estudoDiario);
        alert("Tarefa agendada com sucesso!");
      }
      
      aoSalvar(); 
      handleLimparFormulario();
    } catch (error) {
      alert("Erro ao processar no servidor.");
    }
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.header}>
          {estudoDiario.id ? 'EDITAR COMPROMISSO'  
          : 'CHECKLIST  INTELIGENTE DE  ESTUDOS '} 
        </h1>

        <div className={styles.inputGroup}>
          <label>Título do Evento:</label>
          <input name="titulo" type="text" ref={tituloInputRef} value={estudoDiario.titulo} onChange={handleChange} className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label>Data de Entrega:</label>
          <input name="dataVencimento" type="date" value={estudoDiario.dataVencimento} onChange={handleChange} className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <label>Instituição / Contexto:</label>
          <input name="categoria" type="text" value={estudoDiario.categoria} onChange={handleChange} className={styles.input} />
        </div>

        {/* Novo campo de Anotações substituindo a Prioridade */}
        <div className={styles.inputGroup}>
          <label>Anotações Adicionais:</label>
          <textarea 
            name="anotacoes" 
            value={estudoDiario.anotacoes} 
            onChange={handleChange} 
            className={styles.textarea} // Certifique-se de ter esse estilo no CSS
            placeholder="Detalhes sobre a entrega..."
            rows={3}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.btnSave}>
            {estudoDiario.id ? 'SALVAR ALTERAÇÕES' : 'AGENDAR PRAZO'}
          </button>
          <button type="button" onClick={handleLimparFormulario} className={styles.btnClear}>Limpar</button>
        </div>
      </form>
    </main>
  );
}