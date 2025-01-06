import { Navbar } from '../components/Navbar'
import { Container } from '@mantine/core'

import { useAuth } from '../Context'

const CommonLayout = ({ children }) => {

    const { auth } = useAuth()

    return (
        <Container fluid={true} className='flex flex-col pt-5 pb-10 md:flex-row md:pt-0 md:pb-0'>
            {
                auth
                    ? <Navbar />
                    : ''
            }
            <Container
                className='w-full md:pt-5'>
                {children}
            </Container>
        </Container >
    )
}

export default CommonLayout