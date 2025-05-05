import { Cxmsg } from "../../utils/cxmsg.js";
import { maiorZIndex } from "../../utils/utils.js"

const login = document.querySelector("#login")
const f_email = document.querySelector("#f_email")
const f_email1 = document.querySelector("#f_email1")
const f_password = document.querySelector("#f_password")
const f_password1 = document.querySelector("#f_password1")
const f_password2 = document.querySelector("#f_password2")
const btn_login = document.querySelector("#btn_login")

const iddefsenha = document.querySelector("#iddefsenha")

const primeiroacesso = document.querySelector("#primeiroacesso")
const btn_fecharPopup = document.querySelector("#btn_fecharPopup")
const btn_gravarSenha = document.querySelector("#btn_gravarSenha")
const btn_cancelar = document.querySelector("#btn_cancelar")

let serv = null

sessionStorage.setItem("id_logado","-1")
sessionStorage.setItem("nome_logado","-1")

const endpoint_config = `../../config.txt`
fetch(endpoint_config)
.then(res=>res.json())
.then(res=>{
    sessionStorage.setItem("servidor_nodered",res.servidor_nodered)
    sessionStorage.setItem("versao",res.versao)
    serv = res.servidor_nodered
})

btn_login.addEventListener("click",(evt)=>{
    if(serv!=null){
        const email = f_email.value
        let senha = f_password.value

        if(senha==""){
            senha="-1"
        }

        const endpoint = `${serv}/login/${email}/${senha}`
        fetch(endpoint)
        .then(res => res.json())
        .then(res=>{
            if(res.retorno==200){//Senha certa
                console.log("Senha Certa")
                console.log(res)

                sessionStorage.setItem("id_logado", res.n_id_pessoa)
                sessionStorage.setItem("nome_logado", res.s_nome_pessoa)
                sessionStorage.setItem("id_token", res.insertId)
                sessionStorage.setItem("token", res.token)
                window.location.href="./main.html"
            }else if(res[0].retorno==208){//Senha errada
                console.log("Senha Errada")
                let config={
                    titulo:"Alerta!",
                    texto:"Senha incorreta!",
                    cor:"#6FA0C8",
                    tipo:"ok",
                    ok:()=>{
                        f_password.value=""
                        f_password.focus()
                    },
                    sim: ()=>{},
                    nao: ()=>{}
                }
                Cxmsg.mostrar(config)
                
            }else if(res[0].retorno==205){//Primeiro acesso
                console.log("Primeiro Acesso")
                let config={
                    titulo:"Alerta!",
                    texto:"Primeiro Acesso!",
                    cor:"#6FA0C8",
                    tipo:"ok",
                    ok:()=>{
                        f_email1.value= f_email.value
                        primeiroacesso.classList.remove("ocultarPopup")
                        login.classList.add("ocultarPopup")
                    },
                    sim: ()=>{},
                    nao: ()=>{}
                }
                Cxmsg.mostrar(config)
                console.log(f_email1.value)
            }
        })
    }
})

btn_fecharPopup.addEventListener("click", (evt)=>{
    primeiroacesso.classList.add("ocultarPopup")
    login.classList.remove("ocultarPopup")
})

btn_gravarSenha.addEventListener("click",(evt)=>{
    const dados = {
        s_email_pessoa: f_email1.value,
        s_password_pessoa: f_password2.value
    }

    const cab = {
        method:'post',
        body: JSON.stringify(dados)
    }
    if(f_password1.value != "" && f_password2.value != ""){
        if(f_password1.value == f_password2.value){
            const endpoint = `${serv}/criasenha`
            fetch(endpoint, cab)
            .then(res=>{
                let config={
                    titulo:"Alerta!",
                    texto:"Senha gravada!",
                    cor:"#6FA0C8",
                    tipo:"ok",
                    ok:()=>{
                        primeiroacesso.classList.add("ocultarPopup")
                        window.location.href="./main.html"
                    },
                    sim: ()=>{},
                    nao: ()=>{}
                }
                Cxmsg.mostrar(config)
            })
        }else{
            let config={
                titulo:"Alerta!",
                texto:"As senhas não conferem!",
                cor:"#6FA0C8",
                tipo:"ok",
                ok:()=>{},
                sim: ()=>{},
                nao: ()=>{}
            }
            Cxmsg.mostrar(config)
        }
    }else{
        let config={
            titulo:"Alerta!",
            texto:"Preencha ambos os campos!",
            cor:"#6FA0C8",
            tipo:"ok",
            ok:()=>{},
            sim: ()=>{},
            nao: ()=>{}
        }
        Cxmsg.mostrar(config)
        if(f_password1.value == ""){
            f_password1.focus()
        }else if(f_password2.value == ""){
            f_password2.focus()
        }
    }
   
})

btn_cancelar.addEventListener("click",(evt)=>{
    f_password1.value=""
    f_password2.value=""
    f_email1.value=""
    primeiroacesso.classList.add("ocultarPopup")
    login.classList.remove("ocultarPopup")
})