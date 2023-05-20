import { useAccount } from "wagmi";
import { Button, useToast } from "@chakra-ui/react";
import { toastError, toastSuccess } from "@/utils/methods";

import { getRegisteredUserCurrentlyConnectedFirebase, userSubmitResultToThisEventFirebase } from "@/services/firestore_services";

import useNavigationProvider from "@/hooks/useNavigationProvider";
import useWhoIsConnectedProvider from "@/hooks/useWhoIsConnectedProvider";
import useFightProvider from "../hooks/useFightProvider";

export default function FightSubmission({text, startNextRound, isFightInProgress}) {
  const { address } = useAccount()
  const { setCurrentPage, setIsLoading, eventIdSelected } = useNavigationProvider()
  const { userFightResults } = useFightProvider()
  const { setCurrentUser, currentUser } = useWhoIsConnectedProvider()
  const toast = useToast()

  const submitResults = async () => {
    setIsLoading(true)
    try {
      setCurrentPage("events")
      // const contract = new ethers.Contract(process.env.NEXT_PUBLIC_FIGHT_SCADDRESS_GOERLI, FightContract.abi, signer)
      // let transaction = await contract.participantSubmitResult(description)
      // await transaction.wait()
      await userSubmitResultToThisEventFirebase(address, [parseInt(eventIdSelected), ...currentUser.finishedEvents])
      let user = await getRegisteredUserCurrentlyConnectedFirebase(address)
      setCurrentUser({
        pseudo: user.pseudo,
        address: address,
        email: user.email,
        bookedEvents: user.bookedEvents,
        finishedEvents: user.finishedEvents
      })

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