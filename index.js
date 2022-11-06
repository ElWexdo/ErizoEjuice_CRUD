var selectedRow = null;

// Muestra las alertas
function showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const main = document.querySelector('.main');
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
};

//Borrar campos
function clearText(){
    document.querySelector("#pedidoWoo").value ="";
    document.querySelector("#fullName").value ="";
    document.querySelector("#store").value ="";
    document.querySelector("#money").value ="";
}

//Guardar pedido
document.querySelector("#pedido-formulario").addEventListener("submit", (e)=>{
    e.preventDefault();

    //Obtiene los datos de los campos
    const pedidoWoo = document.querySelector("#pedidoWoo").value;
    const fullName = document.querySelector("#fullName").value;
    const store = document.querySelector("#store").value;
    const money = document.querySelector("#money").value;

    //Validador informacion
    if(pedidoWoo == "" || fullName == "" || store== "" || money== ""){
        showAlert("Hacen falta datos del pedido. Por favor completa la información faltante", "danger");
    }
    //Guardar pedido
    else{
        if(selectedRow==null){
            const list = document.querySelector("#pedido-lista");
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>#${pedidoWoo}</td>
                <td>${fullName}</td>  
                <td>${store}</td>  
                <td>$${money}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Editar</a>
                <a href="#" class="btn btn-danger btn-sm delete">Borrar</a>        
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Pedido guardado", "success");
        }
        else{
            selectedRow.children[0].textContent = pedidoWoo;
            selectedRow.children[1].textContent = fullName;
            selectedRow.children[2].textContent = store;
            selectedRow.children[3].textContent = money;
            selectedRow = null;
            showAlert("Pedido actualizado", "info");
        }
        clearText();
    }
});

//Edita pedido guardado
document.querySelector("#pedido-lista").addEventListener("click", (e)=>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#pedidoWoo").value = selectedRow.children[0].textContent;
        document.querySelector("#fullName").value = selectedRow.children[1].textContent;
        document.querySelector("#store").value = selectedRow.children[2].textContent;
        document.querySelector("#money").value = selectedRow.children[3].textContent;
    }   
});

//Borrar pedido
document.querySelector('#pedido-lista').addEventListener('click', (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Pedido eliminado", "danger");
    }
});