USE ed_grupo6;

CREATE TABLE IF NOT EXISTS gamificacao_perfis (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNSIGNED NOT NULL UNIQUE,
    brunocoins BIGINT UNSIGNED NOT NULL DEFAULT 350,
    xp BIGINT UNSIGNED NOT NULL DEFAULT 0,
    nivel INT UNSIGNED NOT NULL DEFAULT 1,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
