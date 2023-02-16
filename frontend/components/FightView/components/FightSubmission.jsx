import { toastError, toastSuccess } from "@/utils/methods";
import { Button } from "@chakra-ui/react";
import useFightProvider from "../hooks/useFightProvider";

export default function FightSubmission({text, startNextRound, isFightInProgress}) {
  const {results} = useFightProvider()
  const toast = useToast()

  const submitResults = async () => {
    try {
      // const contractInstance = new ethers.Contract(contract.address, contract.abi, signer)
      // let transaction = await contractInstance.addProposal(description)
      // await transaction.wait()
  
      toast(toastSuccess("Add proposal", "Transaction successful")) 
    } catch (error) {


      toast(toastError("Add proposal", error.data.message))
    }
  }

  return (
    <Button
      p="5" 
      onClick={isFightInProgress ? startNextRound : () => submitResults() }
    > 
      {text}
    </Button>
  )
}