const ulDisplay = document.querySelector('.containerListaProdutos ul');

function montarListaProdutos(listaProdutos, ulTotal) {
    ulTotal.innerHTML = '';

    listaProdutos.forEach((produto) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        const span = document.createElement('span');
        const listaComponentes = document.createElement('ol');
        listaComponentes.classList.add("listaNutrientes")
        const carrinho = document.createElement('button');
        carrinho.classList.add("carrinhoDeCompras")

        img.src = produto.img;
        img.alt = produto.nome;
        h3.innerText = produto.nome;
        p.innerText = `R$ ${produto.preco.replace(".", ",")}`;
        span.innerText = produto.secao;

        const nutrientes = produto.componentes;
        nutrientes.forEach((nutriente) => {
            const li = document.createElement("li");
            li.innerText = nutriente;
            listaComponentes.appendChild(li);
        });

        carrinho.innerText = "Adicionar ao Carrinho"; //botão de adicionar ao carrinho
        carrinho.id = produto.id;
        li.id = produto.id
        li.appendChild(img);
        li.appendChild(h3);
        li.appendChild(p);
        li.appendChild(span);
        li.appendChild(listaComponentes);
        li.appendChild(carrinho);

        ulTotal.appendChild(li);
    });

}
///chamada da função 
montarListaProdutos(produtos, ulDisplay)
///filtrar por hortifruti 
function filtrarPorHortifruti() {
    const listaHortifruti = produtos.filter((produto) => {
        return produto.secao === 'Hortifruti';
    });
    montarListaProdutos(listaHortifruti, ulDisplay);

}
const botaoMostrarHortifruti = document.querySelector('.estiloGeralBotoes--filtrarHortifruti');
botaoMostrarHortifruti.addEventListener('click', filtrarPorHortifruti);


///mostrar todos 
function mostrarTodosProdutos() {
    montarListaProdutos(produtos, ulDisplay);
    
}
const botaoMostrarTodos = document.querySelector('.estiloGeralBotoes--mostrarTodos');
botaoMostrarTodos.addEventListener("click", mostrarTodosProdutos);

//filtrar por campo
function campo() {
    const digitarNoCampo = document.querySelector(".campoBuscaPorNome").value
    const novoArray = produtos.filter((produto) => {
        return produto.nome.toLowerCase() === digitarNoCampo.toLowerCase()
            || produto.secao.toLowerCase() === digitarNoCampo.toLowerCase()
            || produto.categoria.toLowerCase() === digitarNoCampo.toLowerCase()
    })
    if (novoArray != 0) {
        montarListaProdutos(novoArray, ulDisplay)
    }
    // mostrarTotalProdutoDigitado.innerText = somaTotal(novoArray)
}
const botaoBuscar = document.querySelector('.estiloGeralBotoes--botaoBuscaPorNome');
botaoBuscar.addEventListener('click', campo);

const mostrarTotalProdutoDigitado = document.getElementById('precoTotal');

let carrinhoArmazenar = [];
const produtoButton = document.querySelector(".containerListaProdutos")
const containerCarrinho = document.querySelector(".containerCarrinho ul")
produtoButton.addEventListener("click", interceptarEvento);

function interceptarEvento(event) {
    const botaoDoCarrinho = event.target;
    if (botaoDoCarrinho.tagName === "BUTTON") {
        const filtrarProdutosDoCarrinho = produtos.filter((produto) => {
            return produto.id == botaoDoCarrinho.id
            
        })
        carrinhoArmazenar.push(filtrarProdutosDoCarrinho[0])
        console.log(carrinhoArmazenar)
        adicionarCarrinho(carrinhoArmazenar)
    }
}

function adicionarCarrinho(carrinhoArmazenar) {
    montarListaProdutos(carrinhoArmazenar, containerCarrinho)

    const totalPreco = carrinhoArmazenar.reduce((soma, produtos) => {
        soma += Number(produtos.preco)
        return soma
    }, 0)
    const mostrarTotalProdutos = document.querySelector('#precoTotal');
    mostrarTotalProdutos.innerText = totalPreco

    const totalItens = carrinhoArmazenar.length
    const mudarQuantidadeDeItens = document.getElementById("totalItens")
    mudarQuantidadeDeItens.innerHTML = totalItens
}