import { useState } from "react";
import { NFT } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";
import { client } from "../src/app/client";

type OwnedNFTsProps = {
    nft: NFT;
    refetchOwnedNFTs: () => void;
    refetchStakedInfo: () => void;
};

export const NFTCard = ({ nft, refetchOwnedNFTs, refetchStakedInfo}: OwnedNFTsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    return (
        <div style={{margin: "10px"}}>
            <MediaRenderer 
                client={client}
                src={nft.metadata.image}
                style={{
                    borderRadius: "10px",
                    marginBottom: "10px",
                    height: "200px",
                    width: "200px"
                }}
            />
            <p style={{margin: "0 10px 10px 10px"}}>{nft.metadata.name}</p>
        </div>
    )
};
