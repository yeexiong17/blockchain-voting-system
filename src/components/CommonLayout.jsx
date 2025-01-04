import { Navbar } from '../components/Navbar'
import { Container } from '@mantine/core'

const CommonLayout = ({ children }) => {

    return (
        <Container fluid={true} className='flex flex-col pt-8 md:flex-row md:pt-0'>
            <Navbar />
            <Container className='flex-1'>
                {children}
            </Container>
        </Container>
    )
}

export default CommonLayout