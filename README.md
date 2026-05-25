# Projeto de Estrutura de Dados - Grupo 6

![HTML5](https://img.shields.io/badge/HTML5-projeto_web-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-estilizacao-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Localhost](https://img.shields.io/badge/Servidor-localhost-2EA44F?style=for-the-badge)

Site desenvolvido para apresentar conteúdos de **Estrutura de Dados**, com foco em
TAD, lista simplesmente encadeada e lista duplamente encadeada.

O projeto foi pensado para ser aberto em servidor local, usando **EasyPHP** ou
**XAMPP**, e pode ser executado logo depois do clone do repositório.

---

## Como abrir o projeto depois do clone

### 1. Clone o repositório

No terminal, escolha a pasta onde o projeto será salvo e execute:

```bash
git clone <url-do-repositorio>
```

Depois entre na pasta clonada:

```bash
cd Projeto-de-ed
```

### 2. Coloque o projeto na pasta do servidor local

Para o navegador conseguir abrir o site pelo `localhost`, a pasta do projeto
precisa ficar dentro da pasta pública do servidor local.

| Ambiente | Pasta recomendada |
| --- | --- |
| EasyPHP | `C:\Program Files (x86)\EasyPHP-DevServer-14.1VC11\data\localweb\` |
| XAMPP | `C:\xampp\htdocs\` |

Exemplo:

```text
C:\xampp\htdocs\Projeto-de-ed
```

ou

```text
C:\Program Files (x86)\EasyPHP-DevServer-14.1VC11\data\localweb\Projeto-de-ed
```

### 3. Inicie o servidor

Abra o painel do **EasyPHP** ou do **XAMPP** e inicie o servidor Apache.

### 4. Abra no navegador

Com o servidor ligado, acesse:

```text
http://localhost/Projeto-de-ed/
```

Se a pasta tiver outro nome, troque `Projeto-de-ed` pelo nome da pasta usada.

---

## Estrutura do projeto

```text
Projeto-de-ed/
|-- index.html
|-- pages/
|   |-- tad.html
|   |-- lista-simples.html
|   |-- lista-dupla.html
|-- assets/
|   |-- css/
|   |   `-- styles.css
|   `-- img/
|-- docs/
|   `-- resumo-requisitos.md
|-- LICENSE
`-- README.md
```

## Conteúdos abordados

| Página | Conteúdo |
| --- | --- |
| `index.html` | Página inicial do projeto |
| `pages/tad.html` | Conceitos de Tipo Abstrato de Dados |
| `pages/lista-simples.html` | Lista simplesmente encadeada |
| `pages/lista-dupla.html` | Lista duplamente encadeada |
| `docs/resumo-requisitos.md` | Resumo dos requisitos do trabalho |

## Referências e pesquisa

Estamos usando como base os **arquivos de referência das aulas apresentadas
sobre os projetos**, seguindo o conteúdo trabalhado em sala para organizar a
estrutura e a proposta do site.

O conteúdo sobre **lista duplamente encadeada** será complementado com pesquisas
feitas por nós mesmos, para deixar a explicação mais completa, clara e alinhada
ao objetivo do trabalho.

## Tecnologias utilizadas

- HTML5
- CSS3
- EasyPHP
- XAMPP
- Execução via `localhost`

## Integrantes

- Eduardo Viccino Scorpioni
- Pedro Brandi Maris
- João Pedro de Souza Santos

---

Projeto acadêmico desenvolvido para a disciplina de **Estrutura de Dados**.
