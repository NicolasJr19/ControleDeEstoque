import { Cxmsg } from "../../utils/cxmsg.js"
import { maiorZIndex } from "../../utils/utils.js"

const dadosGrid = document.querySelector("#dadosGrid")

const btn_add = document.querySelector("#btn_add")
const btn_pesq = document.querySelector("#btn_pesq")
const btn_fecharPopup = document.querySelector("#btn_fecharPopup")
const btn_fecharPopupPesq = document.querySelector("#btn_fecharPopupPesq")
const btn_cancelarPopup = document.querySelector("#btn_cancelarPopup")
const btn_gravarProduto = document.querySelector("#btn_gravarProduto")

const f_codigo = document.querySelector("#f_codigo")
const f_tipoProduto = document.querySelector("#f_tipoProduto")
const f_descricao = document.querySelector("#f_descricao")
const f_quantidade = document.querySelector("#f_quantidade")
const f_status = document.querySelector("#f_status")
const f_fornecedor = document.querySelector("#f_fornecedor")

const f_codigoMov = document.querySelector("#f_codigoMov")
const f_descricaoMov = document.querySelector("#f_descricaoMov")
const f_quantidadeMov = document.querySelector("#f_quantidadeMov")
const f_quantidadeMovimentada = document.querySelector("#f_quantidadeMovimentada")

const movEstoque = document.querySelector("#movEstoque")
const novoProduto = document.querySelector("#novoProduto")
const btn_gravarMov = document.querySelector("#btn_gravarMov")
const btn_cancelarMov = document.querySelector("#btn_cancelarMov")
const btn_fecharPopupMov = document.querySelector("#btn_fecharPopupMov")
const btn_removeQtd = document.querySelector("#btn_removeQtd")
const btn_addQtd = document.querySelector("#btn_addQtd")

const f_filtragem = document.querySelector("#f_filtragem")
const pesquisa = document.querySelector("#pesquisa")
const btn_pesquisar = document.querySelector("#btn_pesquisar")
const f_pesq = document.querySelector("#f_pesq")
const f_pesqId = document.querySelector("#f_pesqId")
const f_pesqNome = document.querySelector("#f_pesqNome")
const btn_listarTudo = document.querySelector("#btn_listarTudo")

//n=novo produto | e=editar Produto
let modojanela = "n"
const serv=sessionStorage.getItem("servidor_nodered")

f_filtragem.addEventListener("keyup",(evt)=>{
    console.log("tecla")
    const linhas = [...document.querySelectorAll(".linhaGrid")]
    let input, texto, filtragem
    input = evt.target
    filtragem = input.value.toUpperCase()
    for(let i=0; i < linhas.length; i++){
        texto = linhas[i].children[4].innerHTML
        if(texto.toUpperCase().indexOf(filtragem)>-1){
            linhas[i].classList.remove("ocultarLinhaGrid")
        }else{
            linhas[i].classList.add("ocultarLinhaGrid")
        }
    }
})

btn_pesq.addEventListener("click",(evt)=>{
    pesquisa.classList.remove("ocultarPopup")
    f_pesq.value=""
    f_pesq.focus()
})

btn_fecharPopupPesq.addEventListener("click",(evt)=>{
    pesquisa.classList.add("ocultarPopup")
})

f_pesqId.addEventListener("click",(evt)=>{
    f_pesq.value=""
    f_pesq.focus()
})

f_pesqNome.addEventListener("click",(evt)=>{
    f_pesq.value=""
    f_pesq.focus()  
})

btn_pesquisar.addEventListener("click",(evt)=>{
    let tipo = null
    if(f_pesqId.checked){
        tipo = "id"
    }else{
        tipo = "nome"
    }
    if(f_pesq.value!=""){
        const endpoint_pesq = `${serv}/pesquisaproduto/${tipo}/${f_pesq.value}`
        fetch(endpoint_pesq)
        .then(res=>res.json())
        .then(res=>{
            dadosGrid.innerHTML=""
            res.forEach(e => {
                criarLinha(e)
        });
        })
        
        pesquisa.classList.add("ocultarPopup")
    }else{
        const config={
            titulo:"Alerta",
            texto:"Digite uma pesquisa!",
            cor:"#6FA0C8",
            tipo:"ok",
            ok:()=>{
                console.log("ok clicado")
            },
            sim: ()=>{},
            nao: ()=>{}
        }
        Cxmsg.mostrar(config)
        f_pesq.focus()
    }
})

btn_listarTudo.addEventListener("click",(evt)=>{
    carregarProdutos()
})

const carregarProdutos = () =>{
    const endpoint_todosProdutos = `${serv}/todosprodutos`;
    fetch(endpoint_todosProdutos)
    .then(res=>res.json())
    .then(res=>{
        dadosGrid.innerHTML=""
        res.forEach(e => {
            criarLinha(e)
        });
    })
}
carregarProdutos()

const criarLinha = (e) =>{
    const divlinha = document.createElement("div")
            divlinha.setAttribute("class","linhaGrid")


            const divc1 = document.createElement("div")
            divc1.setAttribute("class", "colunaLinhaGrid c1")
            divc1.innerHTML=e.n_codigo_produto
            divlinha.appendChild(divc1)

            const divc6 = document.createElement("div")
            divc6.setAttribute("class", "colunaLinhaGrid c3")
            divc6.innerHTML=e.s_desc_tipoProduto
            divlinha.appendChild(divc6)

            const divc3 = document.createElement("div")
            divc3.setAttribute("class", "colunaLinhaGrid c3")
            divc3.innerHTML=e.s_desc_fornecedor
            divlinha.appendChild(divc3)

            const divc7 = document.createElement("div")
            divc7.setAttribute("class", "colunaLinhaGrid c1")
            divc7.innerHTML=e.n_qtde_produto
            divlinha.appendChild(divc7)

            const divc2 = document.createElement("div")
            divc2.setAttribute("class", "colunaLinhaGrid c2")
            divc2.innerHTML=e.s_desc_produto
            divlinha.appendChild(divc2)

            const divc4 = document.createElement("div")
            divc4.setAttribute("class", "colunaLinhaGrid c4")
            divc4.innerHTML=e.c_status_produto
            divlinha.appendChild(divc4)

            const divc5 = document.createElement("div")
            divc5.setAttribute("class", "colunaLinhaGrid c5")
            divlinha.appendChild(divc5)

            const img_status = document.createElement("img")
            if(e.c_status_produto == "A"){
                img_status.setAttribute("src", "../../img/on.svg")
            }else{
                img_status.setAttribute("src", "../../img/off.svg")
            }
            img_status.setAttribute("data-idproduto",e.n_codigo_produto)
            img_status.setAttribute("class", "icone_op")
            img_status.setAttribute("title","Alterar status do produto")
            img_status.addEventListener("click", (evt)=>{
                const idproduto =evt.target.dataset.idproduto
                if(evt.target.getAttribute("src")=="../../img/on.svg"){
                    const endpoint_mudarStatus = `${serv}/mudarStatusProduto/${idproduto}/I`
                    fetch(endpoint_mudarStatus)
                    .then(res=>{
                        if(res.status==200){
                            evt.target.setAttribute("src","../../img/off.svg")
                            evt.target.parentNode.parentNode.childNodes[5].innerHTML="I"
                            
                        }
                    })
                }else{
                    const endpoint_mudarStatus = `${serv}/mudarStatusProduto/${idproduto}/A`
                    fetch(endpoint_mudarStatus)
                    .then(res=>{
                        if(res.status==200){
                            evt.target.setAttribute("src","../../img/on.svg")
                            evt.target.parentNode.parentNode.childNodes[5].innerHTML="A"
                        }
                    })
                }
            })
            divc5.appendChild(img_status)


            const img_editar = document.createElement("img")
            img_editar.setAttribute("src", "../../img/edit.svg")
            img_editar.setAttribute("class", "icone_op")
            img_editar.setAttribute("title","Editar produto")
            img_editar.addEventListener("click",(evt)=>{
                modojanela = "e"
                document.getElementById("tituloJanela").innerHTML = "Editar Produto";
                console.log(modojanela)
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML
                let endpoint = `${serv}/dadosproduto/${id}`
                fetch(endpoint)
                .then(res=>res.json())
                .then(res=>{
                    btn_gravarProduto.setAttribute("data-idproduto",id)
                    f_codigo.value=res[0].n_codigo_produto
                    f_descricao.value=res[0].s_desc_produto
                    f_tipoProduto.value=res[0].n_tipoProduto_tipoProduto
                    f_quantidade.value=res[0].n_qtde_produto
                    f_status.value=res[0].c_status_produto
                    f_fornecedor.value=res[0].n_id_fornecedor
                    novoProduto.classList.remove("ocultarPopup")
                })
            })
            divc5.appendChild(img_editar)

            const img_movimentacao = document.createElement("img")
            img_movimentacao.setAttribute("src", "../../img/movimentacao.svg")
            img_movimentacao.setAttribute("class", "icone_op")
            img_movimentacao.setAttribute("title","Realizar movimentações")
            img_movimentacao.addEventListener("click",(evt)=>{
                const l = evt.target.parentNode.parentNode
                if(l.childNodes[5].innerHTML == "A"){
                    movEstoque.classList.remove("ocultarPopup")

                    f_codigoMov.value=l.childNodes[0].innerHTML
                    f_descricaoMov.value=l.childNodes[4].innerHTML
                    f_quantidadeMov.value=l.childNodes[3].innerHTML

                    f_codigoMov.setAttribute("readonly", "readonly")
                    f_descricaoMov.setAttribute("readonly", "readonly")
                    f_quantidadeMov.setAttribute("readonly", "readonly")

                }else{
                    const config={
                        titulo:"Alerta",
                        texto:"O produto está inativo e não pode ser movimentado!",
                        cor:"#6FA0C8",
                        tipo:"ok",
                        ok:()=>{},
                        sim: ()=>{},
                        nao: ()=>{}
                    }
                    Cxmsg.mostrar(config)
                }

            })
            divc5.appendChild(img_movimentacao)

            const img_delete = document.createElement("img")
            img_delete.setAttribute("src", "../../img/delete.svg")
            img_delete.setAttribute("class", "icone_op")
            img_delete.setAttribute("title","Deletar produto")
            img_delete.addEventListener("click",(evt)=>{
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML
                let config={
                    titulo:"Alerta",
                    texto:"Deseja realmente excluir esse produto?",
                    cor:"#6FA0C8",
                    tipo:"sn",
                    ok:()=>{
                        console.log("ok clicado")
                    },
                    sim: ()=>{
                        const endpoint_deletaProduto = `${serv}/deletaProduto/${id}`
                        fetch(endpoint_deletaProduto)
                        .then(res=>{
                            if(res==200){
                                evt.target.parentNode.parentNode.remove();
                            }
                            carregarProdutos()
                            config={
                                titulo:"Alerta",
                                texto:"Produto excluída com sucesso!",
                                cor:"#6FA0C8",
                                tipo:"ok",
                                ok:()=>{
                                    console.log("ok clicado")
                                },
                                sim:()=>{},
                                nao:()=>{}
                        } 
                        Cxmsg.mostrar(config)
                    })
                    },
                    nao: ()=>{}
                }
                Cxmsg.mostrar(config)                
            })

            divc5.appendChild(img_delete)

            dadosGrid.appendChild(divlinha)
}

btn_add.addEventListener("click",(evt)=>{
    modojanela = "n"
    document.getElementById("tituloJanela").innerHTML = "Novo Produto";

    novoProduto.classList.remove("ocultarPopup")

    f_codigo.value=""
    f_tipoProduto.value=""
    f_status.value="A"
    f_descricao.value=""
    f_quantidade.value=""
    f_fornecedor.value=""


});

btn_gravarMov.addEventListener("click",(evt)=>{
    const dados={
        n_codigo_produto: Number(f_codigoMov.value),
        n_qtde_produto:Number(f_quantidadeMov.value)
    }

    const cab={
        method: 'post',
        body:JSON.stringify(dados)
    }
    
    const endpoint_gravarMov = `${serv}/editarmovimentacao`
    fetch(endpoint_gravarMov, cab)
    .then(res=>{
        carregarProdutos()
        let config={
            titulo:"Alerta",
            texto:"Movimentação gravada!",
            cor:"#6FA0C8",
            tipo:"ok",
            ok:()=>{},
            sim:()=>{},
            nao:()=>{}
        }
        Cxmsg.mostrar(config)
        movEstoque.classList.add("ocultarPopup")
    })
})

btn_addQtd.addEventListener("click",(evt)=>{
    let quantidadeAtual = parseInt(f_quantidadeMov.value)
    let adicionar = parseInt(f_quantidadeMovimentada.value)

    quantidadeAtual+=adicionar

    f_quantidadeMov.value=quantidadeAtual
    f_quantidadeMovimentada.value="0"
})

btn_removeQtd.addEventListener("click",(evt)=>{
    let quantidadeAtual = parseInt(f_quantidadeMov.value)
    let remover = parseInt(f_quantidadeMovimentada.value)

    if(remover<=quantidadeAtual){
        quantidadeAtual-=remover
    }else{
        let config={
            titulo:"Alerta",
            texto:"A quantidade desejada não é suficiente!",
            cor:"#6FA0C8",
            tipo:"ok",
            ok:()=>{},
            sim:()=>{},
            nao:()=>{}
        }
        Cxmsg.mostrar(config)
    }

    f_quantidadeMov.value=quantidadeAtual
    f_quantidadeMovimentada.value="0"
})

btn_fecharPopupMov.addEventListener("click",(evt)=>{
    movEstoque.classList.add("ocultarPopup")
});

btn_cancelarMov.addEventListener("click",(evt)=>{
    movEstoque.classList.add("ocultarPopup")

})

btn_fecharPopup.addEventListener("click",(evt)=>{
    f_codigo.value=""
    f_tipoProduto.value=""
    f_status.value=""
    f_descricao.value=""
    f_quantidade.value=""
    f_fornecedor.value=""
    novoProduto.classList.add("ocultarPopup")
});

btn_gravarProduto.addEventListener("click",(evt)=>{
    const dados ={
        n_codigo_produto: Number(f_codigo.value),
        n_tipoProduto_tipoProduto:Number(f_tipoProduto.value),
        s_desc_produto:f_descricao.value,
        n_qtde_produto:Number(f_quantidade.value),
        n_id_fornecedor:Number(f_fornecedor.value),
        c_status_produto:f_status.value
    }

    // Validação antes de enviar
    if (
        !f_codigo.value.trim() ||
        !f_tipoProduto.value ||
        !f_descricao.value.trim() ||
        !f_quantidade.value ||
        !f_fornecedor.value ||
        !f_status.value
    ) {
        let config = {
            titulo: "Alerta",
            texto: "Preencha todos os campos",
            cor: "#F08080",
            tipo: "ok",
            ok: () => {},
            sim: () => {},
            nao: () => {}
        };
        Cxmsg.mostrar(config);
        return; // Impede de continuar
    }

    
    const cab = {
        method:'post',
        body: JSON.stringify(dados)
    }

    let endpoint_novoEditarProduto = null
    if(modojanela=="n"){
        endpoint_novoEditarProduto = `${serv}/novoproduto`
    }else{
        endpoint_novoEditarProduto = `${serv}/editarproduto`
    }

    fetch(endpoint_novoEditarProduto,cab)
    .then(res=>{
        if(res.status==200){
            if(modojanela=="n"){
                let config={
                    titulo:"Alerta",
                    texto:"Novo produto gravado com sucesso!",
                    cor:"#6FA0C8",
                    tipo:"ok",
                    ok:()=>{},
                    sim:()=>{},
                    nao:()=>{}
            } 
            Cxmsg.mostrar(config)
                f_codigo.value=""
                f_tipoProduto.value=""
                f_status.value=""
                f_descricao.value=""
                f_quantidade.value=""
                f_fornecedor.value=""
                novoProduto.classList.add("ocultarPopup")
          
                carregarProdutos()
            }else{
                let config={
                    titulo:"Alerta",
                    texto:"Produto editado com sucesso!",
                    cor:"#6FA0C8",
                    tipo:"ok",
                    ok:()=>{},
                    sim:()=>{},
                    nao:()=>{}
            } 
            Cxmsg.mostrar(config)
            carregarProdutos()
            }
        }else{
            let config={
                titulo:"Alerta",
                texto:"Erro ao gravar novo produto!",
                cor:"#6FA0C8",
                tipo:"ok",
                ok:()=>{},
                sim:()=>{},
                nao:()=>{}
        } 
        Cxmsg.mostrar(config)
            console.error("Erro ao gravar novo produto")
        }
    })
})

btn_cancelarPopup.addEventListener("click",(evt)=>{
    if(modojanela=="n"){
        f_codigo.value=""
        f_tipoProduto.value=""
        f_status.value=""
        f_descricao.value=""
        f_quantidade.value=""
        f_fornecedor.value=""
        novoProduto.classList.add("ocultarPopup")
    }else{
        novoProduto.classList.add("ocultarPopup")
    }
});

const endpoint_tiposProdutos  = `${serv}/tipoproduto`
fetch(endpoint_tiposProdutos)
.then(res=>res.json())
.then(res=>{
    f_tipoProduto.innerHTML=""

    res.forEach(e=>{
        const opt = document.createElement("option")
        opt.setAttribute("value",e.n_tipoProduto_tipoProduto)
        opt.innerHTML=e.s_desc_tipoProduto
        f_tipoProduto.appendChild(opt)
    })
})

const endpoint_fornecedorProduto  = `${serv}/fornecedorproduto`
fetch(endpoint_fornecedorProduto)
.then(res=>res.json())
.then(res=>{
    f_fornecedor.innerHTML=""

    res.forEach(e=>{
        const opt = document.createElement("option")
        opt.setAttribute("value",e.n_id_fornecedor)
        opt.innerHTML=e.s_desc_fornecedor
        f_fornecedor.appendChild(opt)
    })
})

// const converte_imagem_b64 = (localDestino,arquivoimg) => {
//     const obj = arquivoimg
//     const reader = new FileReader()
//     reader.addEventListener("load",(evt)=>{
//         // const res = reader.result
//         localDestino.src=reader.result
//     })
//     if(obj){
//         reader.readAsDataURL(obj)
//     }
// }