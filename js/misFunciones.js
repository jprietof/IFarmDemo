ocultarElementos();
mostarElementos();
function ocultarElementos(){
    $("#newFarm").hide();
    $("#newClient").hide();
    $("#newMessage").hide();
    $("#newCategory").hide();
    $("#newReservation").hide();
    $("#updateFarm").hide();
    $("#updateClient").hide();
    $("#updateMessage").hide();
    $("#updateCategory").hide();
    $("#updateReservation").hide();
}
function mostarElementos() {
    //formFarm
    $("#btnFarm").on("click", function(e){
        $("#newFarm").toggle();
        $("#newClient").hide();
        $("#newMessage").hide();
        $("#newCategory").hide();
        $("#newReservation").hide();
        $("#updateFarm").hide();
        $("#updateClient").hide();
        $("#updateMessage").hide();
        $("#updateCategory").hide();
        $("#updateReservation").hide();
    });
    //formClient
    $("#btnClient").on("click", function(e){
        $("#newFarm").hide();
        $("#newClient").toggle();
        $("#newMessage").hide();
        $("#newCategory").hide();
        $("#newReservation").hide();
        $("#updateFarm").hide();
        $("#updateClient").hide();
        $("#updateMessage").hide();
        $("#updateCategory").hide();
        $("#updateReservation").hide();
    });
    //formMenssage
    $("#btnMessage").on("click", function(e){
        $("#newFarm").hide();
        $("#newClient").hide();
        $("#newMessage").toggle();
        $("#newCategory").hide();
        $("#newReservation").hide();
        $("#updateFarm").hide();
        $("#updateClient").hide();
        $("#updateMessage").hide();
        $("#updateCategory").hide();
        $("#updateReservation").hide();
    });
    //formCategory
    $("#btnCategory").on("click", function(e){
        $("#newFarm").hide();
        $("#newClient").hide();
        $("#newMessage").hide();
        $("#newCategory").toggle();
        $("#newReservation").hide();
        $("#updateFarm").hide();
        $("#updateClient").hide();
        $("#updateMessage").hide();
        $("#updateCategory").hide();
        $("#updateReservation").hide();
    });
    //formReservation
    $("#btnReservation").on("click", function(e){
        $("#newFarm").hide();
        $("#newClient").hide();
        $("#newMessage").hide();
        $("#newCategory").hide();
        $("#newReservation").toggle();
        $("#updateFarm").hide();
        $("#updateClient").hide();
        $("#updateMessage").hide();
        $("#updateCategory").hide();
        $("#updateReservation").hide();
    });
    
}


function traerInformacionCategorias(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionCategorias("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCategoria("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacionCategorias(){
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://localhost:8080/api/Category/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarInformacionCategorias(idElemento){
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionCategorias();
            alert("se ha Actualizado correctamente la categoria")
        }
    });

}

function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionCategorias();
            alert("Se ha Eliminado.")
        }
    });

}

////////// Finca /////////////

function traerInformacionFincas(){
    $.ajax({
        url:"http://localhost:8080/api/Farm/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta1(respuesta);
        }
    });
}

function pintarRespuesta1(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].address+"</td>";
        myTable+="<td>"+respuesta[i].extension+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionFinca("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarFinca("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";

    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}

function guardarInformacionFincas(){
    let var2 = {
        name:$("#Fname").val(),
        address:$("#Faddress").val(),
        extension:$("#Fextension").val(),
        description:$("#Fdescription").val(),
        category:$("#Fcategory").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://localhost:8080/api/Farm/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarInformacionFinca(idElemento){
    let myData={
        id:idElemento,
        name:$("#Fname").val(),
        address:$("#Faddress").val(),
        extension:$("#Fextension").val(),
        description:$("#Fdescription").val(),
        category:$("#Fcategory").val(),

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Farm/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#Fname").val("");
            $("#Faddress").val("");
            $("#Fextension").val("");
            $("#Fdescription").val("");
            traerInformacionFincas();
            alert("se ha Actualizado correctamente la Finca")
        }
    });

}

function borrarFinca(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://localhost:8080/api/Farm/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionFincas();
            alert("Se ha Eliminado la Finca.")
        }
    });

}