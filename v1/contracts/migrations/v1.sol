pragma solidity ^0.4.24;

import "../KeyStore.sol";

contract v1 {
  KeyStore _state;
  
  constructor() public {
  }

  function setVersion(uint value) public {
    _state.setUint("version", value);
  }

  function getVersionNumber() view public  returns (uint256) {
    return _state.getUint("version");
  }

}
