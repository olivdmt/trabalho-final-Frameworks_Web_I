# 🔴 PokéUniverse - Trabalho Final: Frameworks Web I

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![PokéAPI](https://img.shields.io/badge/PokéAPI-EF5350?style=for-the-badge&logo=pokemon&logoColor=white)

Aplicação web interativa, dinâmica e responsiva desenvolvida em **React com Vite** como trabalho de conclusão da disciplina **Frameworks Web I** no **Centro Universitário de Lavras (Unilavras)**, ministrada pelo professor **João Marcelo de Almeida Garcia**.

---

## 👥 Integrantes da Equipe

- *Mateus Dayson de Oliveira / 0031595*



---

## 🚀 Sobre o Projeto

O **PokéUniverse** é uma Pokédex moderna de última geração que consome a [PokéAPI](https://pokeapi.co/). O projeto foi estruturado com foco em boas práticas de componentização, reutilização de código com props, gerenciamento de estado assíncrono via Hooks (`useState`, `useEffect`), roteamento dinâmico com `react-router-dom` e consumo de dados através de requisições HTTP com `axios`.

### ✨ Funcionalidades Principais

- **Listagem Paginada Dinâmica:** Carregamento otimizado de 24 Pokémons por página com paginação numérica e controles de salto.
- **Busca em Tempo Real (Debounced):** Campo de busca responsivo que filtra por nome ou número (#ID) em tempo real sem sobrecarregar a API.
- **Filtros Combináveis:** Filtragem por tipos elementais (Fogo, Água, Planta, Elétrico, etc.) e múltiplos critérios de ordenação (Menor #ID, Maior #ID, Nome A-Z, Nome Z-A).
- **Página de Detalhes Dinâmica (`/pokemon/:id`):** 
  - Exibição de estatísticas base com barras visuais e pontuação total.
  - Informações de altura, peso, experiência base, habitat e taxa de captura.
  - Reprodução do som oficial (*Cry*) do Pokémon.
  - Alternador de versão normal e versão *Shiny*.
  - Navegação direta para o Pokémon anterior e próximo.
- **Sistema de Favoritos (Persistência Local):** Adição e remoção de Pokémons favoritos armazenados no `localStorage` com efeitos visuais interativos.
- **Modo Claro / Escuro (Dark & Light Mode):** Alternador de tema com persistência das preferências do usuário.
- **Feedback Visual & UX:**
  - Shimmer Loading Skeletons durante requisições.
  - Tratamento e feedback amigável de erros da API com botão de repetição (*Retry*).
  - Design 100% responsivo para smartphones, tablets e desktops.

---

## 🛠️ Tecnologias Utilizadas

- **[React.js](https://react.dev/):** Biblioteca para construção de interfaces de usuário reativas.
- **[Vite](https://vitejs.dev/):** Build tool ultrarrápido para desenvolvimento frontend moderno.
- **[Axios](https://axios-http.com/):** Cliente HTTP baseado em Promises para integração com a PokéAPI.
- **[React Router DOM](https://reactrouter.com/):** Gerenciamento de rotas e navegação declarativa entre páginas.
- **[Lucide React](https://lucide.dev/):** Conjunto consistente de ícones modernos em SVG.
- **[Canvas Confetti](https://www.npmjs.com/package/canvas-confetti):** Animações de celebração ao favoritar monstrinhos.
- **CSS3 Moderno:** Variáveis CSS customizadas, animações fluidas, Flexbox e CSS Grid.

---

## 📁 Estrutura de Pastas

```
trabalho-final-Frameworks_Web_I/
├── public/
│   └── favicon.svg              # Ícone Pokéball personalizado
├── src/
│   ├── assets/                  # Imagens e recursos estáticos
│   ├── components/              # Componentes reutilizáveis
│   │   ├── AudioCry.jsx         # Player de áudio oficial dos Pokémons
│   │   ├── ErrorState.jsx       # Componente de tratamento amigável de erro
│   │   ├── FilterBar.jsx        # Barra de filtros combinados e ordenação
│   │   ├── Footer.jsx           # Rodapé da aplicação
│   │   ├── LoadingSkeleton.jsx  # Esqueletos animados de carregamento
│   │   ├── Navbar.jsx           # Barra de navegação com contador e tema
│   │   ├── Pagination.jsx       # Navegação paginada com botões e números
│   │   ├── PokemonCard.jsx      # Card individual com sprites e favoritos
│   │   ├── SearchBar.jsx        # Campo de busca em tempo real com debounce
│   │   ├── StatBar.jsx          # Barra visual de status
│   │   └── TypeBadge.jsx        # Badges coloridas de tipos elementais
│   ├── context/
│   │   └── ThemeContext.jsx     # Contexto e Hook para tema Claro / Escuro
│   ├── hooks/
│   │   ├── useDebounce.js       # Hook para otimização de busca em tempo real
│   │   └── useFavorites.js      # Hook para controle de favoritos com localStorage
│   ├── pages/
│   │   ├── Favorites.jsx        # Página de exibição dos Pokémons favoritados
│   │   ├── Home.jsx             # Página inicial com listagem, busca e filtros
│   │   ├── NotFound.jsx         # Página 404 customizada
│   │   └── PokemonDetails.jsx   # Página de detalhes com abas e estatísticas
│   ├── services/
│   │   └── api.js               # Instância Axios e funções de consumo da PokéAPI
│   ├── styles/                  # Estilos globais e temas
│   ├── App.css                  # Folha de estilos completa e responsiva
│   ├── App.jsx                  # Declaração de rotas e provedores
│   ├── index.css                # Variáveis CSS e reset global
│   └── main.jsx                 # Ponto de entrada do React
├── index.html
├── package.json
└── vite.config.js
```

---

## 💻 Como Executar o Projeto Localmente

### Pré-requisitos
- Ter o **Node.js** instalado na máquina (versão 18 ou superior recomendada).
- Gerenciador de pacotes **npm** ou **yarn**.

### Passo a Passo

1. **Clone ou baixe o repositório:**
   ```bash
   git clone https://github.com/olivdmt/trabalho-final-Frameworks_Web_I.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd trabalho-final-Frameworks_Web_I
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Abra no navegador:**
   - Acesse o link exibido no terminal (geralmente `http://localhost:5173`).

### Como Gerar a Build de Produção
```bash
npm run build
```
Para visualizar a versão compilada de produção:
```bash
npm run preview
```

---
