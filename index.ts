import pinataSDK from '@pinata/sdk';
import fs from 'fs';
import * as dov from "dotenv";

dov.config();

const apiKey = process.env.PINATA_SDK_API_KEY;
const apiSecret = process.env.PINATA_SDK_API_SECRET;

const pinata = new pinataSDK(apiKey, apiSecret);

async function uploadFileToIPFS(filePath: string): Promise<string> {
  try {
    const readableStreamForFile = fs.createReadStream(filePath);
    const options = {
      pinataMetadata: {
        name: 'My File'
      },
      PinataPinOptions: {
        cidVersion: 0
      }
    };
    const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
    return result.IpfsHash;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Usage example
uploadFileToIPFS('./test.txt')
  .then(ipfsHash => {
    console.log(`File uploaded to IPFS with hash: ${ipfsHash}`);
  })
  .catch(error => {
    console.error(`Error uploading file to IPFS: ${error}`);
  });
