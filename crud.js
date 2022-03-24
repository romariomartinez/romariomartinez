var nuevoId;
var db=openDatabase("itemDB","1.0","itemDB", 65535)


function limpiar(){
     document.getElementById("item").value="";
     document.getElementById("precio").value="";
    
}


// FUNCIONALIDAD DE LOS BOTENES 


$(function(){
    // CREAR LA TABLA DE PRODUCTOS 

$("crear").click(function(){
    db.trasaction(function(trasaction){
       var sql="CREATE TABLE productos"+
         "(id INTERGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
         "item VARCHAR (100) NOT NULL,"+
         "precio DECIMAL(5,2) NOT NULL)";
         trasaction.executeSql(sql, undefined, function(){
           alert("Tabla creada satisfactoriamente");
        },function(trasaction, err){
           alert(err.message);
        })
        });
    });
// CARGAR LA LISTA DE PRODUCTOS 
$("#listar").click(function(){
    cargarDatos();
})
// FUNCION PARA LISTAR Y PINTAR TABLA DE PRODUCTOS DE PAGINA WED 
function cargarDatos(){
    $("#listaProductos").children().remove();
    db.trasaction(function(trasaction){
        var sql="SELECT * FROM productos ORDER BY id DESC";
        trasaction.executeSql(sql, undefined, function(trasaction,result){
             if(result.rows.length){
                 $("#ListaProductos").append('<tr><th>Código</th><th>Producto</th><th>Precio</th><th><th></th></th</tr>');
                 for(var i=0; i<result.rows.length; i++){
                     var row=result.rows.item(i);
                     var item=row.item;
                     var id =row.id;
                     var precio=row.precio;
                     $("#ListaProductos").append('<tr id="fila'+id+'" class="Reg_A'+id+'"><td><span A'+
                     id+'</span></td><td><span>'+item+'</span></td><td><span>'+
                     precio+' COP$</span></td><td><button class="btn btn-success"><img src="libs/img/edi.png"/></button class="btn btn-danger"></td><td><button><img src="libs/img/delete.png"/></button></td></tr>');
                 }
             }
             else{
                $("#ListaProductos").append('<tr><td colspan="5" align="center">No existen registros de productos </td></tr>');
             }
            },function(trasaction,err){
                alert(err.message);
            })
        
            
        })

    }
// INSERTAR REGISTRO 
$("#insertar").click(function(){
    var item=$("#item"). val();
    var precio=$("#precio").val();
    db.trasaction(function(trasaction){
        var sql="INSERT INTO productos(item,precio) VALUES(?,?)";
        trasaction.executeSql(sql,[item,precio],function(){
        },function(trasaction, err){
            alert(err.message);
        })
    })
        limpiar();
        cargarDatos(); 
    })
})


