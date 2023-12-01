import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const CryptoBalance = () => {
    const [balanceInUSDC, setBalanceInUSDC] = useState<string>('0.00');
    const [balanceInKES, setBalanceInKES] = useState<string>('0.00');
    const { user } = useAuth();
    const walletAddress = user?.walletAddress || '';

    useEffect(() => {
        // Function to fetch balance from the new API
        const fetchBalance = async () => {
            try {
                const response = await fetch(`https://nexus-pay-quill-con-code-quest-97b9.vercel.app/usdc-balance/${walletAddress}`);
                const data = await response.json();

                if (data.balanceInUSDC && data.balanceInKES) {
                    setBalanceInUSDC(Number(data.balanceInUSDC).toFixed(2));
                    setBalanceInKES(Number(data.balanceInKES).toFixed(2));
                }
            } catch (error) {
                console.error("Failed to fetch balance:", error);
            }
        };

        if (walletAddress) {
            fetchBalance(); // Fetch immediately on component mount or when walletAddress changes

            const interval = setInterval(fetchBalance, 60000); // Fetch every 1 minute

            return () => clearInterval(interval); // Clear the interval when component is unmounted
        }

    }, []);

    return (
        <div className="text-center py-12">
            <h1 className="text-2xl font-bold">Your Balance</h1>
            <p className="text-xl mt-4">{balanceInUSDC} USDC</p>
            <p className="text-xl mt-4">{balanceInKES} KES</p>
        </div>
    );
}

export default CryptoBalance;


