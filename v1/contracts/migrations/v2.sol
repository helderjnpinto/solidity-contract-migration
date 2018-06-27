pragma solidity ^0.4.24;

import "../StorableState.sol";

contract v2 is StorableState {
  constructor() public {
      _state.setUint("version", 2);
  }

  function getVersion() view public  returns (uint256) {
    return _state.getUint("version");
  }
}
