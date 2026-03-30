import { useState } from 'react';
import { Formulario } from './components/Formulario';
import { Lista } from './components/Lista';
import type { IEstudoDiario } from './@types/tarefa';

function App() {
  const [key, setKey] = useState(0);
  const [itemParaEditar, setItemParaEditar] = useState<IEstudoDiario | null>(null);

  const recarregar = () => {
    setKey(prev => prev + 1);
    setItemParaEditar(null); // Limpa a edição após salvar
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <Formulario aoSalvar={recarregar} dadosIniciais={itemParaEditar} />
      <Lista key={key} aoEditar={setItemParaEditar} />
    </div>
  );
}

export default App;