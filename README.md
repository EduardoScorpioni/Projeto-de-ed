# Projeto de Estrutura de Dados - Grupo 6

![PHP](https://img.shields.io/badge/PHP-aplicacao_web-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-banco_de_dados-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-interface-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Localhost](https://img.shields.io/badge/Servidor-localhost-2EA44F?style=for-the-badge)

Sistema web acadêmico desenvolvido para apresentar conteúdos de **Estrutura de Dados**.
O projeto aborda **TAD**, **struct em C#**, **lista simplesmente encadeada** e
**lista duplamente encadeada**, com páginas explicativas, exemplos de código,
imagens de apoio, PDFs e área de login.

O projeto roda localmente com **EasyPHP** ou **XAMPP**, usando PHP, Apache e MySQL.

---

## Como rodar depois do clone

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd Projeto-de-ed
```

### 2. Coloque a pasta no servidor local

O projeto precisa ficar dentro da pasta pública do servidor local.

| Ambiente | Pasta recomendada |
| --- | --- |
| EasyPHP | `C:\Program Files (x86)\EasyPHP-DevServer-14.1VC11\data\localweb\` |
| XAMPP | `C:\xampp\htdocs\` |

Exemplo no XAMPP:

```text
C:\xampp\htdocs\Projeto-de-ed
```

### 3. Inicie Apache e MySQL

Abra o painel do **EasyPHP** ou do **XAMPP** e inicie:

- Apache
- MySQL

### 4. Importe o banco de dados

O arquivo de criação do banco está em:

```text
db/setup.sql
```

Você pode importar pelo **phpMyAdmin** ou pelo terminal:

```bash
mysql -u root < db/setup.sql
```

O projeto espera estas configurações em `includes/conexao.php`:

| Configuração | Valor |
| --- | --- |
| Host | `localhost` |
| Usuário | `root` |
| Senha | vazia |
| Banco | `ed_grupo6` |

### 5. Abra no navegador

Se a pasta clonada se chamar `Projeto-de-ed`, acesse:

```text
http://localhost/Projeto-de-ed/
```

Se a pasta tiver outro nome, troque `Projeto-de-ed` pelo nome usado no servidor.

---

## Acesso de teste

O SQL já cria um usuário inicial para testar o login:

| Campo | Valor |
| --- | --- |
| E-mail | `admin@grupo6.com` |
| Senha | `Admin@123` |

Também é possível criar novos usuários pela página de cadastro.

## Estrutura atual

```text
Projeto-de-ed/
|-- index.php
|-- pages/
|   |-- tad.php
|   |-- lista-simples.php
|   |-- lista-dupla.php
|   |-- login.php
|   |-- cadastro.php
|   |-- dashboard.php
|   `-- logout.php
|-- includes/
|   |-- conexao.php
|   `-- sessao.php
|-- db/
|   `-- setup.sql
|-- assets/
|   |-- css/
|   |-- js/
|   `-- img/
|-- docs/
|   |-- pdfs/
|   |-- imagens-pdfs/
|   |-- generate-pdfs.mjs
|   |-- generate-images.mjs
|   `-- resumo-requisitos.md
|-- LICENSE
`-- README.md
```

## Páginas principais

| Página | Função |
| --- | --- |
| `index.php` | Página inicial com apresentação dos módulos |
| `pages/tad.php` | Explica TAD, struct e exercícios de modelagem |
| `pages/lista-simples.php` | Explica lista simplesmente encadeada |
| `pages/lista-dupla.php` | Explica lista duplamente encadeada |
| `pages/login.php` | Entrada de usuários |
| `pages/cadastro.php` | Criação de novas contas |
| `pages/dashboard.php` | Área restrita depois do login |

## Materiais de apoio

Os PDFs explicativos ficam em `docs/pdfs/`:

- `tad-struct-explicativo.pdf`
- `exercicios-struct-explicativo.pdf`
- `lista-encadeada-explicativo.pdf`
- `lista-encadeada-requisitos-programacao.pdf`
- `lista-duplamente-encadeada-explicativo.pdf`

As versões em imagem/SVG para usar no site ficam em:

```text
docs/imagens-pdfs/
```

Há também uma página de prévia em:

```text
docs/imagens-pdfs/index.html
```

## Scripts de geração

Os materiais visuais podem ser recriados pelos scripts:

```bash
node docs/generate-pdfs.mjs
node docs/generate-images.mjs
```

Esses scripts geram os PDFs e as imagens usadas como apoio visual no conteúdo.

## Tecnologias usadas

- PHP
- MySQL
- HTML5
- CSS3
- JavaScript
- EasyPHP ou XAMPP
- Apache local via `localhost`

## Referências

O projeto usa como base os arquivos de referência das aulas apresentadas sobre
Estrutura de Dados e os requisitos propostos para o trabalho.

O conteúdo sobre listas encadeadas e lista duplamente encadeada também foi
complementado com pesquisas realizadas pelo grupo, para deixar as explicações
mais claras e aplicáveis ao site.

## Integrantes

- Eduardo Viccino Scorpioni
- Pedro Brandi Maris
- João Pedro de Souza Santos

---

Projeto acadêmico desenvolvido para a disciplina de **Estrutura de Dados**.
