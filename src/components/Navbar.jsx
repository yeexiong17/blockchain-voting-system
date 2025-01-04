import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

import {
    IconFingerprint,
    IconEdit,
    IconHome,
    IconLogout,
} from '@tabler/icons-react'
import { Burger, Button, Drawer, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import classes from '../styles/mantine.module.css'
import { useAuth } from '../Context'

const data = [
    { link: '/home', label: 'Home', icon: IconHome },
    { link: '/voter-registration', label: 'Register Vote', icon: IconEdit },
    { link: '/vote', label: 'Vote', icon: IconFingerprint },
]

export function Navbar() {
    const { signOut } = useAuth()
    const location = useLocation()
    const [opened, { open, close }] = useDisclosure(false)
    const [burgerOpened, { toggle }] = useDisclosure();

    const [width, setWidth] = useState(window.innerWidth)

    const isMobile = width <= 768;

    function handleWindowSizeChange() {
        setWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [])


    const links = data.map((item) => (
        <Link
            to={item.link}
            key={item.label}
            className={classes.link}
            data-active={item.link === location.pathname || undefined}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (

        <>
            {isMobile ? (
                <>
                    <Drawer size="xs" opened={opened} onClose={close} title="Logo">
                        <div className={classes.navbarMain}>
                            {links}
                        </div>
                        <div className={classes.footer}>
                            <a className={classes.link} onClick={(e) => signOut(e)}>
                                <IconLogout className={classes.linkIcon} stroke={1.5} />
                                <span>Logout</span>
                            </a>
                        </div>
                    </Drawer>
                    <div>
                        <Burger opened={opened} onClick={() => { open(); toggle(); }} aria-label="Toggle navigation" />
                    </div>
                </>
            ) : (
                <nav className={`${classes.navbar} h-full`}>
                    <div className={classes.navbarMain}>
                        <Group className={classes.header} justify="space-between">
                            <h1>Logo</h1>
                        </Group>
                        {links}
                    </div>
                    <div className={classes.footer}>
                        <a className={classes.link} onClick={(e) => signOut(e)}>
                            <IconLogout className={classes.linkIcon} stroke={1.5} />
                            <span>Logout</span>
                        </a>
                    </div>
                </nav>
            )}
        </>
    )
}