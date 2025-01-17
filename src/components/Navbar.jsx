import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

import {
    IconFingerprint,
    IconEdit,
    IconLogout,
    IconUserCog,
    IconCheckbox,
    IconUserCheck,
    IconLayoutDashboard,
    IconReportAnalytics,
} from '@tabler/icons-react'
import { Burger, Drawer, Flex, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import classes from '../styles/mantine.module.css'
import { useAuth } from '../Context'

export function Navbar() {
    const location = useLocation()
    const [opened, { open, close }] = useDisclosure(false)
    const [burgerOpened, { toggle }] = useDisclosure()
    const [data, setData] = useState([])

    const { signOut, auth, hasRegistered } = useAuth()

    const [width, setWidth] = useState(window.innerWidth)
    const isMobile = width <= 768


    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange)

        if (auth.user_metadata.role === 'superadmin') {
            setData([
                { link: '/manage-admin', label: 'Manage Admin', icon: IconUserCog },
            ])
        }
        else if (auth.user_metadata.role === 'admin') {
            setData([
                { link: '/admin-dashboard', label: 'Dashboard', icon: IconLayoutDashboard },
                { link: '/manage-candidate', label: 'Manage Candidate', icon: IconUserCheck },
                { link: '/view-logs', label: 'View Log', icon: IconUserCheck },
            ])
        }
        else {
            let data = hasRegistered ? [
                { link: '/voter-registration', label: 'Vote Registration', icon: IconEdit },
                { link: '/vote', label: 'Vote', icon: IconFingerprint },
                { link: '/result', label: 'Result', icon: IconReportAnalytics }
            ] : [
                { link: '/voter-registration', label: 'Vote Registration', icon: IconEdit },
            ]

            setData(data)
        }

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [hasRegistered])

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
    ))

    const transformUrl = (urlString) => {
        let removeSlash = urlString.slice(1)
        let urlWithSpace = removeSlash.replace(/-/g, " ")

        return urlWithSpace.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    }

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
                    <Flex align='center'>
                        <Burger opened={opened} onClick={() => { open(); toggle(); }} aria-label="Toggle navigation" />
                        <div className='p-4'>
                            <h1 className='text-2xl font-bold'>{transformUrl(location.pathname)}</h1>
                        </div>
                    </Flex>
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