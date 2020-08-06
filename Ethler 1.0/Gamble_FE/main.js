var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi,"0xFb6e9bf287110ec7df3D965fb66EdBAa66d5425d", {from: accounts[0]});
      console.log(contractInstance);
    });
    $("#Gamble").click(gamble);
    $("#Withdraw").click(withdraw);
});

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
      console.log(bet);
      let input = parseInt($("#Input").val());
      let random = (Math.random()>0.5)?1:0;
      config = {
        value: bet,
        gas: 6000000
      };
      contractInstance.methods.gamble(input, random).send(config)
      .on("transactionHash", function(hash){
          console.log(hash);
        })
      .then(function(){
        if (input===random) $("#Output").text("You have WON!");
        else $("#Output").text("Better Luck Next Time!");
      })
    }
  }
}


function withdraw(){
  contractInstance.methods.withdrawAll().send();
}
// function inputData(){
//   var name = $("#name_input").val();
//   var height = $("#height_input").val();
//   var age = $("#age_input").val();
//   var config = {
//     value: web3.utils.toWei("1", "ether")
//   };
//   contractInstance.methods.createPerson(name,age, height).send(config)
//   .on("transactionHash", function(hash){
//     console.log(hash);
//   })
//   .on("confirmation", function(confirmationNr){
//     console.log(confirmationNr);
//   })
//   .on("receipt", function(receipt){
//     console.log(receipt);
//   })
// }
