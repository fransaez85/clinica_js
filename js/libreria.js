
 //================crear objeto ajax==========================================================================//

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

//============================consulta los datos de la clinica y llama a la funcion datosclinica===============//
function info_clinica(){

    objetoAjax = AJAXCrearObjeto();
    //alert("objeto creado");
    
    objetoAjax.open('GET', 'php/consultaInformacion.php', true);
    //Conecta con el servidor
    objetoAjax.send();
    //Se ejecuta cuando cambie el estado de la petición
    objetoAjax.onreadystatechange=datosclinica;
}


//==================================añade los datos de la clinica y los borra si existen=======================//
function datosclinica(){
    //alert("entro");
    if (objetoAjax.readyState == 4){
        if (objetoAjax.status == 200) {
           var div=document.getElementById("principal")
           eliminarSecciones();

            //alert(objetoAjax.responseText);
            var aux = objetoAjax.responseText;
            var obj_json = JSON.parse(aux);
            //posicion en div y creacion de div2 con id informacion
           // var div = document.getElementById("principal");
           var div2=document.createElement("div");

           div2.setAttribute("id","informacion")
           div2.setAttribute("class","informacion")
           div.appendChild(div2);
            //variables de todos los elementos de div2
            var p1=document.createElement("h3");
            var p2=document.createElement("h3");
            var p3=document.createElement("h3");
            var p4=document.createElement("h3");
            var p5=document.createElement("h3");
            
            var img=document.createElement("img");
            //atributos de la imagen
            img.setAttribute("src","images/clinica1.jpg");
            img.setAttribute("title","clinica");
            //var h1=document.createElement("h1");
           // h1.appendChild(document.createTextNode("Información:"));

            //recuperacion de los datos con json 
            var nombre = document.createTextNode(obj_json.nombre);
            //alert(obj_json);
            p1.appendChild(nombre);

            var telefono = document.createTextNode(" Telefono: "+obj_json.telefono);
            //alert(obj_json);
            p2.appendChild(telefono);

            var direccion = document.createTextNode(" Direccion: "+obj_json.direccion);
            //alert(obj_json);
            p3.appendChild(direccion);

            var localidad = document.createTextNode(" Localidad: "+obj_json.localidad);
            //alert(obj_json);
            p4.appendChild(localidad);

            var email = document.createTextNode("email: "+obj_json.email);
            //alert(obj_json);
            p5.appendChild(email);

            //anidando elementos
           // div2.appendChild(h1);
           div2.appendChild(img);
           div2.appendChild(p1);
           div2.appendChild(p2);
           div2.appendChild(p3);
           div2.appendChild(p4);
           div2.appendChild(p5);  
       }
   }
}


//================================consultar especialidades(servicios)====================================//
function consultarEspecialidad(){

    objetoAjax = AJAXCrearObjeto();
    //alert("objeto creado");
    
    objetoAjax.open('GET', 'php/consultaEspecialidad.php', true);
    //Conecta con el servidor
    //alert(objetoAjax);
    objetoAjax.send();
    //Se ejecuta cuando cambie el estado de la petición
    objetoAjax.onreadystatechange=responderEspecialidad;
}

//================================devuelve los datos de la especialidad de la bdd=========================//
function responderEspecialidad(){ 

    if (objetoAjax.readyState == 4){
        if (objetoAjax.status == 200) {

            var aux = objetoAjax.responseText;
            var obj_json = JSON.parse(aux);
            //alert(objetoAjax.responseText);
            //me posiciono en el div de los servicios
            var servicios = document.getElementById("principal");
            eliminarSecciones();
            //recorro el array de los servicios
            for (var i = 0; i < obj_json.length; i++){
                //para cada posicion del array creo un div
                var div3 = document.createElement("div");
                //le añado las clases a los div creados
                div3.setAttribute("class","col_1_of_5 span_1_of_5 especialidad");
                //añado al div la funcion onclick
                div3.setAttribute("onclick","mostrarMedico("+obj_json[i].id+")");
                //creo el h3 y la imagen para cada servicio
                var h3=document.createElement("h3");
                h3.setAttribute("style","text-align:center");
                var img = document.createElement("img");
                //creo el nodo de texto que será el nombre sacado de la bases de datos
                var texto = document.createTextNode(obj_json[i].nombre);
                //añado el nodo de texto a la etiqueta h3
                h3.appendChild(texto);
                //añado a la imagen la ruta mas la variable i para que se incremente
                img.setAttribute("src","images/"+(i+1)+".png");
                //añado al div el h3 y la imagen
                div3.appendChild(h3);
                div3.appendChild(img);
                //añado a servicios todos los div creados
                servicios.appendChild(div3);
            }

            //alert(obj_json);      
        }        
    } 
}

//==========================================muestra los medicos de cada especialidad=======================//
function mostrarMedico(especialidad){

    objetoAjax = AJAXCrearObjeto();
    //alert("objeto creado");
    
    objetoAjax.open('GET', 'php/consultaMedicos.php?especialidad='+especialidad, true);
    //Conecta con el servidor
    objetoAjax.send();
    //Se ejecuta cuando cambie el estado de la petición
    objetoAjax.onreadystatechange=responderMedicos;
}

//=====================================devuelve los datos de los medicos de la bdd=========================//
function responderMedicos(){ 

    if (objetoAjax.readyState == 4){
        if (objetoAjax.status == 200) {
           var div=document.getElementById("principal");

           // alert("entro");
           eliminarSecciones()

           // var div=document.getElementById("medicos"); 
            //alert(objetoAjax.responseText);
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
                div2.setAttribute("class","col_1_of_5 span_1_of_5 medico_epecialidad");
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
                link.setAttribute("href","cita.html");
                link.setAttribute("class","link");
                var cita=document.createTextNode("Pedir cita");
                link.appendChild(cita);
                //anidando
                p1.appendChild(texto);
                div2.appendChild(p1);
                div2.appendChild(link);
            }
        }
    }
}


//================================funcion formulario de contacto==========================================//

function contacto(){
    eliminarSecciones();
    var div=document.getElementById("principal");
    var div2=document.createElement("div");
    div2.setAttribute("id","contacto");
    div.appendChild(div2);
    var formu=document.createElement("form");
    div2.appendChild(formu);
    var label1=document.createElement("p");
    var texto1=document.createTextNode("Nombre:");

    var campo1=document.createElement("input");
    campo1.setAttribute("type","text");
    campo1.setAttribute("id","nombre");
    
    label1.appendChild(texto1);
    formu.appendChild(label1);
    formu.appendChild(campo1);
    

    var campo2=document.createElement("input");
    campo2.setAttribute("type","email");
    campo2.setAttribute("name","email");
    var label2=document.createElement("p");
    var texto2=document.createTextNode("Email:");
    label2.appendChild(texto2);
    formu.appendChild(label2);
    formu.appendChild(campo2);


    var campo3=document.createElement("textarea");
    campo3.setAttribute("type","textarea");
    campo3.setAttribute("name","asunto");
    var label3=document.createElement("p");
    var texto3=document.createTextNode("Asunto:");
    label3.appendChild(texto3);
    formu.appendChild(label3);
    formu.appendChild(campo3);
    

    var boton=document.createElement("button");
    boton.setAttribute("type","submit");
    boton.setAttribute("value","ENVIAR");
    boton.setAttribute("class","link2");
    var texto4=document.createTextNode("ENVIAR");
    boton.appendChild(texto4);
    formu.appendChild(boton);

    var div3=document.createElement("div");
    div3.setAttribute("class","mapa");
    div.appendChild(div3);
    var frame=document.createElement("iframe");
    frame.setAttribute("src","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.170637676497!2d-1.8719497500408593!3d38.988601779456395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd665fcb60bc1f31%3A0x2779e5848275fad9!2sI.E.S.+LEONARDO+DA+VINCI!5e0!3m2!1ses!2ses!4v1517255848621");
    frame.setAttribute("width","500px");
    frame.setAttribute("height","300px");
    //  frame.setAttribute("allowfullscreen");
    div3.appendChild(frame);
} 

//=================================elimina los medicos al cambiar de especialidad=========================//
function eliminarSecciones(){
    var cell = document.getElementById("principal");

    if ( cell.hasChildNodes() ){
        while ( cell.childNodes.length >= 1 ){
            cell.removeChild( cell.firstChild );
        }
    }
}



