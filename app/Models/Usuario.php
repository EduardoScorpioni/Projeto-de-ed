<?php
/* app/Models/Usuario.php */

namespace App\Models;

use App\Config\Database;

/**
 * Acesso a dados da tabela `usuarios` e `sessoes_log`.
 * Toda query relacionada a usuário/autenticação vive aqui, nunca em controller ou view.
 */
class Usuario
{
    public static function buscarPorEmail($email)
    {
        $stmt = Database::conexao()->prepare(
            'SELECT id, nome, email, senha_hash FROM usuarios WHERE email = ?'
        );
        $stmt->execute([$email]);
        $usuario = $stmt->fetch();

        return $usuario ?: null;
    }

    public static function emailExiste($email)
    {
        $stmt = Database::conexao()->prepare('SELECT id FROM usuarios WHERE email = ?');
        $stmt->execute([$email]);

        return (bool) $stmt->fetch();
    }

    /**
     * Igual a emailExiste(), mas ignora o proprio usuario (usado ao editar o perfil,
     * onde o usuario pode "trocar" o e-mail para o mesmo que ja tinha).
     */
    public static function emailPertenceAOutroUsuario($email, $usuarioId)
    {
        $stmt = Database::conexao()->prepare(
            'SELECT id FROM usuarios WHERE email = ? AND id != ?'
        );
        $stmt->execute([$email, $usuarioId]);

        return (bool) $stmt->fetch();
    }

    public static function buscarPorId($id)
    {
        $stmt = Database::conexao()->prepare(
            'SELECT id, nome, email, senha_hash FROM usuarios WHERE id = ?'
        );
        $stmt->execute([$id]);
        $usuario = $stmt->fetch();

        return $usuario ?: null;
    }

    public static function criar($nome, $email, $senha)
    {
        $hash = password_hash($senha, PASSWORD_BCRYPT);
        $stmt = Database::conexao()->prepare(
            'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)'
        );
        $stmt->execute([$nome, $email, $hash]);

        return (int) Database::conexao()->lastInsertId();
    }

    public static function registrarAcesso($usuarioId, $ip)
    {
        $stmt = Database::conexao()->prepare(
            'INSERT INTO sessoes_log (usuario_id, ip) VALUES (?, ?)'
        );
        $stmt->execute([$usuarioId, $ip]);
    }

    public static function atualizarPerfil($id, $nome, $email)
    {
        $stmt = Database::conexao()->prepare(
            'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?'
        );
        $stmt->execute([$nome, $email, $id]);
    }

    public static function atualizarSenha($id, $novaSenha)
    {
        $hash = password_hash($novaSenha, PASSWORD_BCRYPT);
        $stmt = Database::conexao()->prepare(
            'UPDATE usuarios SET senha_hash = ? WHERE id = ?'
        );
        $stmt->execute([$hash, $id]);
    }
}
