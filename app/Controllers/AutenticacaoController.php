<?php
/* app/Controllers/AutenticacaoController.php */

namespace App\Controllers;

use App\Models\Usuario;
use App\Models\RecuperacaoSenha;

/**
 * Login, cadastro, logout e recuperação de senha.
 * O controller cuida das regras e delega a apresentação para app/Views.
 */
class AutenticacaoController
{
    public function login(string $urlInicio, string $urlPaginas): void
    {
        exigirDeslogado();

        $erro = '';
        $sucesso = $_SESSION['mensagem_sucesso'] ?? '';
        unset($_SESSION['mensagem_sucesso']);
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

    public function esqueciSenha(string $urlInicio, string $urlPaginas): void
    {
        exigirDeslogado();

        $erro = '';
        $sucesso = '';
        $linkSimulado = '';
        $email = '';
        $minutosValidade = 30;

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL) ?: '';

            if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $erro = 'Por favor, informe um e-mail válido.';
            } else {
                $usuario = Usuario::buscarPorEmail($email);

                if ($usuario) {
                    $token = bin2hex(random_bytes(32));
                    RecuperacaoSenha::criarToken((int) $usuario['id'], $token, $minutosValidade);

                    $linkSimulado = 'redefinir-senha.php?token=' . urlencode($token);
                    $sucesso = 'Link de recuperação gerado com sucesso! (Válido por ' . $minutosValidade . ' minutos)';
                } else {
                    $erro = 'Não encontramos nenhuma conta cadastrada com este e-mail.';
                }
            }
        }

        require APP_PATH . '/Views/esqueci-senha.php';
    }

    public function redefinirSenha(string $urlInicio, string $urlPaginas): void
    {
        exigirDeslogado();

        $token = trim($_GET['token'] ?? $_POST['token'] ?? '');
        $erro = '';
        $recuperacao = null;

        if ($token === '') {
            $erro = 'Token de recuperação não informado ou inválido.';
        } else {
            $recuperacao = RecuperacaoSenha::buscarPorToken($token);
            if (!$recuperacao) {
                $erro = 'Este link de recuperação é inválido, expirou ou já foi utilizado.';
            }
        }

        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $recuperacao) {
            $novaSenha = $_POST['nova_senha'] ?? '';
            $confirmaNovaSenha = $_POST['confirma_nova_senha'] ?? '';

            if (strlen($novaSenha) < 8) {
                $erro = 'A nova senha deve ter pelo menos 8 caracteres.';
            } elseif (!preg_match('/[A-Z]/', $novaSenha)) {
                $erro = 'A nova senha deve conter pelo menos uma letra maiúscula.';
            } elseif (!preg_match('/[0-9]/', $novaSenha)) {
                $erro = 'A nova senha deve conter pelo menos um número.';
            } elseif ($novaSenha !== $confirmaNovaSenha) {
                $erro = 'As senhas digitadas não coincidem.';
            } else {
                Usuario::atualizarSenha((int) $recuperacao['usuario_id'], $novaSenha);
                RecuperacaoSenha::marcarComoUsado((int) $recuperacao['id']);

                $_SESSION['mensagem_sucesso'] = 'Sua senha foi redefinida com sucesso! Você já pode entrar com sua nova senha.';
                header('Location: login.php');
                exit;
            }
        }

        require APP_PATH . '/Views/redefinir-senha.php';
    }
}

