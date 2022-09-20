<?php
require __DIR__ . '/src/Controller/ClienteController.php';
require __DIR__ . '/vendor/autoload.php';

$klein = new \Klein\Klein();



$klein->respond('GET', '/', function ($request, $response, $service, $app) {

    $service->render('src/View/teste.php');
});



$klein->respond('POST', '/CarregaArquivo', [new ClienteController(),'carregaArquivo']   );


$klein->respond('POST', '/Registrar', [new ClienteController(),'registrar']   );



$klein->dispatch();




