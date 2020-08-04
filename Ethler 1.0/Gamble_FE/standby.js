$(document).ready(function(){
  $("#Gamble").click(gamble);
})

function gamble(e){
  e.preventDefault();
  let bet = parseFloat($("#bet").val());
  let unit = parseInt($("#unit").val());
  if(unit==0)unit = 1000000000000000000; //10^18
  bet*= unit;
  if(!isNaN(bet)){
    if(bet>2000000000000000000 ) alert("you can't gamble more than 2 ether");
    else if(bet<100000000000000) alert("you have to put at least 0.0001 ether");
    else {
      // console.log(bet);
      let input = parseInt($("#Input").val());
      let random = (Math.random()>0.5)?1:0;
      if (input===random) $("#Output").text("You have WON!");
      else $("#Output").text("Better Luck Next Time!");
    }
  }
}
