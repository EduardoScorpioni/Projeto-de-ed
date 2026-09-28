<?php
/* app/Controllers/ConteudoController.php */

namespace App\Controllers;

/**
 * Paginas de conteudo didatico (TAD, listas, fila, pilha, home).
 * Sao views essencialmente estaticas; o controller so decide o que exibir.
 */
class ConteudoController
{
    public function home($urlInicio, $urlPaginas)
    {
        require APP_PATH . '/Views/home.php';
    }

    public function tad($urlInicio, $urlPaginas)
    {
        require APP_PATH . '/Views/tad.php';
    }

    public function listaSimples($urlInicio, $urlPaginas)
    {
        require APP_PATH . '/Views/lista-simples.php';
    }

    public function listaDupla($urlInicio, $urlPaginas)
    {
        require APP_PATH . '/Views/lista-dupla.php';
    }

    public function fila($urlInicio, $urlPaginas)
    {
        require APP_PATH . '/Views/fila.php';
    }

    public function pilha($urlInicio, $urlPaginas)
    {
        require APP_PATH . '/Views/pilha.php';
    }

    public function filaPrioridade($urlInicio, $urlPaginas)
    {
        require APP_PATH . '/Views/fila-prioridade.php';
    }
}

