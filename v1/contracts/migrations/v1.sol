pragma solidity ^0.4.24;

import "../StorableState.sol";

contract v1 is StorableState {
  constructor() public {
      _state.setUint("version", 1);
  }

  function getVersionNumber() view public  returns (uint256) {
    return _state.getUint("version");
  }

}
