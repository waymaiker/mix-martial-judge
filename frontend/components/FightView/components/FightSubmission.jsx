import { useAccount } from "wagmi";
import { Button, useToast } from "@chakra-ui/react";
import { toastError, toastSuccess } from "@/utils/methods";
import { fightContract } from "@/utils/constants";

import useDataProvider from "@/hooks/useDataProvider";
import useNavigationProvider from "@/hooks/useNavigationProvider";
import useFightProvider from "../hooks/useFightProvider";

export default function FightSubmission({text, startNextRound, isFightInProgress}) {
  const { address } = useAccount()
  const { setCurrentPage, setIsLoading, eventIdSelected } = useNavigationProvider()
  const { results } = useFightProvider()
  const { setWinners, winners } = useDataProvider()
  const toast = useToast()

  const submitResults = async () => {
    setIsLoading(true)
    try {
      setCurrentPage("events")
      setWinners(winners => [{
        fightId: parseInt(eventIdSelected),
        userAddress: address ,
      }, ...winners])

      console.log(winners);
      // const contract = new ethers.Contract(fightContract.address, fightContract.abi, signer)
      // let transaction = await contract.participantSubmitResult(description)
      // await transaction.wait()

      toast(toastSuccess("Result submitted", "Transaction successful"))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast(toastError("Result submitted", error.message))
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