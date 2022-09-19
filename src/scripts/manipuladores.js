var listaClientes = {}
listaClientes.data = []
var indiceEditando = -1
var emailEditando=''
$(document).ready(function () {

    $("#btnEditar").click(function () {

        var nome = $("#nome").val()
        var email = $("#email").val()
        var telefone = $("#telefone").val()

        var clienteEditado = { nome, email, telefone }

        editarCliente(clienteEditado)
        $("#modalUpdate").modal('hide')
        $("#modalSucesso").modal('show')

    })
    $('#adicionarCliente').click(function () {




        $("#modalUpdate").modal('show')




    })

    $("#formulario").submit(function (e) {
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            url: '/CarregaArquivo',
            type: 'POST',
            data: formData,
            success: function (data) {

                listaClientes = JSON.parse(data)

                montaTabela();



            },
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () { // Custom XMLHttpRequest
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                    myXhr.upload.addEventListener('progress', function () {
                        /* faz alguma coisa durante o progresso do upload */
                        console.log("progrediu");
                    }, false);
                }
                return myXhr;
            }
        });
    });

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

    function editarCliente(cliente) {

        var resultado = listaClientes.data.filter(clienteAtual => emailEditando == clienteAtual.email)
      

            if(resultado.length == 1){

                listaClientes.data[indiceEditando] = cliente

            
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

        montaTabela();

    }
    function montaTabela() {

        var conteudoTabela = $('#conteudo')

        conteudoTabela.html('')

        listaClientes.data.forEach(cliente => {

            var stringTBody = '<TR>'
            stringTBody += '<TD>' + cliente.nome + '</TD>'
            stringTBody += '<TD>' + cliente.email + '</TD>'
            stringTBody += '<TD>' + cliente.telefone + '</TD>'
            stringTBody += "<TD><button class='editar'>ATUALIZAR</button></TD>"
            stringTBody += "<TD><button class='deletar'>DELETAR</button></TD>"
            stringTBody += '</TR>'
            conteudoTabela.append(stringTBody)

        });


        $('.editar').each(function (index, e) {


            $(this).click(function () {

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