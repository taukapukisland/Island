'use client';

import { client } from "@/app/client";
import { chain } from "@/app/chain";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../src/app/utils/contracts";
import { NFT, prepareContractCall, sendTransaction, Hex } from "thirdweb";
import { useEffect, useState } from "react";
import { approve } from "thirdweb/extensions/erc721";
import { NFTCard } from "./NFTCard";
import { getOwnedERC721s } from "./get"
import { StakedNFTCard } from "./StakedNFTCard";
import { StakeRewards } from "./StakeRewards";
import { StakedAll } from "./StakedAll";

export const Staking = () => {
    const account = useActiveAccount();

    const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);

    const getOWnedNFTs = async () => {
        const nfts = await getOwnedERC721s({
            contract: NFT_CONTRACT,
            owner: account?.address as Hex,
            requestPerSec: 25,
        });

        setOwnedNFTs(nfts);
    };

    useEffect(() => {
        if (account) {
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




    /*const Etransaction = prepareContractCall({
        contract: NFT_CONTRACT,
        method: "function transfer(address to, uint256 value)",
        params: ["0x7b69672e3877D2Da43d93F6cF2422bDFAC53Fb43 ", BigInt(0)],
    });
        const { transactionHash } = await sendTransaction({
         account,
         transaction: Etransaction,
       });*/

       



    if (account) {

        return (
            
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
                    <h2 style={{ marginRight: "20px", color: "white", }}>Your Chilaaaas!!!!</h2>
                </div>
                <hr style={{
                    width: "100%",
                    border: "1px solid #333"
                }} />
                

                


                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "500px" }}>
                        { ownedNFTs.length ? (
                            ownedNFTs.map((nft) => (
                <StakedAll
                    nft={nft}
                    refetchOwnedNFTs={getOWnedNFTs}
                    refetchStakedInfo={refetchStakedInfo}
                />
            ))
        ) : (
            <center><img src="https://lh3.googleusercontent.com/d/1axH8W_Xfs-hbB0fF6iP9EF9XU26sukVk=w25" /></center>
        )}
    </div>
            



                <div style={{
                    margin: "20px 0",
                    width: "100%"
                }}>

                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "500px" }}>
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
                            <p style={{ color: "white" }}>You own 0 NFTs</p>
                        )}
                    </div>
                </div>
                <hr style={{
                    width: "100%",
                    border: "1px solid #333"
                }} />
                <div style={{ width: "100%", margin: "20px 0" }}>
                    <h2>Staked NFTs</h2>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "500px"}}>
                        {stakedInfo && stakedInfo[0].length > 0 ? (
                            stakedInfo[0].map((nft: any, index: number) => (
                                <StakedNFTCard
                                    key={index}
                                    tokenId={nft}
                                    refetchStakedInfo={refetchStakedInfo}
                                    refetchOwnedNFTs={getOWnedNFTs}
                                />
                            ))
                        ) : (
                            <p style={{ margin: "20px" }}>No NFTs staked</p>
                        )}
                    </div>

                </div>
                <hr style={{
                    width: "100%",
                    border: "1px solid #333"
                }}/>
                <StakeRewards />  
            </div>
        )
    }

}