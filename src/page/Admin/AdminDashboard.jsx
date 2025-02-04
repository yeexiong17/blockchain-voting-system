import { Flex, Stack } from "@mantine/core"
import CommonLayout from "../../components/CommonLayout"
import { useEffect, useRef, useState } from "react"
import Chart from 'chart.js/auto'
import { contract, initialization } from "../../blockchainContract"
import { useAuth } from "../../Context"

const AdminDashboard = () => {
    const barChartRef = useRef(null)
    const { toggle } = useAuth()

    const [candidate, setCandidate] = useState([])
    let chartInstance = null

    useEffect(() => {
        getAllCandidate()
    }, [])

    useEffect(() => {
        if (candidate.length > 0) {
            renderChart()
        }
    }, [candidate])

    const getAllCandidate = async () => {
        toggle()
        try {
            await initialization()

            const candidateData = await contract().getCandidateList()
            if (!candidateData || candidateData.length === 0) {
                console.log("No candidates found.")
            }
            console.log(candidateData)

            setCandidate(candidateData)
        } catch (error) {
            console.error('Error fetching candidates:', error)
        } finally {
            toggle()
        }
    }

    const renderChart = () => {
        let candidateName = candidate.map(candidate => candidate[0])
        let candidateVoteCount = candidate.map(candidate => Number(candidate[1]))

        if (chartInstance) {
            chartInstance.destroy();
        }

        const barCanvas = barChartRef.current.getContext('2d')
        const barLabels = ["Candidate"]
        const barData = {
            labels: barLabels,
            datasets: candidateName.map((name, index) => {
                const red = Math.floor(Math.random() * 200) + 30
                const green = Math.floor(Math.random() * 200) + 30
                const blue = Math.floor(Math.random() * 200) + 30

                return {
                    label: name,
                    data: [candidateVoteCount[index]],
                    backgroundColor: `rgba(${red}, ${green}, ${blue}, 0.6)`,
                    borderColor: `rgba(${red - 30}, ${green - 30}, ${blue - 30}, 1)`,
                    borderWidth: 1.5,
                }
            }),
        }

        chartInstance = new Chart(barCanvas, {
            type: 'bar',
            data: barData,
            options: {
                indexAxis: 'y',
                scales: {
                    x: {
                        ticks: {
                            stepSize: 1,
                            callback: function (value) {
                                return Math.floor(value)
                            }
                        }
                    }
                }
            }
        });
    }

    return (
        <CommonLayout>
            <Stack>
                <p className='font-bold text-2xl'>Dashboard</p>

                {
                    candidate.length > 0
                        ? <Flex className="w-3/4">
                            <canvas ref={barChartRef}></canvas>
                        </Flex>
                        : <p>No candidate found</p>
                }
            </Stack>
        </CommonLayout>
    )
}

export default AdminDashboard