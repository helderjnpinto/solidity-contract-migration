pragma solidity ^0.4.23;

contract KeyStore {

  mapping(bytes32 => uint256) _uintStorage;

  function getUint(bytes32 key) public view returns (uint) {
    return _uintStorage[key];
  }

  function setUint(bytes32 key, uint value) public {
    _uintStorage[key] = value;
  }

}
