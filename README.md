#  Rotina Organizada - Checklist de Estudos

Este projeto nasceu de uma dor real: a dificuldade de priorizar tarefas acadêmicas em uma rotina de jornada dupla (trabalho e faculdade).
O Checklist Inteligente de Estudos é uma aplicação que não apenas organiza tarefas, mas ajuda o usuário a identificar automaticamente o que é mais urgente, com base nos prazos.

##  Mini PRD (Product Requirements Document)

### 1. O Problema
Estudantes que trabalham durante o dia e estudam à noite enfrentam exaustão e dificuldade em identificar quais tarefas são mais urgentes. Isso gera desorganização e risco de perder prazos importantes.

### 2. Soluções
Uma aplicação de checklist com priorização automática baseada no prazo de entrega.

Diferencial:
O sistema analisa a data de vencimento e destaca visualmente (em vermelho) tarefas que vencem em menos de 2 dias, ajudando na tomada de decisão rápida.

### 3. Decisões Técnicas
- **React + TypeScript:** Tipagem real para evitar erros em tempo de execução.
- **CSS Modules:** Estilização organizada e isolada por componente.
- **Hooks Avançados:** Uso de `useRef` para controle de foco e `useEffect` para ciclo de vida.
- **JSON Server:** Simulação de banco de dados para o CRUD completo.

## Funcionalidades
Criar tarefas com:
Título
Data de entrega
Instituição/Contexto
Anotações adicionais
Listar tarefas ordenadas por data de vencimento
Editar tarefas existentes
Excluir tarefas
Destaque visual automático para tarefas urgentes
Feedback de carregamento (loading)
Mensagem quando não há tarefas cadastradas

##  Tecnologias Utilizadas
- React
- TypeScript
- Vite
- Axios (Consumo de API)
- CSS Modules
-JSON Server
-Hooks React:
useEffect: sincronização com a API
useMemo: ordenação eficiente das tarefas por prazo
useRef: foco automático no input para melhor UX

##  Como rodar o projeto


 **Clonar o repositório:**
   ```bash
   git clone 

   
   Instalar as Dependências
   npm install

   Iniciar a API (JSON Server)
   npx json-server --watch db.json --port 3000

   Iniciar o front-end
   npm run dev
