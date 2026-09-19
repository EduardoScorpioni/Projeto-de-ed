<?php
/* app/Controllers/PerfilController.php */

namespace App\Controllers;

use App\Models\Usuario;

/**
 * Edicao do perfil do usuario logado (nome, e-mail e, opcionalmente, senha).
 * Requisito de gameficacao do PDF: "deve ser possivel modificar os dados
 * do perfil de um usuario". Recuperacao de senha fica de fora por enquanto,
 * por pedido explicito do usuario.
 */
class PerfilController
{
    public function editar(): void
    {
        exigirLogin();

        $usuarioId = (int) $_SESSION['usuario_id'];
        $usuario = Usuario::buscarPorId($usuarioId);

        $erros = [];
        $sucesso = false;
        $nome = $usuario['nome'];
        $email = $usuario['email'];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $nome = trim($_POST['nome'] ?? '');
            $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL) ?: '';
            $senhaAtual = $_POST['senha_atual'] ?? '';
            $novaSenha = $_POST['nova_senha'] ?? '';
            $confirmaNovaSenha = $_POST['confirma_nova_senha'] ?? '';
            $querTrocarSenha = $novaSenha !== '' || $confirmaNovaSenha !== '';

            if ($nome === '') {
                $erros[] = 'O nome é obrigatório.';
            }
            if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $erros[] = 'Informe um e-mail válido.';
            } elseif (Usuario::emailPertenceAOutroUsuario($email, $usuarioId)) {
                $erros[] = 'Este e-mail já está sendo usado por outra conta.';
            }

            if ($querTrocarSenha) {
                if (!password_verify($senhaAtual, $usuario['senha_hash'])) {
                    $erros[] = 'Senha atual incorreta.';
                }
                if (strlen($novaSenha) < 8) {
                    $erros[] = 'A nova senha deve ter pelo menos 8 caracteres.';
                } elseif (!preg_match('/[A-Z]/', $novaSenha)) {
                    $erros[] = 'A nova senha deve conter pelo menos uma letra maiúscula.';
                } elseif (!preg_match('/[0-9]/', $novaSenha)) {
                    $erros[] = 'A nova senha deve conter pelo menos um número.';
                }
                if ($novaSenha !== $confirmaNovaSenha) {
                    $erros[] = 'As senhas novas não coincidem.';
                }
            }

            if (empty($erros)) {
                Usuario::atualizarPerfil($usuarioId, $nome, $email);

                if ($querTrocarSenha) {
                    Usuario::atualizarSenha($usuarioId, $novaSenha);
                }

                $_SESSION['usuario_nome'] = $nome;
                $_SESSION['usuario_email'] = $email;
                $sucesso = true;
            }
        }

        require APP_PATH . '/Views/perfil.php';
    }
}
