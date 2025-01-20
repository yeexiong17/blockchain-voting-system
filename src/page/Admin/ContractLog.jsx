import { useEffect, useState } from 'react'
import CommonLayout from '../../components/CommonLayout'
import { contract, initialization } from '../../blockchainContract'
import { Stack, Table } from '@mantine/core'
import { useAuth } from '../../Context'

const ContractLog = () => {

    const { toggle } = useAuth()

    const [allLogs, setAllLogs] = useState({})

    useEffect(() => {
        retrieveAllLogs()
    }, [])

    const retrieveAllLogs = async () => {
        toggle()
        try {
            await initialization()
            const candidateAddedEvent = await contract().queryFilter('CandidateAdded', 0, 'latest')
            const voterAddedEvent = await contract().queryFilter('VoterAdded', 0, 'latest')
            const voteCastEvent = await contract().queryFilter('VoteCast', 0, 'latest')
            const voteStatusChangedEvent = await contract().queryFilter('VoteStateChanged', 0, 'latest')

            setAllLogs({
                "CandidateAdded": candidateAddedEvent,
                "VoterAdded": voterAddedEvent,
                "VoteCast": voteCastEvent,
                "VoteStateChanged": voteStatusChangedEvent
            })
        } catch (error) {
            console.log(error)
        } finally {
            toggle()
        }
    }

    const tableMaker = () => {
        return Object.keys(allLogs).map((eventType, index) => (
            <Stack className='mb-8' key={index}>
                <p className='font-bold text-xl'>{eventType.replace(/([a-z])([A-Z])/g, '$1 $2')}</p>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Event Type</Table.Th>
                            <Table.Th>Transaction Hash</Table.Th>
                            <Table.Th>Block Number</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows(eventType)}</Table.Tbody>
                </Table>
            </Stack>
        ))
    }

    const rows = (eventType) => {
        let currentLog = allLogs[eventType]
        let rows = []

        !currentLog.length == 0
            ? currentLog.forEach((log, index) => {
                rows.push(
                    <Table.Tr key={index}>
                        <Table.Td>{log.fragment.name}</Table.Td>
                        <Table.Td>{log.transactionHash}</Table.Td>
                        <Table.Td>{log.blockNumber.toString()}</Table.Td>
                    </Table.Tr>
                )
            })
            : (
                rows.push(
                    <Table.Tr key='null'>
                        <Table.Td className='text-center' colSpan={3}>No event yet!</Table.Td>
                    </Table.Tr>
                )
            )

        return rows
    }

    return (
        <CommonLayout>
            <Stack>
                <p className='font-bold text-2xl'>Logs</p>
                {tableMaker()}
            </Stack>
        </CommonLayout>
    )
}

export default ContractLog
