import { toastError, toastSuccess } from "@/utils/methods";
import { Button } from "@chakra-ui/react";
import useFightProvider from "../hooks/useFightProvider";

export default function FightSubmission({text, startNextRound, isFightInProgress}) {
  const {setIsLoading, results} = useFightProvider()
  const toast = useToast()

  const submitResults = async () => {
    setIsLoading(true)
    try {
      // const contractInstance = new ethers.Contract(contract.address, contract.abi, signer)
      // let transaction = await contractInstance.addProposal(description)
      // await transaction.wait()
  
      toast(toastSuccess("Add proposal", "Transaction successful")) 
    } catch (error) {
      setIsLoading(false)
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