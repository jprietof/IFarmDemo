ocultarElementos();
mostarElementos();
function ocultarElementos(dato){
    switch(dato){
        case "farm":
            $("#newFarm").toggle();
            $("#newClient").hide();
            $("#newMessage").hide();
            $("#newCategory").hide();
            $("#newReservation").hide();
            $("#tableData").hide();
            break;
        case "client":
            $("#newFarm").hide();
            $("#newClient").toggle();
            $("#newMessage").hide();
            $("#newCategory").hide();
            $("#newReservation").hide();
            $("#tableData").hide();
            break;
         case "message":
            $("#newFarm").hide();
            $("#newClient").hide();
            $("#newMessage").toggle();
            $("#newCategory").hide();
            $("#newReservation").hide();
            $("#tableData").hide();
            break;
         case "category":
            $("#newFarm").hide();
            $("#newClient").hide();
            $("#newMessage").hide();
            $("#newCategory").toggle();
            $("#newReservation").hide();
            $("#tableData").hide();
            break;
        case "reservation":
            $("#newFarm").hide();
            $("#newClient").hide();
            $("#newMessage").hide();
            $("#newCategory").hide();
            $("#newReservation").toggle();
            $("#tableData").hide();
            break;
        default:
            $("#newFarm").hide();
            $("#newClient").hide();
            $("#newMessage").hide();
            $("#newCategory").hide();
            $("#newReservation").hide();
            
    }
}
function mostarElementos() {
    $("#tableData").hide();
    //formFarm
    $("#btnFarm").on("click", function(e){
       ocultarElementos("farm");
    });
    //formClient
    $("#btnClient").on("click", function(e){
        ocultarElementos("client");
    });
    //formMenssage
    $("#btnMessage").on("click", function(e){
        ocultarElementos("message");
    });
    //formCategory
    $("#btnCategory").on("click", function(e){
        ocultarElementos("category");
    });
    //formReservation
    $("#btnReservation").on("click", function(e){
        ocultarElementos("reservation");
    });
    
}
/*********************
        CATEGORY
**********************/
$("#btnListCategory").on("click", function(e){
    getCategory();
    $("#tableData").toggle();
    ocultarElementos();
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
$("#btnListFarm").on("click", function(e){
    getFarm();
    $("#tableData").toggle();
    ocultarElementos();
})
//Mostar Datos de fincas
function getFarm(){
    $.ajax({
        url:"http://localhost:8080/api/Farm/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta)
            $("#tableData").html(`<thead><tr>
                                        <th>Nombre</th>
                                        <th>Dirección</th>
                                        <th>Extensión</th>
                                        <th>Descripción</th>
                                        <th>Categoría</th>
                                        </tr>
                                        </thead>
                                        <tbody>`);
            $(respuesta).each(function(i, farm){
                $('#tableData').append($("<tr>")
                                        .append($("<td>").append(farm.name))
                                        .append($("<td>").append(farm.address))
                                        .append($("<td>").append(farm.extension))
                                        .append($("<td>").append(farm.description))
                                        .append($("<td>").append(farm.category.name))
                                        .append($("<td>").append(`
                                            <button class='btn btn-primary editFarm' data-bs-toggle="modal" data-bs-target="#modalFarm" data-bs-whatever="@mdo" data-farmid="`+farm.id+`"><i class="bi bi-pencil-square"></i></button>
                                            <button class='btn btn-danger deleteFarm' data-farmid="`+farm.id+`"><i class="bi bi-trash-fill"></i></button>
                                        `)));
                });
                $('#tableData').append("</tbody>")
                farmBotones();
        }
    });
}
//botones para editar y eliminar
function farmBotones(){
    $(".editFarm").on("click",function(e){
        getOneFarm($($(this)[0]).data("farmid"));
            e.preventDefault();
    });
    $(".deleteFarm").on("click",function(e){
        deleteFarm($($(this)[0]).data("farmid"));
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
//mostrar datos ha actualizar en el modal
function getOneFarm(id){
    console.log(id);
    $.ajax({
        url: 'http://localhost:8080/api/Farm/'+id,
        method: 'GET',
        dataType: 'JSON',
        success: function(data) {
            $($("#uFarm")[0].farmsID).val(data.id);
            $($("#uFarm")[0].uptName).val(data.name);
            $($("#uFarm")[0].uptAddress).val(data.address);
            $($("#uFarm")[0].uptExtension).val(data.extension);
            $($("#uFarm")[0].uptDescription).val(data.description);
            $($("#uFarm")[0].uptCatID).val(data.category.id).change();
            //$("#uCategory").show();
            $("#modalFarm").show();
        }
    });
}
//actualizar datos categoria
$("#putFarm").on("click", function(e){
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

///////// Finca /////////////

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
/*********************
        CLIENT
**********************/
/*********************
        MESSAGE
**********************/
/*****************************
        RESERVATION
******************************/