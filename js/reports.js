/*++++++++++++++++++++++
        REPORTE 1
++++++++++++++++++++++++*/
$("#btnReportOk").on("click", function(e){
    //getCategory();
    getCompletCancel();
    //$("#tableData").toggle();
    //ocultarElementos();
})
function getCompletCancel(){
    $.ajax({
        url: "http://localhost:8080/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function(data){
            console.log(data);
            $('#complet').append('<div class="text-dark fw-bold h5 mb-0"><span>'+data.completed+'</span></div>')
            $('#cancel').append('<div class="text-dark fw-bold h5 mb-0"></span>'+data.cancelled+'</span></div>')
            
        }

    });
}
/*++++++++++++++++++++++
        REPORTE 2
++++++++++++++++++++++++*/
$("#buscarDate").on("click", function(e){
    //getCategory();
    //alert("me tocaron")
    getReservationDate();
    //$("#tableData").toggle();
    //ocultarElementos();
})
function getReservationDate(){
    let dataStart= $($("#searchDate")[0].dateInicio).val();
    let dataEnd= $($("#searchDate")[0].dateFin).val();
    console.log("Mensaje")
    console.log(dataStart);
    console.log(dataEnd);
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-dates/"+dataStart+"/"+dataEnd,
        type: "GET",
        datatype:"JSON",
        success:function (respuesta) {
            let cantReserva = 0;
            //$("#reportTwo").append("<div class="text-dark fw-bold h5 mb-0"><span>$215,000</span></div>")
            $("#tableReservation").html(`<thead class="table-info"><tr>
            <th>#</th>
            <th>Fecha Inicio</th>
            <th>Fecha de finalización</th>
            <th>Estado</th>
            </tr>
            </thead>
            <tbody>`);
            $(respuesta).each(function(i, data){
                cantReserva+=1
            $('#tableReservation').append($("<tr>")
                        .append($("<td>").append(i+1))
                        .append($("<td>").append(data.startDate))
                        .append($("<td>").append(data.devolutionDate))
                        .append($("<td>").append(data.status)))
            });
            $('#tableReservation').append("</tbody>")
            $('#cantReserva').html('<div class="text-uppercase text-success fw-bold text-xs mb-1"><span>Cantidad de reservas</span></div><div class="text-dark fw-bold h5 mb-0"><span>'+cantReserva+'</span></div>')

        }
    })
}
/*++++++++++++++++++++++
        REPORTE 3
++++++++++++++++++++++++*/
$("#btnReportTop").on("click", function(e){
    //getCategory();
    getClientTop();
    //$("#tableData").toggle();
    //ocultarElementos();
})
function getClientTop(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#tableTopClient").html(`<thead class="table-info"><tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Reservas</th>
            </tr>
            </thead>
            <tbody>`);
            $(respuesta).each(function(i, data){
            $('#tableTopClient').append($("<tr>")
                        .append($("<td>").append(i+1))
                        .append($("<td>").append(data.client.name))
                        .append($("<td>").append(data.client.email))
                        .append($("<td>").append(data.client.age))
                        .append($("<td>").append(data.total)))
            });
            $('#tableTopClient').append("</tbody>")
        }
    })
}