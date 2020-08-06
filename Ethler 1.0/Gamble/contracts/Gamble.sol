pragma solidity 0.5.12;

import "./Ownable.sol";

contract Gamble is Ownable{

    bool win;
    uint public balance = 10 ether;
    uint reward;

    event gambleResult (address gambler, bool ststus, uint reward);

    modifier costs(uint value){
        require(msg.value>=value);
        _;
    }

    function gamble(uint luck, uint random)public payable costs(0.0001 ether){
        if (luck == random){
            win = true;
            reward = msg.value;
            msg.sender.transfer(reward*2);
        }
        else{
            win = false;
            reward = -msg.value;
        }
        balance -= reward;
        emit gambleResult(msg.sender, win, reward);
    }

    function withdrawAll()public Owned returns(uint toTransfer){
        toTransfer = balance;
        balance = 0;
        msg.sender.transfer(toTransfer);
    }
}
