import { useContractRead } from 'wagmi';
import { _abi, GetContractAddy } from './abiGet';

export function useSupply() {
  return useContractRead({
    address: GetContractAddy(),
    abi: _abi,
    functionName: 'totalSupply',
    watch: true,
  });
}
