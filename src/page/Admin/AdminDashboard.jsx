import { Flex, Stack } from "@mantine/core"
import CommonLayout from "../../components/CommonLayout"
import { useEffect, useRef } from "react"
import Chart from 'chart.js/auto'

const AdminDashboard = () => {
    const barChartRef = useRef(null)

    useEffect(() => {
        renderChart()
    }, [])

    const renderChart = () => {
        // Bar Chart
        const barCanvas = barChartRef.current.getContext('2d')
        const barLabels = ['Candidate 1', 'Candidate 2', 'Candidate 3']
        const barData = {
            labels: barLabels,
            datasets: [{
                label: 'Candidates of Current Vote',
                data: [50, 59, 70],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 2
            }]
        }

        new Chart(barCanvas, {
            type: 'bar',
            data: barData,
            type: 'bar',
            options: {
                indexAxis: 'y',
            }
        });
    }

    return (
        <CommonLayout>
            <Stack>
                <p className='font-bold text-2xl'>Dashboard</p>

                <Flex className="w-3/4">
                    <canvas ref={barChartRef}></canvas>
                </Flex>
            </Stack>
        </CommonLayout>
    )
}

export default AdminDashboard