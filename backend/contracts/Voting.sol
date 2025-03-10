pragma solidity  ^0.8.0;

contract Voting{
    struct Candidate{
        uint id;
        string name;
        uint voteCount;
    }
     address public owner;
     mapping (address=>bool) public voters;
}
