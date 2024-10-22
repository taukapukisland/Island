'use client';

import { client } from "@/app/client";
import { chain } from "@/app/chain";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../src/app/utils/contracts";
import { NFT, prepareContractCall, sendTransaction } from "thirdweb";
import { useEffect, useState } from "react";
import { getNFTs, ownerOf, totalSupply, claimTo } from "thirdweb/extensions/erc721";
import { NFTCard } from "./NFTCard";

export const Staking = () => {
    const account = useActiveAccount();

    const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);

    const getOWnedNFTs = async () => {
        let ownedNFTs: NFT[] = [];

        const totalNFTSupply = await totalSupply ({
            contract: NFT_CONTRACT
        });       
        const nfts = await getNFTs({
            contract: NFT_CONTRACT,
            start: 0,
            count: parseInt(totalNFTSupply.toString())
        });

        for(let nft of nfts){
                const owner = await ownerOf({
                    contract: NFT_CONTRACT,
                    tokenId: nft.id
                });
                if(owner === account?.address){
                    ownedNFTs.push(nft);
                }
        }
        setOwnedNFTs(ownedNFTs);
    };

    useEffect (() => {
        if(account){
                getOWnedNFTs();
        }
    }, [account]);

    const {
        data: stakedInfo,
        refetch: refetchStakedInfo
    } = useReadContract({
        contract: STAKING_CONTRACT,
        method: "getStakeInfo",
        params: [account?.address || ""]
    });



      
    const Etransaction = prepareContractCall({
        contract: NFT_CONTRACT,
        method: "function transfer(address to, uint256 value)",
        params: [account?.address || "", BigInt(0)],
      }); 
   /* const { transactionHash } = await sendTransaction({
        account,
        transaction: Etransaction,
      });*/

      


    if(account){
        return(
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#151515",
                borderRadius: "8px",
                width: "500px",
                padding: "20px",
            }}>
                <ConnectButton
                    client={client}
                    chain={chain}
                />
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "20px 0",
                    width: "100%",
                }}>
                    <h2 style={{ marginRight: "20px",color: "white",}}>Your Chilaaaas!!!!</h2>
                </div>
                <hr style={{
                    width: "100%",
                    border: "1px solid #333"
                }}/>
                <div style={{
                    margin: "20px 0",
                    width: "100%"
                }}>
                    
                    <div style={{display: "flex", flexDirection:"row", flexWrap: "wrap", width: "500px"}}>
                        {ownedNFTs && ownedNFTs.length > 0 ? (
                            ownedNFTs.map((nft) => (
                                <NFTCard
                                    key={nft.id}
                                    nft={nft}
                                    refetchOwnedNFTs={getOWnedNFTs}
                                    refetchStakedInfo={refetchStakedInfo}
                                />
                            ))
                        ) : (
                            <p style={{color: "white"}}>You own 0 NFTs</p>
                        )}
                </div>
            </div></div>
        )    
}
} 