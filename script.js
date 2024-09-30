// Array de produtos com categorias
const produtos = [
    { nome: "Hambúrguer", preco: 15.00, imagem: "https://via.placeholder.com/150", quantidade: 0, categoria: "Salgados" },
    { nome: "Pizza", preco: 25.00, imagem: "https://via.placeholder.com/150", quantidade: 0, categoria: "Salgados" },
    { nome: "Coxinha", preco: 5.00, imagem: "https://via.placeholder.com/150", quantidade: 0, categoria: "Salgados" },
    { nome: "Bolo de Chocolate", preco: 12.00, imagem: "https://via.placeholder.com/150", quantidade: 0, categoria: "Doces" },
    { nome: "Pudim", preco: 8.00, imagem: "https://via.placeholder.com/150", quantidade: 0, categoria: "Doces" },
    { nome: "Refrigerante", preco: 5.00, imagem: "https://via.placeholder.com/150", quantidade: 0, categoria: "Bebidas" },
    { nome: "Suco Natural", preco: 7.00, imagem: "https://via.placeholder.com/150", quantidade: 0, categoria: "Bebidas" },
    { nome: "Água", preco: 3.00, imagem: "https://via.placeholder.com/150", quantidade: 0, categoria: "Bebidas" }
];

let valorTotal = 0;

// Função para atualizar o resumo dos itens selecionados
function atualizarResumo() {
    const selectedItemsList = document.getElementById('selected-items');
    const totalValorElement = document.getElementById('total-valor');

    selectedItemsList.innerHTML = ''; // Limpar lista

    produtos.forEach(produto => {
        if (produto.quantidade > 0) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${produto.nome} (x${produto.quantidade}) - R$ ${(produto.quantidade * produto.preco).toFixed(2)}`;
            selectedItemsList.appendChild(listItem);
        }
    });

    totalValorElement.innerText = valorTotal.toFixed(2); // Atualizar valor total
}

// Função para exibir produtos
function exibirProdutos() {
    const salgadosContainer = document.getElementById('salgados');
    const docesContainer = document.getElementById('doces');
    const bebidasContainer = document.getElementById('bebidas');

    produtos.forEach(produto => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        const productImage = document.createElement('img');
        productImage.src = produto.imagem;

        const productName = document.createElement('h3');
        productName.innerText = produto.nome;

        const productPrice = document.createElement('p');
        productPrice.innerText = `R$ ${produto.preco.toFixed(2)}`;

        const productQuantity = document.createElement('p');
        productQuantity.innerText = `Quantidade: ${produto.quantidade}`;
        productQuantity.id = `quantidade-${produto.nome}`;

        const controls = document.createElement('div');
        controls.classList.add('controls');

        const btnAdd = document.createElement('button');
        btnAdd.innerText = '+';
        btnAdd.style.fontSize = '40px';
        btnAdd.style.padding = '15px 30px'; 
        btnAdd.onclick = () => {
            produto.quantidade++;
            valorTotal += produto.preco;
            productQuantity.innerText = `Quantidade: ${produto.quantidade}`;
            atualizarResumo();
        };

        const btnRemove = document.createElement('button');
        btnRemove.innerText = '-';
        btnRemove.style.fontSize = '40px';
        btnRemove.style.padding = '15px 30px'; 
        btnRemove.onclick = () => {
            if (produto.quantidade > 0) {
                produto.quantidade--;
                valorTotal -= produto.preco;
                productQuantity.innerText = `Quantidade: ${produto.quantidade}`;
                atualizarResumo();
            }
        };

        controls.appendChild(btnRemove);
        controls.appendChild(btnAdd);

        productItem.appendChild(productImage);
        productItem.appendChild(productName);
        productItem.appendChild(productPrice);
        productItem.appendChild(productQuantity);
        productItem.appendChild(controls);

        // Adicionar o produto ao container correto
        if (produto.categoria === "Salgados") {
            salgadosContainer.appendChild(productItem);
        } else if (produto.categoria === "Doces") {
            docesContainer.appendChild(productItem);
        } else if (produto.categoria === "Bebidas") {
            bebidasContainer.appendChild(productItem);
        }
    });
}

// Função para gerar o arquivo de pedido
function enviarPedido() {
    let pedidoTexto = "Pedido da MESA 01\n\n";
    produtos.forEach(produto => {
        if (produto.quantidade > 0) {
            pedidoTexto += `${produto.nome}: ${produto.quantidade} x R$ ${produto.preco.toFixed(2)} = R$ ${(produto.quantidade * produto.preco).toFixed(2)}\n`;
        }
    });
    pedidoTexto += `\nTotal: R$ ${valorTotal.toFixed(2)}`;
    
    // Criar um arquivo .txt e baixar
    const blob = new Blob([pedidoTexto], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'MESA_01.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Chamar a função para exibir os produtos ao carregar a página
window.onload = exibirProdutos;

// Adicionar evento de clique ao botão "Enviar Pedido"
document.getElementById('send-order-btn').onclick = enviarPedido;

