//variável vazia 
var selectedRow = null;
var selectedRowIndex = null;

let userList = JSON.parse(localStorage.getItem('users')) || [];

function rederList() {
    // HTML não esta renderizado quando chama a funcao na primeira vez
    setTimeout(() => {
        for (user of userList) {
            inserttable(user) // {nome: ', opcao:'', cafe: '}

        }

    }, 200)

}

rederList()

function insert() {

    if (validateForm()) {
        var formdata = insertform()
        if (selectedRow == null) {
            inserttable(formdata) // Acrescento na lista
            userList.push(formdata)
            saveOnLocalStorage()
            document.getElementById("busca").classList.add("hide");

        }
        else { // editando
            upform(formdata)
            userList[selectedRowIndex] = formdata
            saveOnLocalStorage()
        }
        clearform()
    }
}

//função para armazenar os dados 
function insertform() {
    var saveform = {};
    saveform["nome"] = document.getElementById('nome').value
    saveform["opcao"] = document.getElementById('opcao').value
    saveform["cafe"] = document.getElementById('cafe').value

    return saveform
}

//função para colocar dados . Que vai receber como parametro 
//o objeto que está armazenando os input.value 
function inserttable(data) {
    let pos;
    if (userList.indexOf(data) > -1) {
        pos = userList.indexOf(data);
    } else {
        pos = userList.length;
    }

    var table = document.getElementById('mytable').getElementsByTagName('tbody')[0]
    var newRow = table.insertRow(table.length)
    cell1 = newRow.insertCell(0)
    cell1.innerHTML = data.nome
    cell1 = newRow.insertCell(1)
    cell1.innerHTML = data.opcao
    cell1 = newRow.insertCell(2)
    cell1.innerHTML = data.cafe
    cell1 = newRow.insertCell(3)
    cell1.innerHTML = '<a onClick="onEdit(this, ' + pos + ')">Edit</a> | <a onClick="onDelete(this, ' + pos + ')">Delete</a>';
}


//função para atualizar cadastro
//recebe o formdata como parâmetro
function upform(data) {
    selectedRow.cells[0].innerHTML = data.nome
    selectedRow.cells[1].innerHTML = data.opcao
    selectedRow.cells[2].innerHTML = data.cafe
}

//limpar formullário 
function clearform() {
    document.getElementById('nome').value = "";
    document.getElementById('opcao').value = "";
    document.getElementById('cafe').value = "";
    selectedRow = null;
    selectedRowIndex = null;
}
//Função para editar o registro
function onEdit(data, index) {
    selectedRow = data.parentElement.parentElement;
    selectedRowIndex = index;
    document.getElementById("nome").value = selectedRow.cells[0].innerHTML
    document.getElementById("opcao").value = selectedRow.cells[1].innerHTML;
    document.getElementById("cafe").value = selectedRow.cells[2].innerHTML
}
//Função para excluir o registro
function onDelete(data, index) {

    if (confirm("Tem certeza de que deseja excluir este registro?")) {
        row = data.parentElement.parentElement;
        document.getElementById("mytable").deleteRow(row.rowIndex);

        userList.splice(index, 1);
        saveOnLocalStorage()
        clearform();
    }
}

function validateForm() {
    isValid = true;
    if (document.getElementById("nome").value == "") {
        isValid = false;
        document.getElementById("validateName").classList.remove("hide");
    }
    else {
        isValid = true;
        if (!document.getElementById("validateName").classList.contains("hide")) {
            document.getElementById("validateName").classList.add("hide");
        }
        return isValid;
    }
}

function search() {

    cleanTable();

    let name = document.getElementById("nome").value
    let sala = document.getElementById("opcao").value

    let pessoas = userList.filter(user => {
        return user.nome.toLowerCase().indexOf(name) !== -1 || !name
    })

    let resultSearch = filtraSala(pessoas, sala)

    if(resultSearch.length < 1) {
       alert('Valor não encontrado');
       document.getElementById('busca').classList.add('hide1');
    } else {
        document.getElementById('busca').classList.remove('hide1');
    }

    for (user of resultSearch) {
        var table = document.getElementById('busca').getElementsByTagName('tbody')[0]
        var newRow = table.insertRow(table.length)
        cell1 = newRow.insertCell(0)
        cell1.innerHTML = user.nome
        cell1 = newRow.insertCell(1)
        cell1.innerHTML = user.opcao
        cell1 = newRow.insertCell(2)
        cell1.innerHTML = user.cafe

    }
    clearform()

}

function cleanTable(){
   var table = document.getElementById("busca");

   var headerRow = 1;

   var rowCount = table.rows.length;

   for (let index = headerRow; index < rowCount; index++) {
       table.deleteRow(headerRow)
   }

}
    

function filtraSala(pessoas, sala) {

    let resultPessoas = pessoas.filter(user => {
        return user.opcao.indexOf(sala) !== -1 || !sala
    })

    return resultPessoas;
}

function saveOnLocalStorage() {
    localStorage.setItem("users", JSON.stringify(userList));
}



