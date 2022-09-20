<?php



class ClienteController
{


    public function carregaArquivo($request, $response, $service, $app)
    {

        $temp = $request->files();


        $json = file_get_contents('clientes.json');


        return $json;
        
    }


    public function registrar($request, $response, $service, $app)
    {
        
       file_put_contents('clientes.json', $request->body());
    
        
        $response->file('clientes.json');

    }
}
