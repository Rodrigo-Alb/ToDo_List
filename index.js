const container_tarefas = document.getElementById("container_tarefas")
const btn = document.getElementById("btn")
let atividades;

const tarefas =(localStorage.getItem("itens"))?JSON.parse(localStorage.getItem("itens")):[];

function gerarHTML(){
    container_tarefas.innerHTML=''
    tarefas.forEach( (atividade) =>
        {
            const item_ToDo_List = document.createElement('div')
            item_ToDo_List.className = "tarefa"
            item_ToDo_List.innerHTML = atividade.html
            container_tarefas.appendChild(item_ToDo_List)
        }
    )
};

const AdicionarTarefa = () =>{

    let tarefa = document.getElementById("input_text").value
    const random = Math.floor(Math.random()*1000)
    const item = {html:`${tarefa} <span data-excluir='true' data-id='${random}' >🗑️</span> `,id: `${random}`} 

    tarefas.push(item);

    const item_ToDo_List = document.createElement('div')
    item_ToDo_List.className = "tarefa"
    item_ToDo_List.innerHTML = item.html
    item_ToDo_List.setAttribute('data-concluido','false');
    container_tarefas.appendChild(item_ToDo_List)

    localStorage.setItem("itens",JSON.stringify(tarefas))

    atividades = document.querySelectorAll(".tarefa")
    atividades.forEach( (att) => att.addEventListener('click',concluirTarefa))
    atividades.forEach( (att) => att.addEventListener('click',excluirTarefa))
}

btn.addEventListener("click",AdicionarTarefa);

const concluirTarefa = (event) =>{

    if(event.target.dataset.concluido == 'false'){
        event.target.dataset.concluido = 'true'
        event.target.style.backgroundColor = '#00ff00'
        event.target.style.transition = '0.5s'
    }else{
        event.target.dataset.concluido = 'false'
        event.target.style.transition = '0.5s'
        event.target.style.backgroundColor = '#9BF2EA'
    }
}

const excluirTarefa = (event) => {
    tarefas.forEach(
        (tarefa)=>{
            if(tarefa.id == event.target.dataset.id){
                const excluir = tarefas.indexOf(tarefa)
                tarefas.splice(excluir,1)
                localStorage.setItem("itens",JSON.stringify(tarefas))
                gerarHTML()
            }
        }
    )
}
gerarHTML()