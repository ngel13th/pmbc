import { useContractRead } from 'wagmi';
import { _abi, GetContractAddy } from './abiGet';

export function usePaused() {
  return useContractRead({
    address: GetContractAddy(),
    abi: _abi,
    functionName: 'paused',
    watch: true,
  });
}
