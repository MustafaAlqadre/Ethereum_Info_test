import React, { useState } from 'react';
import { ethers } from 'ethers';
import { INFURA_PROJECT_ID } from './config/key';

function App() {
  const [address, setAddress] = useState('0xdAC17F958D2ee523a2206206994597C13D831ec7');
  const [errorAddress, seterrorAddress] = useState('');
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [usdtBalance, setUsdtBalance] = useState<ethers.BigNumberish | null>(null);

  const getEthereumInfo = async () => {
    // Initialize Ethereum provider
    const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/'+INFURA_PROJECT_ID);

    // Get the last block number
    const blockNumber = await provider.getBlockNumber();
    setBlockNumber(blockNumber);

    try {
      if (!address) return;

      // USDT token contract address and ABI
      const usdtContractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
      const usdtContractAbi = ['function balanceOf(address) view returns (uint256)'];
  
      // Initialize USDT token contract
      const usdtContract = new ethers.Contract(usdtContractAddress, usdtContractAbi, provider);
  
      // Get USDT balance for the provided address
      const balance = await usdtContract.balanceOf(address);
      seterrorAddress('');
      setUsdtBalance(balance);      
    } catch (UNCONFIGURED_NAME) {
      seterrorAddress('Error Address');
      setUsdtBalance(null);
    }

  };

  return (
    <div>
      <h1>Ethereum Info</h1>
      <label>
        Enter Ethereum Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <button onClick={getEthereumInfo}>Get Info</button>
      <div>
        {blockNumber !== null && <p>Last Block Number: {blockNumber}</p>}
        {usdtBalance !== null && (
          <p>
            USDT Balance: {ethers.formatUnits(usdtBalance, 6)} {/* USDT has 6 decimals */}
          </p>
        )}
        {errorAddress !== '' && (
          <p>
            USDT Balance: {errorAddress}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;