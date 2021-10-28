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
/*********************
        CATEGORY
**********************/
$("#btnListCategory").on("click", function(e){
    getCategory();
})
//Mostar Datos
function getCategory(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            $("#tableData").html(`<thead><tr><th>nombre</th><th>descripcion</th></tr></thead><tbody>`);
            $(respuesta).each(function(i, tutorial){
                $('#tableData').append($("<tr>")
                                        .append($("<td>").append(tutorial.name))
                                        .append($("<td>").append(tutorial.description))
                                        .append($("<td>").append(`
                                            <button class='btn btn-primary editCat' data-bs-toggle="modal" data-bs-target="#modalCategory" data-bs-whatever="@mdo" data-catid="`+tutorial.id+`"><i class="bi bi-pencil-square"></i></button>
                                            <button class='btn btn-danger deleteCat' data-catid="`+tutorial.id+`"><i class="bi bi-trash-fill"></i></button>
                                        `)));
                });
                $('#tableData').append("</tbody>")
                cargarBotones();
        }
    });
}
//botones para editar y eliminar
function cargarBotones(){
    $(".editCat").on("click",function(e){
        getOneCategory($($(this)[0]).data("catid"));
            e.preventDefault();
    });
    $(".deleteCat").on("click",function(e){
        deleteCategory($($(this)[0]).data("catid"));
            e.preventDefault();
    });
}
//guardar datos
$("#newCat").on("click", function(e){
    let info={
        name: $($("#newCategory")[0].nameCat).val(),
        description: $($("#newCategory")[0].catDescript).val(),
    }
    data = JSON.stringify(info);
    //console.log(data)
    saveCategory(data)
    $("#newCategory").trigger("reset");
    e.preventDefault();
});
function saveCategory(data){
    $.ajax({
        url: 'http://localhost:8080/api/Category/save',
        method: 'POST',
        dataType: 'JSON',
        contentType:"application/JSON; charset=utf-8",
        data: data,
        success: function(data) {
            console.log(data);
            //alert("Se guardo correctamente");
            alertCategory('La categoría se creo correctamente', 'success');
            getCategory();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alertCategory('no se puede crear la categoria', 'danger');
            //alert("No se puede actualizar: "+textStatus +" "+jqXHR+" "+errorThrown)
        }
    });
}
function alertCategory(message, type){
    var alertPlaceholder = document.getElementById('alertCat')
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.append(wrapper)
}
//mostrar datos en el modal
function getOneCategory(id){
    console.log(id);
    $.ajax({
        url: 'http://localhost:8080/api/Category/'+id,
        method: 'GET',
        dataType: 'JSON',
        success: function(data) {
            $($("#uCategory")[0].catID).val(data.id);
            $($("#uCategory")[0].uNameCat).val(data.name);
            $($("#uCategory")[0].uCatDescript).val(data.description);
            //$("#uCategory").show();
            $("#modalCategory").show();
        }
    });
}
//actualizar datos categoria
$("#putCategory").on("click", function(e){
    let data ={
        id:$($("#uCategory")[0].catID).val(),
        name: $($("#uCategory")[0].uNameCat).val(),
        description: $($("#uCategory")[0].uCatDescript).val()
    }
    let dataToSend=JSON.stringify(data);
    actualizarCategoria(dataToSend);
    e.preventDefault();
})
function actualizarCategoria(data){
    $.ajax({
        url: "http://localhost:8080/api/Category/update",
        type: "PUT",
        dataType: "JSON",
        contentType:"application/JSON; charset=utf-8",
        data:data,
        success: function(response){
            console.log(response);
            getCategory();
            alert("Se actualizo correctamente");
            //$("#exampleModal").hide();
            var myModalEl = document.getElementById('modalCategory');  
            var modal = bootstrap.Modal.getInstance(myModalEl)
            modal.hide()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se puede actualizar: "+textStatus +" "+jqXHR+" "+errorThrown)
        }
    });
}
//borrar catagoria
function deleteCategory(id){
    $.ajax({
        url:"http://localhost:8080/api/Category/"+id,
        method:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            getCategory();
            //alert("Se ha Eliminado.")
           // getCategory();
        }
    });
}
/*********************
        FARM
**********************/


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