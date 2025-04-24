import { Cxmsg } from "../../utils/cxmsg.js"
import { maiorZIndex } from "../../utils/utils.js"

const dadosGrid = document.querySelector("#dadosGrid")
const novoFornecedor = document.querySelector("#novoFornecedor")
const btn_add = document.querySelector("#btn_add")
const btn_pesq = document.querySelector("#btn_pesq")
const btn_fecharPopup = document.querySelector("#btn_fecharPopup")
const btn_fecharPopupPesq = document.querySelector("#btn_fecharPopupPesq")
const btn_cancelarPopup = document.querySelector("#btn_cancelarPopup")
const btn_gravarPopup = document.querySelector("#btn_gravarPopup")
// const telefones = document.querySelector("#telefones")
const f_nome = document.querySelector("#f_nome")
const f_status = document.querySelector("#f_status")
const f_foto = document.querySelector("#f_foto")
const img_foto = document.querySelector("#img_foto")
const f_filtragem = document.querySelector("#f_filtragem")
const pesquisa = document.querySelector("#pesquisa")
const btn_pesquisar = document.querySelector("#btn_pesquisar")
const f_pesq = document.querySelector("#f_pesq")
const f_pesqId = document.querySelector("#f_pesqId")
const f_pesqNome = document.querySelector("#f_pesqNome")
const btn_listarTudo = document.querySelector("#btn_listarTudo")
const cxbase = document.querySelector("#cxbase")
const btnListarContatos = document.querySelector("#btnListarContatos")
const listaContatosFornecedor = document.querySelector("#listaContatosFornecedor")
const btn_fecharPopupContatos = document.querySelector("#btn_fecharPopupContatos")
const dadosGrid_fornecedores = document.querySelector("#dadosGrid_fornecedores")
const btn_criarNovoContatoFornecedor = document.querySelector("#btn_criarNovoContatoFornecedor")
const dadosGrid_listaContatosFornecedorAdd = document.querySelector("#dadosGrid_listaContatosFornecedorAdd")
const telefonesFornecedores = document.querySelector("#telefonesFornecedores")
const dadosGrid_telefonesFornecedor = document.querySelector("#dadosGrid_telefonesFornecedor")
const btn_fecharPopupTelFornecedores = document.querySelector("#btn_fecharPopupTelFornecedores")
const novoContatoFornecedor = document.querySelector("#novoContatoFornecedor")

//n=novo Fornecedor | e=editar Fornecedor
let modojanela = "n"
const serv=sessionStorage.getItem("servidor_nodered")

f_filtragem.addEventListener("keyup",(evt)=>{
    console.log("tecla")
    const linhas = [...document.querySelectorAll(".linhaGrid")]
    let input, texto, filtragem
    input = evt.target
    filtragem = input.value.toUpperCase()
    for(let i=0; i < linhas.length; i++){
        texto = linhas[i].children[1].innerHTML
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
        const endpoint_pesq = `${serv}/pesquisafornecedor/${tipo}/${f_pesq.value}`
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
    carregarFornecedores()
})

const carregarFornecedores = () =>{
    const endpoint_todosfornecedores = `${serv}/todosfornecedores`;
    fetch(endpoint_todosfornecedores)
    .then(res=>res.json())
    .then(res=>{
        dadosGrid.innerHTML=""
        res.forEach(e => {
            criarLinha(e)
        });
    })
}
carregarFornecedores()

const criarLinha = (e) =>{
    const divlinha = document.createElement("div")
            divlinha.setAttribute("class","linhaGrid")

            const divc1 = document.createElement("div")
            divc1.setAttribute("class", "colunaLinhaGrid c1")
            divc1.innerHTML=e.n_id_fornecedor
            divlinha.appendChild(divc1)

            const divc2 = document.createElement("div")
            divc2.setAttribute("class", "colunaLinhaGrid c2")
            divc2.innerHTML=e.s_desc_fornecedor
            divlinha.appendChild(divc2)

            const divc3 = document.createElement("div")
            divc3.setAttribute("class", "colunaLinhaGrid c3")
            divc3.innerHTML=e.c_status_fornecedor
            divlinha.appendChild(divc3)

            const divc4 = document.createElement("div")
            divc4.setAttribute("class", "colunaLinhaGrid c4")
            divlinha.appendChild(divc4)

            const img_status = document.createElement("img")
            if(e.c_status_fornecedor == "A"){
                img_status.setAttribute("src", "../../img/on.svg")
            }else{
                img_status.setAttribute("src", "../../img/off.svg")
            }
            img_status.setAttribute("data-idfornecedor",e.n_id_fornecedor)
            img_status.setAttribute("class", "icone_op")
            img_status.addEventListener("click", (evt)=>{
                const idfornecedor =evt.target.dataset.idfornecedor
                if(evt.target.getAttribute("src")=="../../img/on.svg"){
                    const endpoint_mudarStatus = `${serv}/mudarStatusFornecedor/${idfornecedor}/I`
                    fetch(endpoint_mudarStatus)
                    .then(res=>{
                        if(res.status==200){
                            evt.target.setAttribute("src","../../img/off.svg")
                            evt.target.parentNode.parentNode.childNodes[2].innerHTML="I"
                            
                        }
                    })
                }else{
                    const endpoint_mudarStatus = `${serv}/mudarStatusFornecedor/${idfornecedor}/A`
                    fetch(endpoint_mudarStatus)
                    .then(res=>{
                        if(res.status==200){
                            evt.target.setAttribute("src","../../img/on.svg")
                            evt.target.parentNode.parentNode.childNodes[2].innerHTML="A"
                        }
                    })
                }
            })
            divc4.appendChild(img_status)


            const img_editar = document.createElement("img")
            img_editar.setAttribute("src", "../../img/edit.svg")
            img_editar.setAttribute("class", "icone_op")
            img_editar.addEventListener("click",(evt)=>{
                modojanela = "e"
                document.getElementById("tituloJanela").innerHTML = "Editar Fornecedor";
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML
                let endpoint = `${serv}/dadosfornecedor/${id}`
                fetch(endpoint)
                .then(res=>res.json())
                .then(res=>{
                    btn_gravarPopup.setAttribute("data-idfornecedor",id)
                    f_nome.value=res[0].s_desc_fornecedor
                    f_status.value=res[0].c_status_fornecedor
                    img_foto.src=res[0].s_logo_fornecedor
                    novoFornecedor.classList.remove("ocultarPopup")
                    if(res[0].s_logo_fornecedor==""){
                        img_foto.classList.add("esconderElemento")
                    }else{
                        img_foto.classList.remove("esconderElemento")
                    }
                })
            })
            divc4.appendChild(img_editar)

            const img_delete = document.createElement("img")
            img_delete.setAttribute("src", "../../img/delete.svg")
            img_delete.setAttribute("class", "icone_op")
            img_delete.addEventListener("click",(evt)=>{
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML
                let config={
                    titulo:"Alerta",
                    texto:"Deseja realmente excluir o Fornecedor?",
                    cor:"#6FA0C8",
                    tipo:"sn",
                    ok:()=>{
                        console.log("ok clicado")
                    },
                    sim: ()=>{
                        const endpoint_deletaFornecedor = `${serv}/deletafornecedor/${id}`
                        fetch(endpoint_deletaFornecedor)
                        .then(res=>{
                            if(res==200){
                                evt.target.parentNode.parentNode.remove();
                            }
                            carregarFornecedores()
                            config={
                                titulo:"Alerta",
                                texto:"Fornecedor excluído com sucesso!",
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

            divc4.appendChild(img_delete)

            dadosGrid.appendChild(divlinha)
}

btn_add.addEventListener("click",(evt)=>{
    modojanela = "n"
    document.getElementById("tituloJanela").innerHTML = "Novo Fornecedor";

    novoFornecedor.classList.remove("ocultarPopup")

    f_nome.value=""
    f_status.value=""
    f_foto.value=""
    img_foto.setAttribute("src","")
    img_foto.classList.add("esconderElemento")
});

btn_fecharPopup.addEventListener("click",(evt)=>{
    f_nome.value=""
    f_nome.value=""
    f_status.value=""
    f_foto.value=""
    img_foto.setAttribute("src","")
    img_foto.classList.add("esconderElemento")
    novoFornecedor.classList.add("ocultarPopup")
});

btn_gravarPopup.addEventListener("click",(evt)=>{
    const contato =[...document.querySelectorAll(".novoContatoFornecedor")]
    let a_contatos = []
    contato.forEach(c => {
        console.log(c.firstChild.innerHTML)
        a_contatos.push(c.firstChild.innerHTML)
    })

    const dados ={
        n_id_fornecedor: evt.target.dataset.idfornecedor,
        s_desc_fornecedor:f_nome.value,
        c_status_fornecedor:f_status.value,
        listaContatos:a_contatos,
        s_logo_fornecedor:img_foto.getAttribute("src")
    }
    
    const cab = {
        method:'post',
        body: JSON.stringify(dados)
    }

    let endpoint_novoEditarFornecedor = null
    if(modojanela=="n"){
        endpoint_novoEditarFornecedor = `${serv}/novofornecedor`
    }else{
        endpoint_novoEditarFornecedor = `${serv}/editarfornecedor`
    }

    fetch(endpoint_novoEditarFornecedor,cab)
    .then(res=>{
        if(res.status==200){
            if(modojanela=="n"){
                let config={
                    titulo:"Alerta",
                    texto:"Novo Fornecedor gravado!",
                    cor:"#6FA0C8",
                    tipo:"ok",
                    ok:()=>{},
                    sim:()=>{},
                    nao:()=>{}
            } 
            Cxmsg.mostrar(config)
                f_nome.value=""
                f_status.value=""
                f_foto.value=""
                img_foto.setAttribute("src","")
                document.getElementById("dadosGrid_listaContatosFornecedorAdd")?.remove()
                novoFornecedor.classList.add("ocultarPopup")
                carregarFornecedores()
                img_foto.classList.add("esconderElemento")

            }else{
                let config={
                    titulo:"Alerta",
                    texto:"Fornecedor editado com sucesso!",
                    cor:"#6FA0C8",
                    tipo:"ok",
                    ok:()=>{},
                    sim:()=>{},
                    nao:()=>{}
            } 
            Cxmsg.mostrar(config)
            carregarFornecedores()
            }
        }else{
            let config={
                titulo:"Alerta",
                texto:"Erro ao gravar novo Fornecedor!",
                cor:"#6FA0C8",
                tipo:"ok",
                ok:()=>{},
                sim:()=>{},
                nao:()=>{}
        } 
        Cxmsg.mostrar(config)
            console.error("Erro ao gravar novo Fornecedor")
        }
    })
})

btn_cancelarPopup.addEventListener("click",(evt)=>{
    if(modojanela=="n"){
        f_nome.value=""
        f_nome.value=""
        f_status.value=""
        f_foto.value=""
        img_foto.setAttribute("src","")
    }else{
        novoFornecedor.classList.add("ocultarPopup")
    }
});



const converte_imagem_b64 = (localDestino,arquivoimg) => {
    const obj = arquivoimg
    const reader = new FileReader()
    reader.addEventListener("load",(evt)=>{
        // const res = reader.result
        localDestino.src=reader.result
    })
    if(obj){
        reader.readAsDataURL(obj)
    }
}

f_foto.addEventListener("change",(evt)=>{
    converte_imagem_b64(img_foto,evt.target.files[0])
    img_foto.classList.remove("esconderElemento")
})

const addLinhaContatoFornecedor = (id,nome) =>{
    const divlinha = document.createElement("div")
    divlinha.setAttribute("class","linhaGrid novoContatoFornecedor novaLinhaContato")
    divlinha.setAttribute("id","novoContatoFornecedor")


    const divc1 = document.createElement("div")
    divc1.setAttribute("class", "colunaLinhaGrid c1_fornecedores")
    divc1.innerHTML=id
    divlinha.appendChild(divc1)

    const divc2 = document.createElement("div")
    divc2.setAttribute("class", "colunaLinhaGrid c2_fornecedores")
    divc2.innerHTML=nome
    divlinha.appendChild(divc2)

    const divc3 = document.createElement("div")
    divc3.setAttribute("class", "colunaLinhaGrid c3_fornecedores")
    divlinha.appendChild(divc3)

    const img_verFone = document.createElement("img")
    img_verFone.setAttribute("src", "../../img/telefone.svg")
    img_verFone.setAttribute("class", "icone_op")
    img_verFone.addEventListener("click",(evt)=>{
        const id = evt.target.parentNode.parentNode.firstChild.innerHTML
        console.log(id)
        let endpoint = `${serv}/retornatelefones/${id}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            dadosGrid_telefonesFornecedor.innerHTML=""
            telefonesFornecedores.classList.remove("ocultarPopup")
            const mzi = maiorZIndex()+2
            telefonesFornecedores.setAttribute("style",`z-index:${mzi} !important`)
            res.forEach(e=>{
                console.log(e.s_numero_telefone)
                mostrarTelefonesFornecedor(e.s_numero_telefone)
            })
        })
    })
    divc3.appendChild(img_verFone)

    const img_removerContato = document.createElement("img")
    img_removerContato.setAttribute("src", "../../img/delete.svg")
    img_removerContato.setAttribute("class", "icone_op")
    img_removerContato.addEventListener("click", (evt)=>{
        evt.target.parentNode.parentNode.remove()
    })
    divc3.appendChild(img_removerContato)

    dadosGrid_listaContatosFornecedorAdd.appendChild(divlinha)
}

const mostrarTelefonesFornecedor = (telefone) =>{
    const divlinha = document.createElement("div")
    divlinha.setAttribute("class","linhaGrid")

    const divc2 = document.createElement("div")
    divc2.setAttribute("class", "colunaLinhaGrid c2_fornecedoresAdd")
    divc2.innerHTML=telefone
    divlinha.appendChild(divc2)

    dadosGrid_telefonesFornecedor.appendChild(divlinha)
}

const criarLinhaContatoFornecedor = (e)=>{
    const divlinha = document.createElement("div")
    divlinha.setAttribute("class","linhaGrid novaLinhaContato")

    const divc1 = document.createElement("div")
    divc1.setAttribute("class", "colunaLinhaGrid c1_fornecedores")
    divc1.innerHTML=e.n_id_pessoa
    divlinha.appendChild(divc1)

    const divc2 = document.createElement("div")
    divc2.setAttribute("class", "colunaLinhaGrid c2_fornecedores")
    divc2.innerHTML=e.s_nome_pessoa
    divlinha.appendChild(divc2)

    const divc3 = document.createElement("div")
    divc3.setAttribute("class", "colunaLinhaGrid c3_fornecedores")
    divlinha.appendChild(divc3)

    const img_addContato = document.createElement("img")
    img_addContato.setAttribute("src", "../../img/addContato.svg")
    img_addContato.setAttribute("class", "icone_op")
    img_addContato.addEventListener("click", (evt)=>{
        const linha = evt.target.parentNode.parentNode
        const id = linha.childNodes[0].innerHTML
        const nome = linha.childNodes[1].innerHTML
        addLinhaContatoFornecedor(id, nome)

    })
    divc3.appendChild(img_addContato)


    const img_verFone = document.createElement("img")
    img_verFone.setAttribute("src", "../../img/telefone.svg")
    img_verFone.setAttribute("class", "icone_op")
    img_verFone.addEventListener("click",(evt)=>{
        const id = evt.target.parentNode.parentNode.firstChild.innerHTML
        console.log(id)
        let endpoint = `${serv}/retornatelefones/${id}`
        fetch(endpoint)
        .then(res=>res.json())
        .then(res=>{
            dadosGrid_telefonesFornecedor.innerHTML=""
            telefonesFornecedores.classList.remove("ocultarPopup")
            const mzi = maiorZIndex()+2
            telefonesFornecedores.setAttribute("style",`z-index:${mzi} !important`)
            res.forEach(e=>{
                console.log(e.s_numero_telefone)
                mostrarTelefonesFornecedor(e.s_numero_telefone)
            })
        })
    })
    divc3.appendChild(img_verFone)

    dadosGrid_fornecedores.appendChild(divlinha)
}

btn_fecharPopupTelFornecedores.addEventListener("click",(evt)=>{
    telefonesFornecedores.classList.add("ocultarPopup")
})

btnListarContatos.addEventListener("click",(evt)=>{
    listaContatosFornecedor.classList.remove("ocultarPopup")
    let mzi = maiorZIndex()+1
    listaContatosFornecedor.setAttribute("style",`z-index:${mzi} !important`)
    dadosGrid_fornecedores.innerHTML=""
    const endpoint = `${serv}/todaspessoasfornecedor`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
        res.forEach(e => {
            criarLinhaContatoFornecedor(e)
        })
    })
})

btn_fecharPopupContatos.addEventListener("click",(evt)=>{
    listaContatosFornecedor.classList.add("ocultarPopup")
})



// document.addEventListener("DOMContentLoaded", function () {
//     const telefoneInput = document.querySelector("#f_telefone");

//      // Impede que caracteres não numéricos sejam digitados
//      telefoneInput.addEventListener("keypress", function (event) {
//         if (!/[0-9]/.test(event.key) && !(event.key=="Enter")) {
//             event.preventDefault();
//         }
//     });

//     telefoneInput.addEventListener("input", function () {
//         let valor = telefoneInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos
//         if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 caracteres

//         // Aplica a máscara
//         if (valor.length > 10) {
//             telefoneInput.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7, 11)}`;
//         } else if (valor.length > 6) {
//             telefoneInput.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 6)}-${valor.slice(6, 10)}`;
//         } else if (valor.length > 2) {
//             telefoneInput.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 6)}`;
//         } else if (valor.length > 0) {
//             telefoneInput.value = `(${valor}`;
//         }
//     });
// });

