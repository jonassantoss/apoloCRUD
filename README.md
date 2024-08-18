# ApoloCRUD

## Descrição

ApoloCRUD é uma aplicação web que implementa as operações básicas de CRUD (Create, Read, Update, Delete) utilizando o padrão de arquitetura MVC. A aplicação é construída com Node.js e utiliza o Prisma como ORM para a interação com o banco de dados.

## Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Instalação](#instalação)
4. [Uso](#uso)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Funcionalidades](#funcionalidades)
7. [Contribuição](#contribuição)
8. [Licença](#licença)
9. [Contato](#contato)
10. [Referências](#referências)

## Visão Geral

### Introdução

Este projeto foi desenvolvido para gerenciar os produtos de uma loja fictícia de roupas, chamada Apolo, de maneira eficiente. Ele utiliza o padrão MVC para separar as responsabilidades e facilitar a manutenção e escalabilidade do código.

### Arquitetura

- **Moldel:** Gerencia a lógica de dados e define como os dados são armazenados.
- **View:** Exibe os dados para o usuário e envia comandos para o controlador.
- **Controller:** Interpreta as entradas do usuário e mapeia para chamadas no modelo.

## Tecnologias Utilizadas

- **Node.js & Express:** Base da aplicação e gerenciamento de rotas e middlewares.
- **Prisma:** ORM para gerenciamento e interação com o banco de dados.
- **EJS:** Motor de templates para renderização de views do lado do servidor.
- **Tailwind CSS:** Framework de CSS utilitário para estilização.
- **Webpack:** Empacotador de módulos para o JavaScript e CSS.
- **Babel:** Transpilador para escrever código moderno compatível com versões antigas do JavaScript.
- **Nodemon:** Ferramente de desenvolvimento para reiniciar automaticamente o servidor.
- **bcrptjs:** Biblioteca para hashing de senhas.
- **helmet:** Middleware para segurança HTTP.
- **dayjs:** Biblioteca para manipulação de datas.

## Instalação

### Pré-requisitos

Para a instalação do projeto é necessário alguns pré-requisitos:

- Possuir o Git instalado em sua máquina, se não, acesse: https://www.git-scm.com/downloads
- Possuir o Node.js instalado em sua máquina, se não, acesse: https://nodejs.org/en/download/package-manager
- Possuir NPM instalado.
- Alguma IDE ou editor de código de sua preferência (VS Code, IntelliJ, etc).

### Passos de instalação

1. Clone o repositório do projeto:

```bash
git clone "https://github.com/jonassantoss/apoloCRUD"
```

2. Navegue até o diretório do projeto:

```bash
cd apoloCRUD
```

3. Instale as dependências:

```bash
npm install
```

## Uso

O uso do projeto é bem simples, basta apenas seguir os passos abaixo

```bash
npx prisma migrate deploy # cria o arquivo do banco de dados products.db
npx prisma db seed # preenche o banco de dados do projeto com informações de produtos ficticíos e o login de acesso
npm run start # inicia o projeto
```

<span style="color: #fff; background: #ef4444; padding: 4px; border-radius: 8px">NOTA:</span> Apenas a página inicial está liberada, para usufruir das outras funcionalidades é necessário realizar o login com as informações a seguir:

- email: admin@gmail.com
- senha: senha@123

## Estrutura do Projeto

```
└── 📁apoloCRUD
    └── 📁frontend
        └── 📁assets
            └── 📁css
                └── style.css
            └── output.css
        └── main.js
        └── utils.js
    └── 📁prisma
        └── 📁migrations
            └── 📁20240524224252_migration_1
                └── migration.sql
            └── 📁20240817202123_change_product_model_name
                └── migration.sql
            └── migration_lock.toml
        └── dev.db
        └── products.db
        └── schema.prisma
        └── seed.js
    └── 📁public
        └── 📁assets
            └── 📁js
                └── bundle.js
                └── bundle.js.map
    └── 📁src
        └── 📁controllers
            └── homeController.js
            └── loginController.js
            └── productController.js
        └── 📁middlewares
            └── middlewares.js
        └── 📁models
            └── Product.js
        └── 📁routes
            └── homeRoute.js
            └── loginRoute.js
            └── productRoute.js
        └── 📁utils
            └── seed.js
        └── 📁views
            └── 📁assets
                └── chevronLeft.ejs
                └── chevronRight.ejs
                └── doubleChevronLeft.ejs
                └── doubleChevronRight.ejs
                └── searchIcon.ejs
            └── 📁components
                └── 📁table
                    └── headerCell.ejs
                    └── index.ejs
                    └── tableCell.ejs
                └── header.ejs
                └── messages.ejs
            └── 📁partials
                └── footer.ejs
                └── head.ejs
            └── 404.ejs
            └── index.ejs
            └── login.ejs
            └── product.ejs
        └── server.js
    └── .gitignore
    └── LICENSE
    └── package-lock.json
    └── package.json
    └── README.md
    └── tailwind.config.js
    └── webpack.config.js
```

- frontend/assets: Contém os arquivos estáticos como CSS e JavaScript.
- prisma: Contém o banco de dados SQLite e as migrações.
- public/assets/js: Contém os arquivos JavaScript gerados pelo Webpack.
- src/controllers: Contém os controladores que processam as requisições e retornam as respostas.
- src/middlewares: Contém os middlewares utilizados na aplicação.
- src/models: Contém os modelos de dados.
- src/routes: Contém as definições de rotas.
- src/utils: Contém utilitários e scripts, como seeds de banco de dados.
- src/views: Contém as views EJS que são renderizadas como HTML.

## Funcionalidades

### CRUD

- **Criar:** Permite a criação de novos produtos.
- **Ler:** Permite a visualização de produtos existentes.
- **Atualizar:** Permite a atualização das informações de produtos.
- **Deletar:** Permite a exclusão de produtos.

### Rotas e Endpoints

- `/`: Página inicial, retorna todos os produtos.
- `/produtos/novo`: Página para a criação de produtos.
- `/produtos/novo`: Criação de um produto.
- `/produtos/editar/:id`: Página para a atualização dos dados de um produto.
- `/produtos/editar/:id`: Atualização de um produto.
- `/produtos/deletar/:id`: Exclusão de um produto.

## Contribuição

### Como Contribuir

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git chechout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo **LICENSE** para mais detalhes.

## Contato

Se você tiver alguma dúvida ou sugestão, entre em contato:

- Acesse minhas redes socias e mande uma mensagem
- Ou mande um e-mail para jonassoares.live@gmail.com
