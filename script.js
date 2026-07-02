/* ==========================================
   ORÇAMENTO VEICULAR
   USO LOCADORA
========================================== */

let paginaAtual = 1;

const paginas = document.querySelectorAll(".pagina");
const etapas = document.querySelectorAll(".etapa");

function mostrarPagina(numero){

    paginas.forEach(p=>{

        p.classList.remove("ativa");

    });

    document
    .getElementById("pagina"+numero)
    .classList.add("ativa");

    etapas.forEach(e=>{

        e.classList.remove("ativa");

    });

    etapas[numero-1].classList.add("ativa");

    paginaAtual = numero;

}

function proximaPagina(numero){

    mostrarPagina(numero);

}

function voltarPagina(numero){

    mostrarPagina(numero);

}

/* ==========================================
   PEÇAS
========================================== */

function adicionarPeca(){

    const lista = document.getElementById("listaPecas");

    const item = document.createElement("div");

    item.className = "itemLista";

    item.innerHTML = `

        <input
        type="text"
        placeholder="Nome da peça"
        class="pecaDescricao">

        <input
        type="number"
        step="0.01"
        placeholder="0,00"
        class="pecaValor">

        <button
        class="btnExcluir">

        🗑

        </button>

    `;

    item
    .querySelector(".btnExcluir")
    .addEventListener("click",()=>{

        item.remove();

    });

    lista.appendChild(item);

}

/* ==========================================
   SERVIÇOS
========================================== */

function adicionarServico(){

    const lista = document.getElementById("listaServicos");

    const item = document.createElement("div");

    item.className="itemLista";

    item.innerHTML=`

        <input
        type="text"
        placeholder="Tipo de serviço"
        class="servicoDescricao">

        <input
        type="number"
        step="0.01"
        placeholder="0,00"
        class="servicoValor">

        <button
        class="btnExcluir">

        🗑

        </button>

    `;

    item
    .querySelector(".btnExcluir")
    .addEventListener("click",()=>{

        item.remove();

    });

    lista.appendChild(item);

}

/* ==========================================
   GERAÇÃO DO RESUMO
========================================== */

function gerarResumo(){

    resumoCliente.innerHTML = `
        <p><strong>Nome:</strong> ${nome.value}</p>
        <p><strong>Condutor:</strong> ${condutor.value}</p>
        <p><strong>Telefone:</strong> ${telefone.value}</p>
    `;

    resumoVeiculo.innerHTML = `
        <p><strong>Placa:</strong> ${placa.value}</p>
        <p><strong>Marca:</strong> ${marca.value}</p>
        <p><strong>Modelo:</strong> ${modelo.value}</p>
        <p><strong>Ano:</strong> ${ano.value}</p>
        <p><strong>Cor:</strong> ${cor.value}</p>
        <p><strong>KM:</strong> ${km.value}</p>
    `;

    gerarResumoPecas();

    gerarResumoServicos();

}

/* ==========================================
   RESUMO DAS PEÇAS
========================================== */

function gerarResumoPecas(){

    let total = 0;

    resumoPecas.innerHTML = "";

    document
    .querySelectorAll("#listaPecas .itemLista")
    .forEach(item=>{

        const descricao =
        item.querySelector(".pecaDescricao").value;

        const valor =
        Number(
            item.querySelector(".pecaValor").value
        );

        total += valor;

        resumoPecas.innerHTML += `

            <div class="resumoLinha">

                <div>

                    ${descricao}

                </div>

                <div>

                    ${formatar(valor)}

                </div>

            </div>

        `;

    });

    totalPecas.innerHTML = formatar(total);

    atualizarTotal();

}

/* ==========================================
   RESUMO DOS SERVIÇOS
========================================== */

function gerarResumoServicos(){

    let total = 0;

    resumoServicos.innerHTML = "";

    document
    .querySelectorAll("#listaServicos .itemLista")
    .forEach(item=>{

        const descricao =
        item.querySelector(".servicoDescricao").value;

        const valor =
        Number(
            item.querySelector(".servicoValor").value
        );

        total += valor;

        resumoServicos.innerHTML += `

            <div class="resumoLinha">

                <div>

                    ${descricao}

                </div>

                <div>

                    ${formatar(valor)}

                </div>

            </div>

        `;

    });

    totalServicos.innerHTML = formatar(total);

    atualizarTotal();

}

/* ==========================================
   FORMATAÇÃO EM REAL
========================================== */

function formatar(valor){

    return valor.toLocaleString(

        "pt-BR",

        {

            style:"currency",

            currency:"BRL"

        }

    );

}

/* ==========================================
   TOTAL GERAL
========================================== */

function atualizarTotal(){

    const pecas = document.getElementById("totalPecas").innerHTML;
    const servicos = document.getElementById("totalServicos").innerHTML;

    let totalP = Number(

        pecas
        .replace("R$","")
        .replace(/\./g,"")
        .replace(",",".")
        .trim()

    );

    let totalS = Number(

        servicos
        .replace("R$","")
        .replace(/\./g,"")
        .replace(",",".")
        .trim()

    );

    document.getElementById("totalGeral").innerHTML =
    formatar(totalP + totalS);

}

/* ==========================================
   VALIDAÇÃO DA PRIMEIRA TELA
========================================== */

function validarPrimeiraTela(){

    if(nome.value==""){

        alert("Informe o nome do cliente.");

        return false;

    }

    if(placa.value==""){

        alert("Informe a placa.");

        return false;

    }

    return true;

}

/* ==========================================
   PDF
========================================== */

function gerarPDF(){

    alert(

        "Na próxima etapa iremos gerar o PDF profissional."

    );

}

/* ==========================================
   MÁSCARA DA PLACA
========================================== */

placa.addEventListener("input",()=>{

    placa.value = placa.value.toUpperCase();

});

/* ==========================================
   TELEFONE
========================================== */

telefone.addEventListener("input",()=>{

    let valor = telefone.value.replace(/\D/g,'');

    valor = valor.replace(/^(\d{2})(\d)/g,'($1) $2');

    valor = valor.replace(/(\d{5})(\d)/,'$1-$2');

    telefone.value = valor;

});

/* ==========================================
   INICIA O SISTEMA
========================================== */

mostrarPagina(1);
