import { useNavigate } from 'react-router-dom'

import { Button, Stack } from '@mantine/core'
import CommonLayout from '../components/CommonLayout'

const Public = () => {

    const navigate = useNavigate()

    return (
        <CommonLayout>
            <Stack
                styles={() => ({
                    root: {
                        height: '100%',
                    }
                })}
            >
                <div>
                    <p className='font-bold text-3xl'>App Name</p>
                </div>

                <Stack className='mt-auto'>
                    <Button variant="filled" onClick={() => navigate('/register')} size="md" radius="md">Sign Up</Button>
                    <Button variant="filled" onClick={() => navigate('/login')} size="md" radius="md">Log In</Button>
                </Stack>
            </Stack>
        </CommonLayout>
    )
}

export default Public