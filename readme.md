# 📦 Projeto: Cadastro de Produtos com Padrão MVC (Client-Server)

Este projeto demonstra a aplicação do padrão Model-View-Controller (MVC) em uma arquitetura web simples que utiliza comunicação assíncrona (AJAX/Fetch) entre o cliente (HTML/JS) e o servidor (PHP).

## 🚀 Como Executar o Projeto

1.  **Requisitos:** Você precisa de um ambiente de servidor local (como XAMPP, WAMP, MAMP ou um servidor PHP embutido) para executar arquivos PHP.
2.  **Configuração:** Coloque os quatro arquivos (`index.html`, `style.css`, `app.js`, `processar.php`) dentro do diretório raiz do seu servidor local.
3.  **Acesso:** Acesse o projeto no seu navegador via `http://localhost/nome-do-seu-diretorio/index.html` (ou o caminho configurado no seu ambiente).

---

## 💡 Entendendo o Padrão MVC

O padrão MVC divide a aplicação em três camadas interconectadas para isolar a lógica de dados, a interface do usuário e o controle de fluxo.

### 1. 📂 Camada View (`index.html` & `style.css`)

A View é responsável por toda a **interface do usuário** e a **apresentação dos dados**.

| Arquivo | Responsabilidade |
| :--- | :--- |
| `index.html` | Estrutura do formulário de cadastro de produtos. |
| `style.css` | Estilo visual da página (cores, layout, fontes). |
| **Reação:** | Ela não executa ações por conta própria; apenas exibe o formulário, captura a entrada do usuário e exibe as mensagens de feedback **comandadas** pelo Controller (JavaScript). |

### 2. 🧱 Camada Model (Lógica contida em `processar.php`)

O Model é o cerne da **lógica de negócios** e da **manipulação de dados**.

| Responsabilidade | Exemplo no Código (`processar.php`) |
| :--- | :--- |
| **Dados** | Atributos do produto (nome, preço). |
| **Persistência** | Simulação do salvamento dos dados em um log (`file_put_contents`). |
| **Regras** | Nenhuma lógica de apresentação (HTML) existe aqui; apenas a manipulação dos dados. |

> **Nota:** Em uma aplicação PHP robusta, o Model estaria em seu próprio arquivo (`Model.php`) e conteria a lógica de comunicação com o banco de dados (MySQL, PostgreSQL, etc.).

### 3. 🧠 Camada Controller (Dividida: `app.js` e `processar.php`)

O Controller é o **mediador** que recebe as entradas do usuário, decide quais ações devem ser tomadas e coordena o Model e a View.

#### 3.1. Controller - Cliente (`app.js`)

Responsável por lidar com a interação no navegador.

* **Ação:** Ouve o envio do formulário.
* **Controle:** Coleta os dados e utiliza `fetch` para enviar uma requisição assíncrona (`POST`) ao servidor.
* **Comanda a View:** Recebe o `status` da resposta do PHP e atualiza a div de mensagens (`#mensagem`).

#### 3.2. Controller - Servidor (`processar.php`)

Responsável por processar a requisição e interagir com o Model.

* **Ação:** Recebe os dados (`$_POST`).
* **Validação:** Verifica se os campos de nome e preço são válidos.
* **Orquestração:** Se válido, chama o **Model** para persistir os dados.
* **Resposta:** Retorna um objeto JSON (`{"status": "sucesso"}`) para o Controller-Cliente (`app.js`).

## ⚙️ Fluxo de Funcionamento

O fluxo de dados segue um ciclo claro:

1.  **View (HTML/Formulário):** O usuário preenche e clica em **Salvar**.
2.  **Controller-Cliente (app.js):** Captura a entrada e envia os dados via `fetch` para o servidor.
3.  **Controller-Servidor (processar.php):** Recebe os dados, valida e chama a lógica do Model.
4.  **Model (processar.php):** Executa o salvamento (simulado no log).
5.  **Controller-Servidor (processar.php):** Envia uma resposta JSON de sucesso/erro.
6.  **Controller-Cliente (app.js):** Recebe o JSON e determina a cor/texto da mensagem.
7.  **View (HTML/JS):** A mensagem de feedback é exibida ao usuário, completando o ciclo.