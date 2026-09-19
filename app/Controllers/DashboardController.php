<?php
/* app/Controllers/DashboardController.php */

namespace App\Controllers;

class DashboardController
{
    public function index(): void
    {
        exigirLogin();
        require APP_PATH . '/Views/dashboard.php';
    }
}
