pragma solidity ^0.4.23;

import "./StorableState.sol";
import "./Ownable.sol";

contract Proxy is StorableState, Ownable {
  address public _implementation;
  
  // event Upgraded(address indexed implementation);
  event Upgraded(address implementation);
  
  constructor(address imp) public {
    _implementation = imp;
  }

  function implementation() public view returns (address) {
    return _implementation;
  }
  
  function upgradeTo(address impl) public onlyOwner {
    require(_implementation != impl);
    _implementation = impl;
    emit Upgraded(impl);
  }
   /*
    delegatecall(gas, _impl, add(data, 0x20), mload(data), 0, 0);
      In below function delegate call is calling code at
      “_impl” address with the input “add(data,0x20)” 
      and with input memory size “mload(data)”, 
      delegate call will return 0 on error and 1 on success and result
      of the fallback function is whatever will be returned by
      the called contract function.

      0x20 -> 
        "first memory word (32 bytes = 0x20 bytes) is reserved for the length of the array,
        so we need to step over this. Thus, _data[0] is at memory address _data + 0x20.
        In the code, this looks like add(_data, 0x20)"
    
      https://ethereum.stackexchange.com/questions/34529/understanding-solidity-inline-assembly-code
    */

    function () payable public {
        address _impl = implementation();
        require(_impl != address(0));
        bytes memory data = msg.data;

        assembly {
          let result := delegatecall(gas, _impl, add(data, 0x20), mload(data), 0, 0)
          let size := returndatasize
          let ptr := mload(0x40)
          
          returndatacopy(ptr, 0, size)
          
          switch result
            case 0 { 
              revert(ptr, size) 
            }
          default { 
            return(ptr, size)
          }
        }
    }
}
