import { useState, useRef, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Container } from '@mantine/core'

const CommonLayout = ({ children }) => {

    return (
        <div className='flex'>

            <Navbar />
            <Container className='flex-1'>
                {children}
            </Container>
        </div>
    )
}

export default CommonLayout