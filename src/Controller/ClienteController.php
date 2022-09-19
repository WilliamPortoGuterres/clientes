<?php



 class ClienteController
{


public function carregaArquivo($request, $response, $service, $app)
{
  
    $temp=$request->files();
   
 
$json = file_get_contents($temp['arquivo']['tmp_name']);


return $json;
}
//Editando a linha que vc quer
//$json->layers[1]->nm = "Mensagem Enviada";

//Salvando as edições
//$json_editado = file_put_contents('teste.json',json_encode($json));

//Carregando json após ser salvo já editado
//$json = json_decode(file_get_contents('teste.json'));
//Imprimindo json editado
//var_dump($json);





}