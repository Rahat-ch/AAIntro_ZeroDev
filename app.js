const { ECDSAProvider } = require("@zerodev/sdk");
const { LocalAccountSigner } = require("@alchemy/aa-core");
const { encodeFunctionData, parseEther } = require("viem");
const allowanceAbi = require("./allowanceABI.json");
const tokenAbi = require("./tokenABI.json");

const projectId = process.env.PROJECT_ID;

const owner = LocalAccountSigner.privateKeyToAccountSigner(
  process.env.PRIVATE_KEY
);

const tokenAddress = "0x73c68be1Db74E98c1151acB7952B4C7E5F5Df8a0";
const allowanceAddress = "0xd010d3F968B68918bfEe142eFaa6Dc0a24D3D596";

const main = async () => {
  console.log({ eoa: await owner.getAddress() });

  const ecdsaProvider = await ECDSAProvider.init({
    projectId,
    owner,
  });

  const address = await ecdsaProvider.getAddress();

  console.log({ smartAccount: address });

  const tokenApprovalUserOp = {
    target: tokenAddress,
    data: encodeFunctionData({
      abi: tokenAbi,
      functionName: "approve",
      args: [allowanceAddress, parseEther("50")],
    }),
  };

  const depositUserOp = {
    target: allowanceAddress,
    data: encodeFunctionData({
      abi: allowanceAbi,
      functionName: "deposit",
      args: [parseEther("10")],
    }),
  };

  console.log("sending userop...");

  const { hash } = await ecdsaProvider.sendUserOperation([ tokenApprovalUserOp, depositUserOp])

  console.log("waiting for transaction....");

  const result = await ecdsaProvider.waitForUserOperationTransaction(hash)

  console.log({ result: `https://goerli.basescan.org/tx/${result}`});
};

main();
