pragma solidity ^0.4.24;

import "../KeyStore.sol";

contract v2 {
  KeyStore _state;
  
  constructor() public {
  }

  function setV(uint value) public {
    _state.setUint("version", value);
  }

  function getV() view public  returns (uint256) {
    return _state.getUint("version");
  }

}
