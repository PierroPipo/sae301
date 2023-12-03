<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ThreadController extends AbstractController
{
    #[Route('/thread', name: 'app_thread')]
    public function index(): Response
    {
        return $this->render('thread/index.html.twig', [
            'controller_name' => 'ThreadController',
        ]);
    }
}
