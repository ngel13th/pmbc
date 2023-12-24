import React, { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { useIsMounted } from './useIsMounted';
import { AdminCheck } from './readContract';
import { _abi, _abiAddress, _listWallets, GetContractAddy } from './abiGet';
import styles from '../styles/Home.module.css';

function AdminComponent() {
    const { address } = useAccount();
    const isAdmin = AdminCheck(address);
    const mounted = useIsMounted();
    const [contractArgs, setInput] = useState('');
    var errorFlag = false;

    const { data, isLoading, isSuccess, error, write } = useContractWrite({
        address: GetContractAddy(),
        abi: _abi,
        functionName: 'editBatch',
        args: [1, [0,0], "none", "none", "none", "none", [false,true,true], [contractArgs, ".json"]],
    });

    if (error && !errorFlag) {
        alert(`Error: ${error.message}`); // Display the error message in an alert
        errorFlag = true;
    }

    const handleInputChange = (event) => {
        setInput("https://ipfs.io/ipfs/" + event.target.value);
        //proof = GetProof(event.target.value);
    };

    const handleClick = () => {
        // Perform minting logic here
        if (!address) {
            alert(`Error: Not Connected`);
            return;
        }

        try {
            write(); // Call the write function
            //alert(`This would have minted ${quantity} NFTs!`);
        } catch (e) {
            console.error('Error:', e);
            alert(`Error: ${error.message}`);
        }
        
    };

    return (
        <div className={styles.adminContainer}>
            <input
                type="text"
                value={contractArgs}
                onChange={handleInputChange}
                placeholder='CID'
            />
            
            <div className={styles.adminSection}>
                {mounted ? isAdmin && <button onClick={handleClick}>Admin Submit Button</button> : null}
            </div>
            
        </div>
    );
}

export default AdminComponent;