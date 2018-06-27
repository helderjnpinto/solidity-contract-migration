pragma solidity ^0.4.24;

import "./KeyStore.sol";

contract StorableState {
  KeyStore _state;
  constructor() public {
     _state = new KeyStore();
  }
}
