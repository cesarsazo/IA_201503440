const express = require('express')
const app = express();
const cors = require('cors');
const ngrok = require('ngrok')

app.set('puerto', process.env.PORT || 3000)
app.use(cors());

app.get('/', async (req, res) => {
    //Datos del request
    let turno = req.query.turno;
    let estado = req.query.estado;
    let tablero = Ctablero(estado);

    const movimiento = await buscarAADI(tablero,turno);
    console.log(turno)
    console.log(movimiento)
    res.send(movimiento)
});

function buscarAADI(tablero, IA){
    let retador;
    if(IA==1)
        retador = 0;
    else
        retador = 1;

    let posicion = "";
    let contador = 0;
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if(tablero[x][y] == IA){
                let tempX =x+1;
                let tempY  = y;
                //Buscar hacia abajo
                if(tempX <8){//Dentro de los limites
                    while(tablero[tempX][tempY]==retador){
                        tempX++;
                        if(tempX >=8  || tablero[tempX][tempY]==IA){ //Se sale de los limites
                            break;   
                        }
                        else if(tablero[tempX][tempY]==2) //Espacio libre para saltar
                        {
                            contador = tempX - x;
                            posicion = tempX + "" + tempY;
                            break;   
                        }
                    } 
                }
                //Busacar hacia arriba
                tempX =x-1;
                tempY = y;
                if(tempX >=0){
                    while(tablero[tempX][tempY]==retador){
                        tempX--;
                        if(tempX <0  || tablero[tempX][tempY]==IA)//Se salio de los limites
                                break;
                        else if(tablero[tempX][tempY]==2) //Espacio libre para saltar
                        {
                            if(contador < x-tempX){
                                contador = x-tempX;
                                posicion = tempX + "" + tempY;
                            }
                            break;
                        }
                    }
                }
                //Buscar hacia la izquierda
                tempX =x;
                tempY = y-1;
                if(tempY >=0  ){ // se salio de los limites o esoy en el camino
                    while(tablero[tempX][tempY]==retador){
                        tempY--;
                        if(tempY <0  || tablero[tempX][tempY]==IA)//Se salio de los limites
                            break;
                        else if(tablero[tempX][tempY]==2) //Espacio libre para saltar
                        {
                            if(contador < y-tempY){
                                contador = y-tempY;
                                posicion = tempX + "" + tempY;
                            }
                            break;
                        }
                    }  
                }
                //Buscar hacia la derecha
                tempX =x;
                tempY = y+1;
                if(tempY<8){
                    while(tablero[tempX][tempY]==retador){
                        tempY++;
                        if(tempY >=8  || tablero[tempX][tempY]==IA)//Se salio de los limites
                            break;
                        else if(tablero[tempX][tempY]==2) //Espacio libre para saltar
                        {
                            if(contador < tempY-y){
                                contador = tempY-y;
                                posicion = tempX + "" + tempY;
                            }
                            break;
                        }                    
                    }
                }
                //Buscar diagonal inferior derecha
                tempX = x + 1;
                tempY = y + 1;
                let cont_diagonal = 0
                if(tempY<8 && tempX<8){
                    while(tablero[tempX][tempY]==retador){
                        tempY++;
                        tempX++;
                        cont_diagonal++;
                        if(tempY >=8 || tempX >=8 || tablero[tempX][tempY]==IA)//Se salio de los limites
                            break;
                        else if(tablero[tempX][tempY]==2) //Espacio libre para saltar
                        {
                            if(contador < cont_diagonal){
                                contador = cont_diagonal;
                                posicion = tempX +""+tempY;
                            }
                            break;
                        }
                    } 
                }
                //Buscar diagonal superior derecha
                tempX = x - 1;
                tempY = y + 1;
                cont_diagonal = 0
                if(tempY<8 && tempX>=0){
                    while(tablero[tempX][tempY]==retador){
                        tempY++;
                        tempX--;
                        cont_diagonal++;
                        if(tempY >=8 || tempX <0 || tablero[tempX][tempY]==IA)//Se salio de los limites
                            break;
                        else if(tablero[tempX][tempY]==2) //Espacio libre para saltar
                        {
                            if(contador < cont_diagonal){
                                contador = cont_diagonal;
                                posicion = tempX + "" + tempY;
                            }
                            break;
                        }
                    } 
                }                
                //Buscar diagonal superior izquierda
                tempX =x-1;
                tempY = y-1;
                cont_diagonal=0
                if(tempY>=0 && tempX>=0){
                    while(tablero[tempX][tempY]==retador){
                        tempY--;
                        tempX--;
                        cont_diagonal++;
                        if(tempY <0 || tempX <0 || tablero[tempX][tempY]==IA)//Se salio de los limites
                            break;   
                        else if(tablero[tempX][tempY]==2)//Espacio libre para saltar
                        {
                            if(contador < cont_diagonal){
                                contador = cont_diagonal;
                                posicion = tempX + "" + tempY; 
                            }
                            break;
                        }
                    } 
                }
                //Buscando diagonal inferior izquierda
                tempX = x + 1;
                tempY = y - 1;
                cont_diagonal = 0
                if(tempY >= 0 && tempX < 8){
                    while(tablero[tempX][tempY] == retador){
                        tempY--;
                        tempX++;
                        cont_diagonal++;
                        if(tempY <0 || tempX >=8 || tablero[tempX][tempY]==IA)//Se salio de los limites
                            break;   
                        else if(tablero[tempX][tempY]==2) //Espacio libre para saltar
                        {
                            if(contador < cont_diagonal){
                                contador = cont_diagonal;
                                posicion = tempX +""+tempY;
                            }
                            break;
                        }
                    } 
                } 
            }
        }//for2
    }//for1
    return posicion;
}

function Ctablero(estado){//Tablero de 8X8
    let tablero = Array(8);
    for (let index = 0; index < 8; index++)
        tablero[index]= new Array(8);     
    let contador =0;
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
        tablero[x][y] = estado.charAt(contador);                
        contador++;
        }          
    }
    return tablero;
}

const server = app.listen(app.get('puerto'), () => {
  console.log(`Example app listening on port ${app.get('puerto')}`)
});

ngrok.connect({
    proto : 'http',
    addr : process.env.PORT,
}, (err, url) => {
    if (err) {
        console.error('Error while connecting Ngrok',err);
        return new Error('Ngrok Failed');
    }
});