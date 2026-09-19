<?php
/* app/Controllers/AutenticacaoController.php */

namespace App\Controllers;

use App\Models\Usuario;

/**
 * Login, cadastro e logout. Antes essa logica ficava misturada com HTML
 * direto em pages/login.php e pages/cadastro.php; agora o controller cuida
 * das regras e delega a apresentacao para app/Views.
 */
class AutenticacaoController
{
    public function login(string $urlInicio, string $urlPaginas): void
    {
        exigirDeslogado();

        $erro = '';
        $email = '';

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL) ?: '';
            $senha = $_POST['senha'] ?? '';

            if ($email === '' || $senha === '') {
                $erro = 'Por favor, preencha todos os campos.';
            } else {
                $usuario = Usuario::buscarPorEmail($email);

                if ($usuario && password_verify($senha, $usuario['senha_hash'])) {
                    $_SESSION['usuario_id'] = $usuario['id'];
                    $_SESSION['usuario_nome'] = $usuario['nome'];
                    $_SESSION['usuario_email'] = $usuario['email'];
                    session_regenerate_id(true);

                    Usuario::registrarAcesso((int) $usuario['id'], $_SERVER['REMOTE_ADDR'] ?? '');

                    header('Location: dashboard.php');
                    exit;
                }

                $erro = 'E-mail ou senha inválidos.';
            }
        }

        require APP_PATH . '/Views/login.php';
    }

    public function cadastro(string $urlInicio, string $urlPaginas): void
    {
        exigirDeslogado();

        $erros = [];
        $nome = '';
        $email = '';

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $nome = trim($_POST['nome'] ?? '');
            $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL) ?: '';
            $senha = $_POST['senha'] ?? '';
            $confirmaSenha = $_POST['confirma_senha'] ?? '';

            if ($nome === '') {
                $erros[] = 'O nome é obrigatório.';
            }
            if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $erros[] = 'Informe um e-mail válido.';
            }

            if (strlen($senha) < 8) {
                $erros[] = 'A senha deve ter pelo menos 8 caracteres.';
            } elseif (!preg_match('/[A-Z]/', $senha)) {
                $erros[] = 'A senha deve conter pelo menos uma letra maiúscula.';
            } elseif (!preg_match('/[0-9]/', $senha)) {
                $erros[] = 'A senha deve conter pelo menos um número.';
            }

            if ($senha !== $confirmaSenha) {
                $erros[] = 'As senhas não coincidem.';
            }

            if (empty($erros) && Usuario::emailExiste($email)) {
                $erros[] = 'Este e-mail já está cadastrado.';
            }

            if (empty($erros)) {
                $novoId = Usuario::criar($nome, $email, $senha);

                $_SESSION['usuario_id'] = $novoId;
                $_SESSION['usuario_nome'] = $nome;
                $_SESSION['usuario_email'] = $email;
                session_regenerate_id(true);

                header('Location: dashboard.php');
                exit;
            }
        }

        require APP_PATH . '/Views/cadastro.php';
    }

    public function logout(): void
    {
        session_unset();
        session_destroy();
        header('Location: ../index.php');
        exit;
    }
}
