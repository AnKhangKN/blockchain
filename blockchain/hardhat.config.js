require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    songbird: {
      url: `https://coston-api.flare.network/ext/C/rpc`,
      accounts: [
        `0x1868dac0336349046236e5cb7f4c1d6ab3a5cf57a8e2a2ebfea199412b50d1ff`,
      ],
    },
  },
};
