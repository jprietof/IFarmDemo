$(function(){
    selectCategory();
    selectFarm();
    selectClient();
});
//Categorias
function selectCategory(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let newFarm = $("#categID");
            let updateFarm = $("#uptCatID")
            $.each(respuesta, function (id, category) {
                newFarm.append('<option value='+category.id+'>'+category.name+'</option>');
                updateFarm.append('<option value='+category.id+'>'+category.name+'</option>');
                console.log("select "+category.id);
            }); 
        }
    })
}
//Fincas
function selectFarm(){
    $.ajax({
        url:"http://localhost:8080/api/Farm/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let newMessage = $("#farmID");
            let updateMessage = $("#uptFarm")
            let newReservation = $("#idFarm")
            let updateReservataion = $("#uptFarmm")
            $.each(respuesta, function (id, farm) {
                newMessage.append('<option value='+farm.id+'>'+farm.name+'</option>');
                updateMessage.append('<option value='+farm.id+'>'+farm.name+'</option>');
                newReservation.append('<option value='+farm.id+'>'+farm.name+'</option>');
                updateReservataion.append('<option value='+farm.id+'>'+farm.name+'</option>');
                console.log("select "+farm.name);
            }); 
        }
    })
}
//Clientes
function selectClient(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let newMessage = $("#clientID");
            let updateMessage = $("#uptClient")
            let newReservation = $("#idClient")
            let updateReservataion = $("#uptClientt")
            $.each(respuesta, function (id, client) {
                newMessage.append('<option value='+client.id+'>'+client.name+'</option>');
                updateMessage.append('<option value='+client.id+'>'+client.name+'</option>');
                newReservation.append('<option value='+client.id+'>'+client.name+'</option>');
                updateReservataion.append('<option value='+client.id+'>'+client.name+'</option>');
                //console.log("select "+category.id);
            }); 
        }
    })
}
//Mensajes
//Reservas