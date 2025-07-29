// 🛠️ Rename functions to useX and follow React hook rules

import { useContractRead } from 'wagmi';
import { _abi, _abiAddress } from './abiGet';
import { formatUnits } from 'viem';

// ✅ Hook: usePaused
export function usePaused() {
  return useContractRead({
    address: _abiAddress,
    abi: _abi,
    functionName: 'paused',
    watch: true,
  });
}

// ✅ Hook: useSupply
export function useSupply() {
  const result = useContractRead({
    address: _abiAddress,
    abi: _abi,
    functionName: 'totalSupply',
    watch: true,
  });

  const value = result.data ? formatUnits(result.data, 0) : '0';
  return { ...result, formatted: value };
}

// ✅ Hook: useCost
export function useCost(_sender: `0x${string}`) {
  return useContractRead({
    address: _abiAddress,
    abi: _abi,
    functionName: 'cost',
    account: _sender,
    watch: true,
  });
}

// ✅ Hook: useAdminCheck
export function useAdminCheck(_sender: `0x${string}`) {
  return useContractRead({
    address: _abiAddress,
    abi: _abi,
    functionName: 'checkIfAdmin',
    account: _sender,
    watch: true,
  });
}
