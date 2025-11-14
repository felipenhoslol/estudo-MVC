let tarefas = []; 


function adicionarTarefaModel(descricao) {
    if (descricao) {
        const novaTarefa = {
            id: Date.now(),
            descricao: descricao
        };
        tarefas.push(novaTarefa);
        return tarefas.length;
    }
}


function removerTarefaModel(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
}


const listaUl = document.getElementById('lista-de-tarefas');


function exibirTarefasView(tarefas) {
    listaUl.innerHTML = ''; 

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${tarefa.descricao}</span>
            <button class="remover-btn" data-id="${tarefa.id}">Remover</button>
        `;
        listaUl.appendChild(li);
    });

    document.querySelectorAll('.remover-btn').forEach(button => {
        button.onclick = (event) => lidarComRemocaoController(Number(event.target.dataset.id));
    });
}

const inputTarefa = document.getElementById('nova-tarefa-input');


function lidarComAdicaoController() {
    const descricao = inputTarefa.value.trim();
    if (descricao === '') return;

    adicionarTarefaModel(descricao);

    exibirTarefasView(tarefas);

    inputTarefa.value = '';
}


function lidarComRemocaoController(id) {
    removerTarefaModel(id);

    exibirTarefasView(tarefas);
}