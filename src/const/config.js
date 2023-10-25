import abi from "./abi.json";

const config = {
  erc20_abi: abi,
  // con_addr: '0x453D7f27f3c5cDBb201bCa91818409023e1ab5Aa'
  con_addr: "0x0Bd2B7338e3b3c5D0eaD07156E4895499f0A4749",
  chainId: "1688288",
  rpcUrls: ["https://rpc.pgchain.app"],
  chainName: "PGChain",
  blockExplorerUrls: ["https://scan.pgchain.org/"]
};

export { config };
