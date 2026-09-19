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
    public static function buscarPorEmail(string $email): ?array
    {
        $stmt = Database::conexao()->prepare(
            'SELECT id, nome, email, senha_hash FROM usuarios WHERE email = ?'
        );
        $stmt->execute([$email]);
        $usuario = $stmt->fetch();

        return $usuario ?: null;
    }

    public static function emailExiste(string $email): bool
    {
        $stmt = Database::conexao()->prepare('SELECT id FROM usuarios WHERE email = ?');
        $stmt->execute([$email]);

        return (bool) $stmt->fetch();
    }

    public static function criar(string $nome, string $email, string $senha): int
    {
        $hash = password_hash($senha, PASSWORD_BCRYPT);
        $stmt = Database::conexao()->prepare(
            'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)'
        );
        $stmt->execute([$nome, $email, $hash]);

        return (int) Database::conexao()->lastInsertId();
    }

    public static function registrarAcesso(int $usuarioId, string $ip): void
    {
        $stmt = Database::conexao()->prepare(
            'INSERT INTO sessoes_log (usuario_id, ip) VALUES (?, ?)'
        );
        $stmt->execute([$usuarioId, $ip]);
    }
}
