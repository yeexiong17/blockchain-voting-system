import { useEffect, useState } from 'react'
import CommonLayout from '../../components/CommonLayout'
import { contract } from '../../blockchainContract'
import { Stack, Table } from '@mantine/core'
import { useAuth } from '../../Context'

const ContractLog = () => {

    const { toggle } = useAuth()

    const [allLogs, setAllLogs] = useState({})

    useEffect(() => {
        retrieveAllLogs()

        // console.log(allLogs)
    }, [])

    const retrieveAllLogs = async () => {
        toggle()
        const candidateAddedEvent = await contract.getPastEvents('CandidateAdded', {
            fromBlock: 0,
            toBlock: 'latest'
        })
        const voterAddedEvent = await contract.getPastEvents('VoterAdded', {
            fromBlock: 0,
            toBlock: 'latest'
        })
        const voteCastEvent = await contract.getPastEvents('VoteCast', {
            fromBlock: 0,
            toBlock: 'latest'
        })
        const voteStatusChangedEvent = await contract.getPastEvents('VoteStatusChanged', {
            fromBlock: 0,
            toBlock: 'latest'
        })

        const logObject = {
            "CandidateAdded": candidateAddedEvent,
            "VoterAdded": voterAddedEvent,
            "VoteCast": voteCastEvent,
            "VoteStatusChanged": voteStatusChangedEvent
        }
        console.log(logObject)
        setAllLogs(logObject)
        toggle()
    }

    const tableMaker = () => {

        return Object.keys(allLogs).map((eventType, index) => (
            <Stack className='mb-8'>
                <p className='font-bold text-xl'>{eventType.replace(/([a-z])([A-Z])/g, '$1 $2')}</p>
                <Table key={index}>
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
                        <Table.Td>{log.event}</Table.Td>
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
