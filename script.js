let todosOsDados = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            todosOsDados = data;
            mostrarResultados(todosOsDados);
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
});

function pesquisar() {
    const termo = document.getElementById('campo-pesquisa').value.toLowerCase();
    if (termo.trim() === '') {
        mostrarResultados(todosOsDados);
        return;
    }
    const resultados = todosOsDados.filter(item => {
        return item.titulo.toLowerCase().includes(termo) ||
               item.descricao.toLowerCase().includes(termo) ||
               item.tags.toLowerCase().includes(termo);
    });
    mostrarResultados(resultados);
}

function mostrarResultados(resultados) {
    const container = document.querySelector('.card-container');
    container.innerHTML = ''; 

    if (resultados.length === 0) {
        container.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    resultados.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card';

        const titulo = document.createElement('h2');
        titulo.textContent = item.titulo;

        const descricao = document.createElement('p');
        descricao.textContent = item.descricao;

        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = 'Ver Dica Completa →';
        link.target = '_blank'; 

        card.appendChild(titulo);
        card.appendChild(descricao);
        card.appendChild(link);

        container.appendChild(card);
    });
}
