import { Cxmsg } from "../../utils/cxmsg.js";

const serv = sessionStorage.getItem("servidor_nodered")

const verificarToken = () => {
    const token = sessionStorage.getItem("token")
    const endpoint = `${serv}/verificatoken/${token}`
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
        if(res.retorno == 200){
            console.log("Deu bom")
            pagina()
        }else{
            alert("Token inválido!")
            console.log("Deu ruim")
        }
    })
}
verificarToken()

const pagina = () => {

    if(sessionStorage.getItem("id_logado")==-1){
        window.location.href="./index.html"
    }

    const btn_menuPrincipal = document.querySelector("#btn_menuPrincipal")
    const menuPrincipal = document.querySelector("#menuPrincipal")
    const todosmenusprincipais = [...document.querySelectorAll(".btn_menuItem")]

    const id = document.querySelector("#id")
    const nome = document.querySelector("#nome")

    const btn_logoff = document.querySelector("#btn_logoff")

    const id_logado = sessionStorage.getItem("id_logado")
    const nome_logado = sessionStorage.getItem("nome_logado")

    btn_menuPrincipal.addEventListener("click", (evt)=>{
        menuPrincipal.classList.toggle("ocultar")
    })


    todosmenusprincipais.forEach(e=>{
        e.addEventListener("click",(evt)=>{
            menuPrincipal.classList.add("ocultar")
        })
    })

    id.innerHTML = `ID: ${id_logado}`
    nome.innerHTML = `Nome: ${nome_logado}`

    btn_logoff.addEventListener("click",(evt)=>{
        let config={
            titulo:"Alerta!",
            texto:"Deseja sair?",
            cor:"#6FA0C8",
            tipo:"sn",
            ok:()=>{},
            sim: ()=>{
                sessionStorage.setItem("id_logado","-1")
                sessionStorage.setItem("nome_logado","-1")

                window.location.href="./index.html"
            },
            nao: ()=>{}
        }
        Cxmsg.mostrar(config)
    })

}