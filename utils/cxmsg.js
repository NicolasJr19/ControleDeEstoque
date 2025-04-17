export class Cxmsg{

    // config={
    //     titulo:"",
    //     texto:"",
    //     cor:"",
    //     ok:null,
    //     sim: null,
    //     nao: null
    // }
    static config = null

    static mostrar=(config)=>{
        this.config = config

        const cxbase = document.createElement("div")
        cxbase.setAttribute("class","cxbase")
        cxbase.setAttribute("id","cxbase")


        const cxmsg = document.createElement("div")
        cxmsg.setAttribute("class","cxmsg")
        cxbase.appendChild(cxmsg)

        //Titulo
        const titulo_cxmsg = document.createElement("div")
        titulo_cxmsg.setAttribute("class","titulo_cxmsg")
        titulo_cxmsg.setAttribute("style",`background-color:${config.cor} !important`)
        cxmsg.appendChild(titulo_cxmsg)

        const p_titulo = document.createElement("p")
        p_titulo.innerHTML=config.titulo
        titulo_cxmsg.appendChild(p_titulo)

        const img_btnFechar = document.createElement("img")
        img_btnFechar.setAttribute("class","btn_fecharCxmsg")
        img_btnFechar.setAttribute("id","btn_fecharCxmsg")
        img_btnFechar.setAttribute("src","../img/fechar.svg")
        img_btnFechar.addEventListener("click",(evt)=>{
            this.fechar()
        })
        titulo_cxmsg.appendChild(img_btnFechar)

        //Corpo
        const corpo_cxmsg = document.createElement("div")
        corpo_cxmsg.setAttribute("class","corpo_cxmsg")
        cxmsg.appendChild(corpo_cxmsg)

        const p_texto = document.createElement("p")
        p_texto.innerHTML=config.texto
        corpo_cxmsg.appendChild(p_texto)

        //Rodape
        const rodape_cxmsg = document.createElement("div")
        rodape_cxmsg.setAttribute("class","rodape_cxmsg")
        rodape_cxmsg.setAttribute("id","rodape_cxmsg")
        cxmsg.appendChild(rodape_cxmsg)

        if(config.tipo=="ok"){
            const btn_okCxmsg = document.createElement("button")
            btn_okCxmsg.setAttribute("class","btn_Cxmsg")
            btn_okCxmsg.setAttribute("id","btn_okCxmsg")
            btn_okCxmsg.innerHTML="Ok"
            btn_okCxmsg.addEventListener("click",(evt)=>{
                if(config.ok){
                    config.ok()
                }
                this.fechar()
            })
            rodape_cxmsg.appendChild(btn_okCxmsg)
        }else if(config.tipo=="sn"){
            const btn_simCxmsg = document.createElement("button")
            btn_simCxmsg.setAttribute("class","btn_Cxmsg")
            btn_simCxmsg.setAttribute("id","btn_okCxmsg")
            btn_simCxmsg.innerHTML="Sim"
            btn_simCxmsg.addEventListener("click",(evt)=>{
                if(config.sim){
                    config.sim()
                }
                this.fechar()
            })
            rodape_cxmsg.appendChild(btn_simCxmsg)

    
            const btn_naoCxmsg = document.createElement("button")
            btn_naoCxmsg.setAttribute("class","btn_Cxmsg")
            btn_naoCxmsg.setAttribute("id","btn_naoCxmsg")
            btn_naoCxmsg.innerHTML="Não"
            btn_naoCxmsg.addEventListener("click",(evt)=>{
                if(config.nao){
                    config.nao()
                }this.fechar()

            })
            rodape_cxmsg.appendChild(btn_naoCxmsg)

        }
        document.body.prepend(cxbase)
    }
    static fechar=()=>{
        document.getElementById("cxbase").remove()
    }
}