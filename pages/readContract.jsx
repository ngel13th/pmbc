import { useContractRead } from 'wagmi'; 
import { _abi, _abiAddress } from './abiGet'; 
import { formatUnits } from 'viem';

export function GetPaused() {
    const { data, isError, isLoading } = useContractRead({
        address: _abiAddress,
        abi: _abi,
        functionName: 'paused',
        args: [],
    });

    return data;
}

export function GetSupply() {
    const { data, isError, isLoading } = useContractRead({
        address: _abiAddress,
        abi: _abi,
        functionName: 'totalSupply',
        args: [],
    });

    if (isLoading) return 'Loading...';
if (isError) return 'Error!';
return formatUnits(data, 0);

}

export function GetCost(_sender, _amount) {
    const { data, isError, isLoading } = useContractRead({
        address: _abiAddress,
        abi: _abi,
        functionName: 'cost',
        args: [],
        account: _sender,
    });

    return data;
}

export function AdminCheck(_sender) {
    const { data, isError, isLoading } = useContractRead({
        address: _abiAddress,
        abi: _abi,
        functionName: 'checkIfAdmin',
        args: [],
        account: _sender,
    });

    return data;
}
