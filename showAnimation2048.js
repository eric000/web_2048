/**
 * Created by Administrator on 2016/12/27.
 */
function showNumberWithAnimation(x, y, number) {
    var numberCell = $('#number-cell-' + x + '-' + y );

    numberCell.css('background-color', getNumberBackgroundColor( number ));
    numberCell.css('color', getNumberColor( number ));
   // numberCell.text (number );
    numberCell.text (getNumberToText(number) );
    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPostTop( x , y ),
        left:getPostLeft( x , y )
    },50);
}


function showMoveAimation (fromx ,fromy ,tox , toy  ) {
    var numberCell =  $('#number-cell-' + fromx + '-' + fromy )
    numberCell.animate({
        top:getPostTop( tox , toy),
        left:getPostLeft(tox , toy)
    },200)
}

function updateScore(score){
    $('#score').text(score)
}