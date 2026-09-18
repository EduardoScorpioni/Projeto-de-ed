-- db/setup.sql

-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS ed_grupo6;
USE ed_grupo6;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de logs de sessão (opcional mas desejável)
CREATE TABLE IF NOT EXISTS sessoes_log (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNSIGNED NOT NULL,
    ip VARCHAR(45),
    entrou_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserção de usuário de teste
-- Nome: Admin, Email: admin@grupo6.com, Senha: Admin@123
-- Hash gerado via PHP: password_hash('Admin@123', PASSWORD_BCRYPT)
INSERT INTO usuarios (nome, email, senha_hash) 
VALUES ('Admin', 'admin@grupo6.com', '$2y$10$BEG/XyJi6c9ZeOEKIi/1C.bp/h5stiveIwNnMqmMw8nbVg.kggoyy');

-- Gameficacao: perfil com BrunoCoins
CREATE TABLE IF NOT EXISTS gamificacao_perfis (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNSIGNED NOT NULL UNIQUE,
    brunocoins BIGINT UNSIGNED NOT NULL DEFAULT 350,
    xp BIGINT UNSIGNED NOT NULL DEFAULT 0,
    nivel INT UNSIGNED NOT NULL DEFAULT 1,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Acesso pedido para teste:
-- usuario: admin
-- senha: admin
INSERT INTO usuarios (nome, email, senha_hash)
VALUES ('admin', 'admin', '$2y$10$ADDW0uDCHViGl2JtsL3biOGoP9qhUfJ0gdlwcmIlTRQLT2ALxfu0C')
ON DUPLICATE KEY UPDATE
    nome = VALUES(nome),
    senha_hash = VALUES(senha_hash);

INSERT INTO gamificacao_perfis (usuario_id, brunocoins, xp, nivel)
SELECT id, 999999999, 999999, 999
FROM usuarios
WHERE email = 'admin'
ON DUPLICATE KEY UPDATE
    brunocoins = VALUES(brunocoins),
    xp = VALUES(xp),
    nivel = VALUES(nivel);
