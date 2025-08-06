import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const TOKEN_MINT = new PublicKey("CcFvvawbp6YoBae4mUZZb5X9W5aXw8iWqqBR2eNGbonk"); 

export async function checkToken2050Holding(walletAddress: PublicKey): Promise<boolean> {
  const connection = new Connection("https://api.mainnet-beta.solana.com"); // Or your cluster
  
  try {
    const associatedTokenAddress = await getAssociatedTokenAddress(
      TOKEN_MINT,
      walletAddress
    );

    const tokenAccount = await getAccount(connection, associatedTokenAddress);

    return Number(tokenAccount.amount) > 0;
  } catch (error) {
    // User probably doesn't have the token account
    return false;
  }
}
