
require('dotenv').config();
const contractAddress = "0x79E812A3A530a42EA963B0E3Fd7f198Cc5C2C584";
const tokenId = 16;
const ownerAddress = "0x1bd1e866C270609C903C5Ead7Bc1f8CF671B028E";
const recipientAddress = "0x1bd1e866C270609C903C5Ead7Bc1f8CF671B028E";
const description = "This NFT gives access to MistralAI chat endpoint.";
const imageURI = "https://raw.githubusercontent.com/GorshkovIvan/a16z_hack_2024/refs/heads/main/nft_metadata.json";



fetch('http://localhost:3001/check-ownership', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify([
        contractAddress,
        tokenId,
        ownerAddress,
	]),
})
    .then(response => response.json())
    .then(data => {
        console.log('Ownership Check Result:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Test /mint-nft endpoint
fetch('http://localhost:3001/mint-nft', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        contractAddress,
        recipientAddress,
        description,
        imageURI,
    }),
})
    .then(response => response.json())
    .then(data => {
        console.log('Mint NFT Result:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Test /get-text endpoint
fetch('http://localhost:3001/get-text', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        contractAddress,
        tokenId
    }),
})
    .then(response => {
        // Check if the response is JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            return response.json(); // Parse as JSON if content-type is JSON
        } else {
            return response.text(); // Otherwise, return text for debugging
        }
    })
    .then(data => {
        console.log('Get Text Result:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });