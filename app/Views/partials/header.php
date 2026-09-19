<?php
/**
 * app/Views/partials/header.php
 *
 * Espera duas variaveis vindas do script de entrada (index.php ou pages/*.php):
 * - $urlInicio: caminho relativo ate index.php ('index.php' na raiz, '../index.php' em pages/)
 * - $urlPaginas: prefixo relativo ate a pasta pages/ ('pages/' na raiz, '' dentro de pages/)
 * - $paginaAtual (opcional): slug da pagina atual, para marcar aria-current
 */
$paginaAtual = $paginaAtual ?? '';
?>
<header class="topbar">
  <a class="brand" href="<?php echo $urlInicio; ?>" aria-label="Início">
    <span class="brand-mark">ED</span>
    <span>Grupo 6</span>
  </a>

  <nav class="main-nav" aria-label="Navegação principal">
    <a href="<?php echo $urlInicio; ?>"<?php echo $paginaAtual === 'inicio' ? ' aria-current="page"' : ''; ?>>Início</a>
    <a href="<?php echo $urlPaginas; ?>tad.php"<?php echo $paginaAtual === 'tad' ? ' aria-current="page"' : ''; ?>>TAD</a>
    <a href="<?php echo $urlPaginas; ?>lista-simples.php"<?php echo $paginaAtual === 'lista-simples' ? ' aria-current="page"' : ''; ?>>Lista simples</a>
    <a href="<?php echo $urlPaginas; ?>lista-dupla.php"<?php echo $paginaAtual === 'lista-dupla' ? ' aria-current="page"' : ''; ?>>Lista dupla</a>
    <a href="<?php echo $urlPaginas; ?>fila.php"<?php echo $paginaAtual === 'fila' ? ' aria-current="page"' : ''; ?>>Fila</a>
    <a href="<?php echo $urlPaginas; ?>pilha.php"<?php echo $paginaAtual === 'pilha' ? ' aria-current="page"' : ''; ?>>Pilha</a>
    <a href="<?php echo $urlPaginas; ?>gamificacao.php"<?php echo $paginaAtual === 'gamificacao' ? ' aria-current="page"' : ''; ?>>PonteiroQuest</a>
    <?php if (estaLogado()): ?>
      <a href="<?php echo $urlPaginas; ?>dashboard.php">Dashboard</a>
      <a href="<?php echo $urlPaginas; ?>logout.php">Sair</a>
    <?php else: ?>
      <a href="<?php echo $urlPaginas; ?>login.php">Login</a>
      <a href="<?php echo $urlPaginas; ?>cadastro.php">Cadastro</a>
    <?php endif; ?>
  </nav>
</header>
