<?php
/* app/Models/RecuperacaoSenha.php */

namespace App\Models;

use App\Config\Database;
use PDO;

/**
 * Gerencia os tokens temporários para o fluxo de "Esqueci minha senha".
 * Armazena o hash SHA-256 do token gerado para segurança.
 */
class RecuperacaoSenha
{
    /**
     * Invalida tokens anteriores não utilizados do mesmo usuário.
     */
    public static function invalidarTokensAnteriores(int $usuarioId): void
    {
        $stmt = Database::conexao()->prepare(
            'UPDATE recuperacao_senhas SET usado = 1 WHERE usuario_id = ? AND usado = 0'
        );
        $stmt->execute([$usuarioId]);
    }

    /**
     * Cria e registra um novo token de recuperação temporário (padrão 30 minutos).
     */
    public static function criarToken(int $usuarioId, string $token, int $minutosValidade = 30): bool
    {
        self::invalidarTokensAnteriores($usuarioId);

        $tokenHash = hash('sha256', $token);
        $expiraEm = date('Y-m-d H:i:s', time() + ($minutosValidade * 60));

        $stmt = Database::conexao()->prepare(
            'INSERT INTO recuperacao_senhas (usuario_id, token_hash, expira_em, usado) VALUES (?, ?, ?, 0)'
        );

        return $stmt->execute([$usuarioId, $tokenHash, $expiraEm]);
    }

    /**
     * Busca um token válido, não expirado e ainda não utilizado.
     */
    public static function buscarPorToken(string $token): ?array
    {
        $tokenHash = hash('sha256', $token);

        $stmt = Database::conexao()->prepare(
            'SELECT r.id, r.usuario_id, r.token_hash, r.expira_em, r.usado, u.nome, u.email
             FROM recuperacao_senhas r
             INNER JOIN usuarios u ON u.id = r.usuario_id
             WHERE r.token_hash = ? AND r.usado = 0 AND r.expira_em >= NOW()
             LIMIT 1'
        );
        $stmt->execute([$tokenHash]);
        $registro = $stmt->fetch();

        return $registro ?: null;
    }

    /**
     * Marca o token de recuperação como utilizado para que não possa ser reaproveitado.
     */
    public static function marcarComoUsado(int $id): void
    {
        $stmt = Database::conexao()->prepare(
            'UPDATE recuperacao_senhas SET usado = 1 WHERE id = ?'
        );
        $stmt->execute([$id]);
    }
}
