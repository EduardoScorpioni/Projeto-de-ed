<?php
/* app/Config/Database.php */

namespace App\Config;

use PDO;
use PDOException;

/**
 * Conexão única (singleton) com o MySQL via PDO, usada por todos os Models.
 * Substitui o antigo includes/conexao.php (mysqli usado direto nas páginas).
 */
class Database
{
    private const HOST = 'localhost';
    private const NOME_BANCO = 'ed_grupo6';
    private const USUARIO = 'root';
    private const SENHA = '';

    private static ?PDO $conexao = null;

    public static function conexao(): PDO
    {
        if (self::$conexao === null) {
            $dsn = 'mysql:host=' . self::HOST . ';dbname=' . self::NOME_BANCO . ';charset=utf8mb4';

            try {
                self::$conexao = new PDO($dsn, self::USUARIO, self::SENHA, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]);
            } catch (PDOException $erro) {
                error_log('Falha na conexao com o banco: ' . $erro->getMessage());
                die('Desculpe, ocorreu um erro de conexao com o banco de dados. Tente novamente mais tarde.');
            }
        }

        return self::$conexao;
    }
}
