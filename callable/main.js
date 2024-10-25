const { mintNFT } = require("./mintNFT");
const { checkOwnership } = require("./checkOwnership");
const { getText } = require("./getText");

async function main() {

    // Specify the contract address (replace with your deployed contract address)
    const contractAddress = "0x79E812A3A530a42EA963B0E3Fd7f198Cc5C2C584"; // Replace with actual deployed contract address

    try {
        // Specify the recipient address (replace with the actual address)
        const recipientAddress = "0x1bd1e866C270609C903C5Ead7Bc1f8CF671B028E"; // Replace with the actual recipient address

        // NFT metadata URI
        const imageURI = "https://raw.githubusercontent.com/GorshkovIvan/a16z_hack_2024/refs/heads/main/nft_metadata.json";

        // NFT Description
        const description = "This NFT gives access to MistralAI chat endpoint.";

        // Call the mintNFT function
        const tokenId = await mintNFT(contractAddress, recipientAddress, description, imageURI);

        if (tokenId) {
            console.log(`NFT minted successfully with Token ID: ${tokenId}`);
            // Checking ownership
            owner  = await checkOwnership(contractAddress, tokenId, recipientAddress);
            if (owner) {
                console.log("Ownership check passed!");
            } else {
                console.log("Ownership check failed!");
            }

            // Getting text from the NFT
            text = await getText(contractAddress, tokenId);
            console.log("Text from NFT:", text);
        }



    } catch (error) {
        console.error("Error minting NFT:", error);
    }
}

main();