/**
 * Created by Administrator on 2016/12/27.
 */
var board= new Array();
var score=0;
var hasConflicted = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function () {
    prepareForMobile()
    newgame()

})

function  prepareForMobile(){
    if (documentWidth > 500){
        gridContainerWidth = 500;
        cellSideLength = 100 ;
        cellSpace = 20;
    }
    $('#grid-container').css('width',gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02 * gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.05 * cellSideLength);
}

function  newgame() {
    //ready
    init();
    //creat two number
    generateOneNumber();
    generateOneNumber();
    updateScore(0);
}
function  init() {
    for(var i = 0 ; i < 4 ; i++)
        for(var j=0 ; j < 4 ;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPostTop(i,j));
            gridCell.css("left",getPostLeft(i,j));
        }

    for (var i = 0 ; i < 4 ; i++){
        board[i]=new Array();
        hasConflicted[i]=new Array();
        for (var  j = 0 ;j < 4 ; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
}


function  updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0 ;i < 4 ; i++)
        for(var j = 0 ; j < 4 ; j++){
            $("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>")

            //alert("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>")
            var thellumberCell = $('#number-cell-'+i+'-'+j);

            if(board[i][j] == 0){
                thellumberCell.css('width','0px');
                thellumberCell.css('height','0px');
                thellumberCell.css('top',getPostTop(i,j) + cellSideLength/2);
                thellumberCell.css('left',getPostLeft(i,j)+ cellSideLength/2);
            }else {
                thellumberCell.css('width',cellSideLength);
                thellumberCell.css('height',cellSideLength);
                thellumberCell.css('top',getPostTop(i,j));
                thellumberCell.css('left',getPostLeft(i,j));
                thellumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                thellumberCell.css('color',getNumberColor(board[i][j]));
                thellumberCell.text(getNumberToText(board[i][j]));
                //thellumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    $('.number-cell').css('line-height',cellSideLength + 'px')
    $('.number-cell').css('font-size',0.3 * cellSideLength + 'px')
    $('.number-cell').css('border-radius',0.05 * cellSideLength + 'px')

}

function  generateOneNumber() {
    if (noSpace(board))
        return false;
    //where
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    while (true) {

    if (board [randx][randy] == 0)
        break;

    randx = parseInt(Math.floor(Math.random() * 4));
    randy = parseInt(Math.floor(Math.random() * 4));
    }
     //how num
    var randNumber =  Math.random() < 0.5 ? 2 : 4;
    //where and  how
    board [randx][randy] = randNumber;
    showNumberWithAnimation( randx , randy , randNumber );
    return true;
}




$(document).keydown(function (event) {
    switch ( event.keyCode){
        case 37://left
            event.preventDefault();
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38://up
            event.preventDefault();
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39://right
            event.preventDefault();
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40://down
            event.preventDefault();
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default:
            break;
    }
})
document.addEventListener('touchmove',function(event){
    event.preventDefault();
})
document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
})

document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax)<0.3 * documentWidth && Math.abs(deltay)<0.3 * documentWidth){
        return ;
    }
    //x
    if(Math.abs(deltax) >= Math.abs(deltay)){
       if (deltax > 0){
           //right
           if(moveRight()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
           }
       }else {
           //left
           if(moveLeft()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
           }
       }
    }
    //y
    else {
        if(deltay > 0){
            //down
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }else{
            //up
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }

})

function moveLeft(){
    if (!canMoveLeft(board))
        return false;

    ///moveLeft
    for(var i = 0 ; i < 4;i++)
        for(var j = 0 ;j < 4 ; j++)
            if (board[i][j] != 0){
                for (var k = 0; k < j; k++){
                    if (board[i][k] == 0 && noBlockHorizontal( i , k , j , board )){
                        //move
                        showMoveAimation(i , j , i ,k)
                        board[i][k]=board[i][j];
                        board[i][j]=0;

                        continue;
                    }else if (board[i][k] == board[i][j] &&  noBlockHorizontal( i , k , j , board ) && !hasConflicted[i][j]){
                        //move
                        showMoveAimation(i , j , i ,k)

                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        //add score
                        score+=board[i][k];
                        updateScore(score);
                        hasConflicted[i][j] = true ;
                        continue;
                    }
                }

            }

    setTimeout("updateBoardView()",200)
    return true;
}

function moveRight(){
    if (!canMoveRight(board))
        return false;

    ///moveRight
    for(var i = 3 ; i >= 0;i--)
        for(var j = 2 ;j >= 0 ; j--)
            if (board[i][j] != 0){
                for (var k = 3; k > j; k--){
                    if (board[i][k] == 0 && noBlockHorizontal( i , k , j , board )){
                        //move
                        showMoveAimation(i , j , i ,k)
                        board[i][k]=board[i][j];
                        board[i][j]=0;

                        continue;
                    }else if (board[i][k] == board[i][j] &&  noBlockHorizontal( i , j , k , board )){
                        //move
                        showMoveAimation(i , j , i ,k)
                        //add
                        board[i][k]+=board[i][j];
                        board[i][j]=0;

                        continue;
                    }
                }

            }

    setTimeout("updateBoardView()",200)
    return true;
}
//debugger
function moveUp(){
    if (!canMoveUp(board))
        return false;

    ///moveUp
    for(var j = 0 ; j < 4 ; j++)
        for(var i = 1 ;i < 4 ; i++)
            if (board[i][j] != 0){
                for (var k = 0; k < i; k++){
                    if (board[k][j] == 0 && noBlockVertical( j , k , i , board )){
                        //move
                        showMoveAimation(i , j , k ,j)
                        board[k][j]=board[i][j];
                        board[i][j]=0;

                        continue;
                    }else if (board[k][j] == board[i][j] &&  noBlockVertical( j , k , i , board ) && !hasConflicted[k][j]){
                        //move
                        showMoveAimation(i , j , k ,j)

                        //add
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        //add score
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true ;
                        continue;
                    }
                }

            }

    setTimeout("updateBoardView()",200)
    return true;
}

function moveDown(){
    if (!canMoveDown(board))
        return false;

    ///moveUp
    for(var j = 0 ; j < 4 ; j++)
        for(var i = 2 ;i >= 0 ; i--)
            if (board[i][j] != 0){
                for (var k = 3; k > i; k--){
                    if (board[k][j] == 0 && noBlockVertical( j , i , k , board )){
                        //move
                        showMoveAimation(i , j , k ,j)
                        board[k][j]=board[i][j];
                        board[i][j]=0;

                        continue;
                    }else if (board[k][j] == board[i][j] &&  noBlockVertical( j , i , k , board ) && !hasConflicted[k][j]){
                        //move
                        showMoveAimation(i , j , k ,j)

                        //add
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        //add score
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true ;
                        continue;
                    }
                }

            }

    setTimeout("updateBoardView()",200)
    return true;
}



function  isgameover(){

    if(noSpace(board) && noMove(board)){
        gameover();
    }
}
function  gameover(){
    alert('GAME OVER!')
}
