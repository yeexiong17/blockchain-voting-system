import CommonLayout from "../../components/CommonLayout"
import VoteRegistrationStepper from "../../components/VoteRegistrationStepper"

const VoterRegistration = () => {
    return (
        <CommonLayout>
            <div className='p-4'>
                <h1 className='text-2xl font-bold'>Voter Registration</h1>
            </div>

            <VoteRegistrationStepper />
        </CommonLayout>
    )
}

export default VoterRegistration
