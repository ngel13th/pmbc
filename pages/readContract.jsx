import { useContractRead } from 'wagmi';
import { _abi, _abiAddress } from './abiGet';

// Hook to check if the contract is paused
export function usePaused() {
  return useContractRead({
    address: _abiAddress,
    abi: _abi,
    functionName: 'paused',
  });
}

// Hook to get the total supply
export function useSupply() {
  return useContractRead({
    address: _abiAddress,
    abi: _abi,
    functionName: 'totalSupply',
  });
}

// Hook to get the cost, for a specific account
export function useCost(_sender) {
  return useContractRead({
    address: _abiAddress,
    abi: _abi,
    functionName: 'cost',
    account: _sender,
  });
}

// Hook to check admin status for a given account
export function useAdminCheck(_sender) {
  return useContractRead({
    address: _abiAddress,
    abi: _abi,
    functionName: 'checkIfAdmin',
    account: _sender,
  });
}
