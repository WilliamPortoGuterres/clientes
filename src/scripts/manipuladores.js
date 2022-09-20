var listaClientes = {}
listaClientes.data = []
var indiceEditando = -1
var emailEditando=''

$(document).ready(function () {

    $.ajax({
        url: '/CarregaArquivo',
        type: 'POST',
        
        success: function (data) {

            listaClientes = JSON.parse(data)

            montaTabela()


        },
        cache: false,
        contentType: false,
        processData: false,
        xhr: function () { // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                myXhr.upload.addEventListener('progress', function () {
                    /* faz alguma coisa durante o progresso do upload */                  
                }, false);
            }
            return myXhr;
        }
    });

    

    $('#adicionarCliente').click(function () {

        setaBotaoAdicionar()
        $("#modalUpdate").modal('show')


    })

   

        
    

    function limpaCampos() {

        $('#nome').val('')
        $('#email').val('')
        $('#telefone').val('')

    }

    

    function abreCliente(cliente) {

        $('#nome').val(cliente.nome)
        $('#email').val(cliente.email)
        $('#telefone').val(cliente.telefone)
        $("#modalUpdate").modal('show')



    }

    function addCliente(cliente){

        var resultado = listaClientes.data.filter(clienteAtual => clienteAtual.email === cliente.email)

        if(resultado.length ==0){

            listaClientes.data.push(cliente) 
                
           salvarClienteServidor('add')
        
        }else{

            $('#ModalErro').modal('show')


        }

        limpaCampos();
       


    }

    function setaBotaoAdicionar(){

        $('#btnSalvar').off()
        $("#btnSalvar").click(function () {

            var nome = $("#nome").val()
            var email = $("#email").val()
            var telefone = $("#telefone").val()
    
            var clienteEditado = { nome, email, telefone }
    
            addCliente(clienteEditado)
            
            $("#modalUpdate").modal('hide')
            
        })

    }

    function setaBotaoEditar(){
        $('#btnSalvar').off()
        $("#btnSalvar").click(function () {

            var nome = $("#nome").val()
            var email = $("#email").val()
            var telefone = $("#telefone").val()
    
            var clienteEditado = { nome, email, telefone }
    
            editarCliente(clienteEditado)
            
            $("#modalUpdate").modal('hide')
            
        })
    }

    function editarCliente(cliente) {


        var resultado = listaClientes.data.filter(clienteAtual => clienteAtual.email === cliente.email)

            if((resultado.length == 1 && cliente.email==emailEditando)||(resultado.length ==0)){

                listaClientes.data[indiceEditando] = cliente
                
                salvarClienteServidor('editar')

              
            }else{

                $('#ModalErro').modal('show')
                        
            }

        emailEditando=''

        indiceEditando = -1

        limpaCampos();
        montaTabela();


    }

    function deletarCliente(clienteIndice) {

        listaClientes.data.splice(clienteIndice, 1)

        salvarClienteServidor('excluir')

        

    }

    function salvarClienteServidor(acao){

        $.ajax({
            url: '/Registrar',
            data: JSON.stringify( listaClientes),
            type: 'POST',
            
            success: function (data) {
   switch(acao){

    case 'add':
        $('#modalAdd').modal('show')
        break
    case 'editar':
        $('#modalEditar').modal('show')
        break
    case 'excluir':
        $('#modalExcluir').modal('show')
        break
   }

                listaClientes = data
    
                $("#modalSucesso").modal('show')
                montaTabela()
    
    
            },
            error:function(e){ $('#ModalErro').modal('show')},
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () { // Custom XMLHttpRequest
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                    myXhr.upload.addEventListener('progress', function () {
                        /* faz alguma coisa durante o progresso do upload */                  
                    }, false);
                }
                return myXhr;
            }
        });


    }

    function montaTabela() {

        var conteudoTabela = $('#conteudo')

        conteudoTabela.html('')

        listaClientes.data.forEach(cliente => {

            var stringTBody = '<TR>'
            stringTBody += '<TD>' + cliente.nome + '</TD>'
            stringTBody += '<TD>' + cliente.email + '</TD>'
            stringTBody += '<TD>' + cliente.telefone + '</TD>'
            stringTBody += "<TD><button class='editar btn btn-secondary'>ATUALIZAR</button></TD>"
            stringTBody += "<TD><button class='deletar btn btn-secondary'>DELETAR</button></TD>"
            stringTBody += '</TR>'
            conteudoTabela.append(stringTBody)

        });


        $('.editar').each(function (index, e) {

            $(this).click(function () {

                setaBotaoEditar()

                indiceEditando = index
                emailEditando =listaClientes.data[index]['email']

                abreCliente(listaClientes.data[index])

            })


        })

        $('.deletar').each(function (index, e) {


            $(this).click(function () {

                if (confirm("Confirmar a exclusão?")) {

                    deletarCliente(index)

                }

            })

        })

    }
})