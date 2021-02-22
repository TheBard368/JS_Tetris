const cvs=document.getElementById("board");
const ctx=cvs.getContext("2d");

document.addEventListener("keydown", direction);

const unit=20;



var d=0;

function direction(event){
    if(event.keyCode==37 && d!="RIGHT"){
        d="LEFT";
    }else if(event.keyCode==38 && d!="DOWN"){
        d="UP";
    }else if(event.keyCode==39 && d!="LEFT"){
        d="RIGHT";
    }else if(event.keyCode==40 && d!="UP"){
        d="DOWN";
    }
}

class Box{
    constructor(x, y , color){
        this.x=x;
        this.y=y;
        this.color=color;
    }



}

var down=[];

var piece={
    x:4,
    y:6,
    rotation:0,
    id:Math.floor(Math.random()*7)
}

//klocki

const tTetr=[
    [new Box(-1, 0, "violet"), new Box(0, 0, "violet"), new Box(1, 0, "violet"), new Box(0, -1, "violet")],
    [new Box(0, -1, "violet"), new Box(0, 0, "violet"), new Box(0, 1, "violet"), new Box(1, 0, "violet")],
    [new Box(1, 0, "violet"), new Box(0, 0, "violet"), new Box(-1, 0, "violet"), new Box(0, 1, "violet")],
    [new Box(0, 1, "violet"), new Box(0, 0, "violet"), new Box(0, -1, "violet"), new Box(-1, 0, "violet")] 
];

const lTetr=[
    [new Box(0, -2, "blue"), new Box(0, -1, "blue"), new Box(0, 0, "blue"), new Box(1, 0, "blue")],
    [new Box(1, -1, "blue"), new Box(0, -1, "blue"), new Box(-1, -1, "blue"), new Box(-1, 0, "blue")],
    [new Box(0, 0, "blue"), new Box(0, -1, "blue"), new Box(0, -2, "blue"), new Box(-1, -2, "blue")],
    [new Box(-1, -1, "blue"), new Box(0, -1, "blue"), new Box(1, -1, "blue"), new Box(1, -2, "blue")]  
];

const rlTetr=[
    [new Box(0, -2, "red"), new Box(0, -1, "red"), new Box(0, 0, "red"), new Box(-1, 0, "red")],
    [new Box(1, -1, "red"), new Box(0, -1, "red"), new Box(-1, -1, "red"), new Box(-1, -2, "red")],
    [new Box(0, 0, "red"), new Box(0, -1, "red"), new Box(0, -2, "red"), new Box(1, -2, "red")],
    [new Box(-1, -1, "red"), new Box(0, -1, "red"), new Box(1, -1, "red"), new Box(1, 0, "red")]
];

const sqTetr=[
    [new Box(0, 0, "yellow"), new Box(0, -1, "yellow"), new Box(1, -1, "yellow"), new Box(1, 0, "yellow")],
    [new Box(0, 0, "yellow"), new Box(0, -1, "yellow"), new Box(1, -1, "yellow"), new Box(1, 0, "yellow")],
    [new Box(0, 0, "yellow"), new Box(0, -1, "yellow"), new Box(1, -1, "yellow"), new Box(1, 0, "yellow")],
    [new Box(0, 0, "yellow"), new Box(0, -1, "yellow"), new Box(1, -1, "yellow"), new Box(1, 0, "yellow")]
];

const zTetr=[
    [new Box(-1, -1, "orange"), new Box(0, -1, "orange"), new Box(0, 0, "orange"), new Box(1, 0, "orange")],
    [new Box(0, -2, "orange"), new Box(0, -1, "orange"), new Box(-1, -1, "orange"), new Box(-1, 0, "orange")],
    [new Box(1, -1, "orange"), new Box(0, -1, "orange"), new Box(0, -2, "orange"), new Box(-1, -2, "orange")],
    [new Box(0, 0, "orange"), new Box(0, -1, "orange"), new Box(1, -1, "orange"), new Box(1, -2, "orange")]
];

const rzTetr=[
    [new Box(1, -1, "green"), new Box(0, -1, "green"), new Box(0, 0, "green"), new Box(-1, 0, "green")],
    [new Box(0, 0, "green"), new Box(0, -1, "green"), new Box(-1, -1, "green"), new Box(-1, -2, "green")],
    [new Box(-1, -1, "green"), new Box(0, -1, "green"), new Box(0, -2, "green"), new Box(1, -2, "green")],
    [new Box(0, -2, "green"), new Box(0, -1, "green"), new Box(1, -1, "green"), new Box(1, 0, "green")]
];

const linTetr=[
    [new Box(-1, 0, "gold"), new Box(0, 0, "gold"), new Box(1, 0, "gold"), new Box(2, 0, "gold")],
    [new Box(0, -2, "gold"), new Box(0, -1, "gold"), new Box(0, 0, "gold"), new Box(0, 1, "gold")],
    [new Box(-1, 0, "gold"), new Box(0, 0, "gold"), new Box(1, 0, "gold"), new Box(2, 0, "gold")],
    [new Box(0, -2, "gold"), new Box(0, -1, "gold"), new Box(0, 0, "gold"), new Box(0, 1, "gold")]
];

const Tetrominos=[tTetr, lTetr, rlTetr, sqTetr, zTetr, rzTetr, linTetr];

function collisioncheck(part){
    for(var j=0; j<4; j++){
        if(part[j].x+piece.x<0 || part[j].x+piece.x>9 || part[j].y+piece.y>19) return true;

        for(var i=0; i< down.length; i++){
            if(part[j].x+piece.x==down[i].x && part[j].y+piece.y==down[i].y)return true;
        }
    }
    return false;
}

function rotate(){
    var pom=piece.rotation;
    pom++;
    if(pom>3)pom=0;

    if(collisioncheck(Tetrominos[piece.id][pom]))return;

    piece.rotation=pom;
}

function generatePiece(){
    piece.x=4;
    piece.y=-1;
    piece.rotation=0;
    piece.id=Math.floor(Math.random()*7);
}

function addDown(){
    var j;
    var pom;

    for(var i=0; i<4; i++){
        for(j=0; j<down.length && Tetrominos[piece.id][piece.rotation][i].y+piece.y<down[j].y; j++);

        pom=new Box(Tetrominos[piece.id][piece.rotation][i].x+piece.x, Tetrominos[piece.id][piece.rotation][i].y+piece.y, Tetrominos[piece.id][piece.rotation][i].color);
        down.splice(j, 0, pom);
    }
    
}

function removeLine(){
    var count=0, y=down.length-1;

    for(var i=down.length-1; i>=0; i--){
        if(down[i].y!=down[y].y){
            count=1;
            y=i;
        }else count++;

        if(count==10){
            y-=9;
            down.splice(y, 10);
            
            for(var j=y; j<down.length; j++)down[j].y++;
        }
    }
    

}
function end(){
    for(var i=0; i<down.length; i++){
        if(down[i].y<=-1)return true;
    }

    return false;
}

var timer=0, inc=1;

function play(){
    ctx.clearRect(0, 0, 10*unit, 20*unit);

    timer+=inc;
    
    if(collisioncheck(Tetrominos[piece.id][piece.rotation])){
        piece.y--;
        addDown();
        removeLine();
        if(end()){
            clearInterval(game);
            window.alert("GAME OVER")
        }
        generatePiece();
    }
    

    for(var i=0; i<4; i++){
        ctx.fillStyle=Tetrominos[piece.id][piece.rotation][i].color;
        ctx.fillRect((Tetrominos[piece.id][piece.rotation][i].x+piece.x)*unit, (Tetrominos[piece.id][piece.rotation][i].y+piece.y)*unit, unit, unit);

        ctx.strokeStyle="black";
        ctx.strokeRect((Tetrominos[piece.id][piece.rotation][i].x+piece.x)*unit, (Tetrominos[piece.id][piece.rotation][i].y+piece.y)*unit, unit, unit);
    }

    for(var i=0; i<down.length; i++){
        ctx.fillStyle=down[i].color;
        ctx.fillRect(down[i].x*unit, down[i].y*unit, unit, unit);

        //ctx.fillStyle="black";
        //ctx.fillText(i,down[i].x*unit+10, down[i].y*unit+10);

        ctx.strokeStyle="black";
        ctx.strokeRect(down[i].x*unit, down[i].y*unit, unit, unit);
    }

    if(d=="UP"){
        rotate();
        d=0;
    }
    if(d=="DOWN"){
        piece.y++;
        if(collisioncheck(Tetrominos[piece.id][piece.rotation]))piece.y--;
        d=0;
    }
    if(d=="RIGHT"){
        piece.x++;
        if(collisioncheck(Tetrominos[piece.id][piece.rotation]))piece.x--;
        d=0;
    }
    if(d=="LEFT"){
        piece.x--;
        if(collisioncheck(Tetrominos[piece.id][piece.rotation]))piece.x++;
        d=0;
    }


    if(timer==250){
        piece.y++;
        timer=0;
    }
    
}


var game=setInterval(play,1);