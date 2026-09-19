<?php
/* api/gamificacao.php
 * Endpoint JSON usado por assets/js/gamificacao.js para sincronizar o estado
 * do jogo do usuario logado com o MySQL (ver comentario em
 * app/Models/GamificacaoPerfil.php sobre o que este endpoint garante).
 *
 * GET  -> retorna o estado salvo do usuario logado.
 * POST -> recebe o estado (JSON) e salva.
 */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\GamificacaoController;

(new GamificacaoController())->api();
