import { client } from "@/app/client";
import { chain } from "@/app/chain";
import { getContract } from "thirdweb";
import { stakingContractABI } from "./stakingContractABI";

const nftContractAddress = "0x41860523F4e5C817ca397C4610Ddea36b8af5254";
//const nftContractAddress = "sei19aayzzsqs8rj970cqlh2d23a50kew3k70h5frtwedk3spedlyx9s3ck89r";
const rewardTokenContractAddress = "0x6E8C31376aCc10bD376905C7efd878C2b86A2fFb";
const stakingContractAddress = "0x3450F2FFD82C988199cB9a4DE3cCafAe6908abdC";

export const NFT_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: nftContractAddress,
    //owner: "0x0Fa3d53289a04489925Ff06d5B22B6F5865f91a3";
});

export const REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: rewardTokenContractAddress,
});

export const STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: stakingContractAddress,
    abi: stakingContractABI,
});