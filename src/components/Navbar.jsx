import { useLocation, Link } from 'react-router-dom'

import {
    IconFingerprint,
    IconEdit,
    IconHome,
    IconLogout,
} from '@tabler/icons-react'
import { Group } from '@mantine/core'

import classes from '../styles/mantine.module.css'
import { useAuth } from '../Context'

const data = [
    { link: '/home', label: 'Home', icon: IconHome },
    { link: '/register-vote', label: 'Register Vote', icon: IconEdit },
    { link: '/vote', label: 'Vote', icon: IconFingerprint },
]

export function Navbar() {
    const { signOut } = useAuth()
    const location = useLocation()

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
    )
}