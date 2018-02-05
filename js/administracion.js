 //================crear objeto ajax======================================================================//

 var objetoAjax;
 function AJAXCrearObjeto(){
    if(window.XMLHttpRequest) { 
        // navegadores que siguen los estándares 
        objetoAjax = new XMLHttpRequest(); 
    } 
    else { 
        // navegadores obsoletos 
        objetoAjax = new ActiveXObject("Microsoft.XMLHTTP"); 
    } 
    return objetoAjax;
}

//=================================Funcion mostrar todos los medicos para la administracion==============//

function todosMedicos(){

    objetoAjax = AJAXCrearObjeto();
    //alert("objeto creado");
    
    objetoAjax.open('GET', 'php/consultaTodosMedicos.php', true);
    //Conecta con el servidor
    objetoAjax.send();
    //Se ejecuta cuando cambie el estado de la petición
    objetoAjax.onreadystatechange=responderTodosMedicos;
}
//======================Funcion responder todos los medicos para administracion==========================//

function responderTodosMedicos(){ 

    if (objetoAjax.readyState == 4){
        if (objetoAjax.status == 200) {
            var div=document.getElementById("principal");
            //alert("entro");
            //llamada a funcion que limpia div
            eliminarSecciones();
            var aux = objetoAjax.responseText;
            var obj_json = JSON.parse(aux);
            //creo un parrafo
            var p1=document.createElement("p");
            //creo un h3
            var h2=document.createElement("h2");
            //le añado el texto doctores
            h2.appendChild(document.createTextNode("DOCTORES"));
             //h3 es hijo del div medicos
             div.appendChild(h2);
            //recorro el array del json
            for (var i = 0; i < obj_json.length; i++){
                //creo un nuevo div dentro del anterior
                var div2=document.createElement("div");
                //le añado las clases
                div2.setAttribute("class","col_1_of_5 span_1_of_5 columna_doc");
                //pongo el nuevo div como hijo de div id medicos
                div.appendChild(div2);
                //creo una imagen
                img=document.createElement("img");
                //le paso la ruta a la imagen que esta guardada en la bdd
                img.setAttribute("src",obj_json[i].foto);
                //añado la imagen al div creado
                div2.appendChild(img);
                //recojo el nombre de cada medico de la bdd
                var texto = document.createTextNode(obj_json[i].nombre);
                //alert(obj_json);
                //añado a un p ese nombre
                var p1=document.createElement("p");
                //añadir enlace a pide cita
                var link=document.createElement("a");
                link.setAttribute("href","#");
                link.setAttribute("class","link");
                //var id=obj_json[i].id;
                //llamada a la funcion que asigna dias con el id del medico
                link.setAttribute("onclick","asignarDias("+obj_json[i].id+")");
                var cita=document.createTextNode("Asignar dias");
                link.appendChild(cita);
                //anidando
                p1.appendChild(texto);
                div2.appendChild(p1);
                div2.appendChild(link);
            }
        }
    }
}


//========================================consultar medico segun id============================================//
function MedicoId(id){
    objetoAjax = AJAXCrearObjeto();
    //alert("objeto creado");
    objetoAjax.open('GET', 'php/consultaMedicoId.php?id='+id, true);
    //Conecta con el servidor
    objetoAjax.send();
    //Se ejecuta cuando cambie el estado de la petición
    objetoAjax.onreadystatechange=responderMedicoId;
}


//=======================================Devuelve el medico con el id seleccionado============================//
function responderMedicoId(){ 
  if (objetoAjax.readyState == 4 && objetoAjax.status == 200){
        var div=document.getElementById("principal");
        //alert("entro");
        var aux = objetoAjax.responseText;
        var obj_json = JSON.parse(aux);
        //creo un parrafo
        var p1=document.createElement("p");
        //creo un h3
        var h2=document.createElement("h2");
        //le añado el texto doctores
        h2.appendChild(document.createTextNode("DOCTOR:"));
        //h3 es hijo del div medicos
        div.appendChild(h2);

        //recorro el array del json
        for (var i = 0; i < obj_json.length; i++){
            //creo un nuevo div dentro del anterior
            var div2=document.createElement("div");
            //le añado las clases
            div2.setAttribute("class","col_1_of_5 span_1_of_5");
            //pongo el nuevo div como hijo de div id medicos
            div.appendChild(div2);
            //creo una imagen
            img=document.createElement("img");
            //le paso la ruta a la imagen que esta guardada en la bdd
            img.setAttribute("src",obj_json[i].foto);
            //añado la imagen al div creado
            div2.appendChild(img);
            //recojo el nombre de cada medico de la bdd
            var texto = document.createTextNode(obj_json[i].nombre);
            //alert(obj_json);
            //añado a un p ese nombre
            var p1=document.createElement("p");
            //añadir enlace a pide cita
            //anidando
            p1.appendChild(texto);
            div2.appendChild(p1);    
        }
    }
}


//================================================funcion asignar dias al medico elegido===========================//
function asignarDias(id){
    var id=id;
    eliminarSecciones();
    MedicoId(id);
    //creando elementos
    var div=document.getElementById("principal");
    var div2=document.createElement("div");
    div2.setAttribute("id","calendario");
    div.appendChild(div2);

    //funcion que crea el calendario  
    var date = new Date();
    $('#calendario').multiDatesPicker({
        dateFormat: "yy/mm/dd",
        //addDates: [date.setDate()],
       //altField: '#dias',   
       beforeShowDay: $.datepicker.noWeekends
    });

    //creando botones para el calendario
    var boton=document.createElement("button");
    var text=document.createTextNode("Asignar");
    boton.appendChild(text);
    boton.setAttribute("value","Asignar");
    boton.setAttribute("id","asignar")
    div2.appendChild(boton);

    //funcion que recoje el array de dias del calendario (string)
    $('#asignar').click(function() {
    var dates1 = $('#calendario').multiDatesPicker('getDates');
   // alert(dates1);
    insertarDiasMedico(dates1,id);
    });
}




//=================================================================================================================//
function insertarDiasMedico(dates1,id){
    var json_dias = JSON.stringify(dates1);

    //alert(json_dias);
    objAjax = AJAXCrearObjeto();
    objAjax.open('GET', 'php/insertarDiasMedico.php?dates1='+json_dias+'&id='+id, true); // llamamos al php
    objAjax.send();
    objAjax.onreadystatechange=responder_insertarDiasMedico;
}

//=================================================================================================================//
function responder_insertarDiasMedico(){
    if (objAjax.readyState == 4){
        if (objAjax.status == 200) {

            alert(objAjax.responseText);

            if (objAjax.responseText == "true") {

                alert("Guardado Correctamente");
            } else {

                alert("¡Error!");
            }
        }
    }
}

//=============================================funcion eliminar secciones dinamicas=================================//
function eliminarSecciones(){
 var cell = document.getElementById("principal");
    if ( cell.hasChildNodes() ){
        while ( cell.childNodes.length >= 1 ){
            cell.removeChild( cell.firstChild );
        }
    }
}
