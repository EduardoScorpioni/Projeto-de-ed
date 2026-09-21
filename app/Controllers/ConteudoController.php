<?php
/* app/Controllers/ConteudoController.php */

namespace App\Controllers;

/**
 * Paginas de conteudo didatico (TAD, listas, fila, pilha, home).
 * Sao views essencialmente estaticas; o controller so decide o que exibir.
 */
class ConteudoController
{
    public function home(string $urlInicio, string $urlPaginas): void
    {
        require APP_PATH . '/Views/home.php';
    }

    public function tad(string $urlInicio, string $urlPaginas): void
    {
        require APP_PATH . '/Views/tad.php';
    }

    public function listaSimples(string $urlInicio, string $urlPaginas): void
    {
        require APP_PATH . '/Views/lista-simples.php';
    }

    public function listaDupla(string $urlInicio, string $urlPaginas): void
    {
        require APP_PATH . '/Views/lista-dupla.php';
    }

    public function fila(string $urlInicio, string $urlPaginas): void
    {
        require APP_PATH . '/Views/fila.php';
    }

    public function pilha(string $urlInicio, string $urlPaginas): void
    {
        require APP_PATH . '/Views/pilha.php';
    }

    public function filaPrioridade(string $urlInicio, string $urlPaginas): void
    {
        require APP_PATH . '/Views/fila-prioridade.php';
    }
}

