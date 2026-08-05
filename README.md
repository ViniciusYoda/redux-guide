# Redux Shopping

Aplicação demonstrativa de uma loja de roupas, criada para apresentar o gerenciamento de estado global com Redux em um projeto React e TypeScript.

A interface exibe um catálogo estático, permite adicionar produtos ao carrinho, alterar quantidades, remover itens e simular o login de um usuário. Os dados existem apenas em memória e são reiniciados ao recarregar a página.

## Funcionalidades

- catálogo com oito produtos locais;
- preços e total formatados em real brasileiro (`pt-BR`/`BRL`);
- adição de produtos ao carrinho;
- incremento, decremento e remoção de itens;
- remoção automática quando a quantidade chega a zero;
- contador de unidades no cabeçalho e cálculo do valor total;
- abertura do carrinho em um painel lateral, com fechamento por botão, clique externo ou tecla `Escape`;
- login e logout demonstrativos, sem formulário ou autenticação real;
- animação inicial com suporte à preferência `prefers-reduced-motion`.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| React 19 | Construção da interface |
| TypeScript | Tipagem estática |
| Redux 5 | Estado global de usuário e carrinho |
| React Redux | Integração entre React e a store |
| styled-components | Estilização dos componentes |
| GSAP | Animação de entrada |
| React Icons | Ícones da interface |
| Vite | Desenvolvimento e build |
| ESLint | Análise estática do código |

## Pré-requisitos

- Node.js compatível com Vite 8;
- npm.

## Executando localmente

```bash
npm install
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente `http://localhost:5173`.

Para gerar e visualizar a versão de produção:

```bash
npm run build
npm run preview
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a aplicação otimizada em `dist/` |
| `npm run preview` | Serve localmente o conteúdo de `dist/` |
| `npm run typecheck` | Verifica os tipos sem gerar arquivos |
| `npm run lint` | Executa o ESLint em todo o projeto |

## Arquitetura

O ponto de entrada, `src/main.tsx`, envolve a aplicação com o `Provider` do React Redux. A store combina dois domínios de estado: `user` e `cart`. Os componentes acessam esses dados por hooks tipados definidos em `src/redux/hooks.ts`.

```text
src/
├── components/
│   ├── cart/            # Painel do carrinho e total
│   ├── cart-item/       # Item, quantidade e remoção
│   ├── custom-button/   # Botão reutilizável
│   ├── header/          # Login, contador e abertura do carrinho
│   ├── product-item/    # Card e ação de adicionar
│   └── products/        # Grade do catálogo
├── data/
│   └── products.ts      # Tipo Product e catálogo estático
├── redux/
│   ├── cart/            # Actions, tipos e reducer do carrinho
│   ├── user/            # Actions, tipos e reducer do usuário
│   ├── hooks.ts         # useAppDispatch e useAppSelector
│   ├── root-reducer.ts  # Combinação dos reducers e RootState
│   └── store.ts         # Criação da store e AppDispatch
├── App.css              # Estilos globais
├── App.tsx              # Composição da tela e animação inicial
└── main.tsx             # Inicialização do React e Provider
```

Cada pasta de componente contém um `index.tsx` e um `styles.ts`. A responsabilidade visual permanece no arquivo de estilos, enquanto eventos, seleção de estado e renderização ficam no componente.

## Estado Redux

A store possui o seguinte formato:

```ts
interface RootState {
  user: {
    currentUser: {
      name: string;
      email: string;
    } | null;
  };
  cart: {
    items: Array<Product & { quantity: number }>;
  };
}
```

### Usuário

| Action | Payload | Efeito |
| --- | --- | --- |
| `user/login` | `{ name, email }` | Define `currentUser` |
| `user/logout` | — | Volta `currentUser` para `null` |

O botão de login envia um usuário fixo (`Usuário`, `usuario@example.com`). Esse fluxo existe somente para demonstrar a atualização do estado.

### Carrinho

| Action | Payload | Efeito |
| --- | --- | --- |
| `cart/addItem` | `Product` | Adiciona o produto ou incrementa sua quantidade |
| `cart/removeItem` | ID do produto | Remove todas as unidades do produto |
| `cart/increaseQuantity` | ID do produto | Incrementa a quantidade em uma unidade |
| `cart/decreaseQuantity` | ID do produto | Decrementa e remove o item ao chegar a zero |

O contador do cabeçalho soma as quantidades de todos os itens. O total do painel é derivado durante a renderização por `preço × quantidade`; nenhum dos dois valores é armazenado separadamente na store.

## Fluxo de dados

1. Uma interação do usuário chama uma action creator.
2. O componente envia a action usando `useAppDispatch`.
3. O reducer correspondente produz um novo estado sem alterar o anterior.
4. Componentes inscritos com `useAppSelector` recebem o estado atualizado.
5. Contador, itens e total são renderizados novamente.

Exemplo: ao clicar em **Adicionar ao carrinho**, `ProductItem` dispara `addItem(product)`. O reducer verifica o ID: se o produto já existe, incrementa `quantity`; caso contrário, cria um novo item com `quantity: 1`.

## Dados e personalização

O catálogo fica em `src/data/products.ts`. Um produto segue este contrato:

```ts
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}
```

Para incluir um produto, adicione um objeto com ID único ao array `products`. As imagens atuais são carregadas de URLs externas do Unsplash, portanto sua exibição depende de acesso à internet.

## Acessibilidade e interface

- botões de ícone possuem descrições por `aria-label`;
- o carrinho é identificado como diálogo modal;
- o painel responde à tecla `Escape`;
- imagens implementadas como plano de fundo recebem papel e nome acessível;
- a animação é desativada quando o sistema solicita redução de movimento.

## Validação

Antes de enviar alterações, execute:

```bash
npm run typecheck
npm run lint
npm run build
```

O projeto não possui testes automatizados no momento.

