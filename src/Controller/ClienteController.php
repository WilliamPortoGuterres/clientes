<?php



class ClienteController
{


    public function carregaArquivo($request, $response, $service, $app)
    {

        $temp = $request->files();


        $json = file_get_contents($temp['arquivo']['tmp_name']);


        return $json;
        
    }
}
