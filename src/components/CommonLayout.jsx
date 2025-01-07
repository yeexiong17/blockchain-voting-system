import { Navbar } from '../components/Navbar'
import { Container, LoadingOverlay } from '@mantine/core'

import { useAuth } from '../Context'

const CommonLayout = ({ children }) => {

    const { auth, visible } = useAuth()

    return (
        <Container pos='relative' fluid={true} className='flex flex-col pt-5 pb-10 md:flex-row md:pt-0 md:pb-0'>
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            {
                auth
                    ? <Navbar />
                    : ''
            }
            <Container
                className='grow w-full md:pt-5 md:pb-10'>
                {children}
            </Container>
        </Container >
    )
}

export default CommonLayout