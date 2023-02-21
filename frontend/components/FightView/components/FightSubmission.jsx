import { Button, useToast } from "@chakra-ui/react";
import { toastError, toastSuccess } from "@/utils/methods";

import useNavigationProvider from "@/hooks/useNavigationProvider";
import useFightProvider from "../hooks/useFightProvider";

export default function FightSubmission({text, startNextRound, isFightInProgress}) {
  const { setCurrentPage, setIsLoading } = useNavigationProvider()
  const {results} = useFightProvider()
  const toast = useToast()

  const submitResults = async () => {
    setIsLoading(true)
    try {
      setCurrentPage("events")
      // const contractInstance = new ethers.Contract(contract.address, contract.abi, signer)
      // let transaction = await contractInstance.addProposal(description)
      // await transaction.wait()
  
      toast(toastSuccess("Add proposal", "Transaction successful")) 
      setIsLoading(false)
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