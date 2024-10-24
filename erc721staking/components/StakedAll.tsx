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

type OwnedNFTsProps = {
    nft: NFT;
    refetchOwnedNFTs: () => any;
    refetchStakedInfo: () => any;
};
export const StakedAll = ({ nft, refetchOwnedNFTs, refetchStakedInfo}: OwnedNFTsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    return (
    <div style={{margin: "10px"}}>
            <button
                onClick={() => setIsModalOpen(true)}
                style={{
                    border: "none",
                    backgroundColor: "#333",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%"
                }}
                >Stake All
            </button>
            {isModalOpen && (
               <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
               }}>
                <div style={{
                    minWidth: "300px",
                    backgroundColor: "#222",
                    padding: "20px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%"
                    }}>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        style={{
                            border: "none",
                            backgroundColor: "transparent",
                            color: "#fff",
                            cursor: "pointer"
                        }}
                    >
                    Close</button>
                    </div>
                    <h3 style={{margin: "10px 0"}}>You are about to stake ALL!</h3>
                        {!isApproved ? (
                            <TransactionButton
                            transaction={() => (
                                approve({
                                    contract: NFT_CONTRACT,
                                    to: STAKING_CONTRACT.address,
                                    tokenId: nft.id
                                })
                            )}
                            style={{
                                width: "100%"
                            }}
                            onTransactionConfirmed={() => setIsApproved(true)}
                            >Approve</TransactionButton>
                        ) : (
                            <TransactionButton
                            transaction={() => (
                                prepareContractCall({
                                    contract: STAKING_CONTRACT,
                                    method: "stake",
                                    params: [[nft.id]]
                                })
                            )}
                            onTransactionConfirmed={() => {
                                alert("Staked!");
                                setIsModalOpen(false);
                                refetchOwnedNFTs();
                                refetchStakedInfo();
                            }}
                            style={{
                                width: "100%"
                            }}
                            >Stake</TransactionButton>
                        )}
                </div>
            </div>
        )}
        </div>
    )
}