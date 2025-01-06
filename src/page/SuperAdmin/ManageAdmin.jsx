import { useEffect, useState } from 'react'
import { ActionIcon, Button, Checkbox, Group, Menu, Modal, PasswordInput, ScrollArea, Space, Stack, Table, Text, TextInput } from '@mantine/core'
import { IconDots, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import { useDisclosure } from '@mantine/hooks'

import CommonLayout from '../../components/CommonLayout'
import { supabase, supabaseAdmin } from '../../supabase'

const ManageAdmin = () => {
    const [selection, setSelection] = useState(['1'])
    const [adminData, setAdminData] = useState([])
    const [opened, { open, close }] = useDisclosure(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        fetchAllAdmin()
    }, [])

    const fetchAllAdmin = async () => {
        const { data, error } = await supabase.from('users').select().eq('role', 'admin')
        console.log(data)
        setAdminData(data)

        if (error) {
            notifications.show({
                title: 'User Fetch Error',
                message: error.message,
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'red'
            })

            return
        }
    }

    const toggleRow = (id) => {
        setSelection((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        )
    }

    const toggleAll = () => {
        setSelection((current) => (current.length === adminData.length ? [] : adminData.map((item) => item.id)))
    }

    const handleCreateNewAdmin = async () => {

        let trimEmail = email.trim()
        let trimPassword = password.trim()
        let trimName = name.trim()

        const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email: trimEmail,
            password: trimPassword,
            email_confirm: true,
            user_metadata: {
                name: trimName,
                email: trimEmail,
                role: 'admin'
            },
        })

        if (error) {
            notifications.show({
                title: 'Admin Create Error',
                message: error.message,
                className: 'w-5/6 ml-auto',
                position: 'top-right',
                color: 'red'
            })

            return
        }

        notifications.show({
            title: 'Admin Created Successfully',
            className: 'w-5/6 ml-auto',
            position: 'top-right',
            color: 'green'
        })
    }

    const rows = adminData.map((item) => {
        const selected = selection.includes(item.id)
        return (
            <Table.Tr key={item.id}>
                <Table.Td>
                    <Checkbox checked={selection.includes(item.id)} onChange={() => toggleRow(item.id)} />
                </Table.Td>
                <Table.Td>
                    <Group gap="sm">
                        <Text size="sm" fw={500}>
                            {item.name}
                        </Text>
                    </Group>
                </Table.Td>
                <Table.Td>{item.email}</Table.Td>
                <Table.Td>{new Date(item.created_at).toISOString().slice(0, 19).replace('T', ' ')}</Table.Td>
                <Table.Td>
                    <Group gap={0} justify="flex-end">
                        <ActionIcon variant="subtle" color="gray">
                            <IconPencil size={16} stroke={1.5} />
                        </ActionIcon>
                        <Menu
                            transitionProps={{ transition: 'pop' }}
                            withArrow
                            position="bottom-end"
                            withinPortal
                        >
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconDots size={16} stroke={1.5} />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item leftSection={<IconTrash size={16} stroke={1.5} />} color="red">
                                    Terminate contract
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Table.Td>
            </Table.Tr>
        )
    })

    return (
        <CommonLayout>
            <Stack>
                <p className='font-bold text-2xl'>Manage Admin</p>
                <Modal opened={opened} onClose={close} title="New Admin">
                    <TextInput
                        required
                        label="Name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(event) => setName(event.currentTarget.value)}
                        radius="md"
                    />
                    <Space h="md" />
                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={email}
                        onChange={(event) => setEmail(event.currentTarget.value)}
                        radius="md"
                    />
                    <Space h="md" />
                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                        radius="md"
                    />
                    <Space h="md" />
                    <Button onClick={() => handleCreateNewAdmin()}>Create Admin</Button>
                </Modal>
                <Button className='ml-auto' onClick={open}>
                    <IconPlus stroke={2} />
                    New Admin
                </Button>
            </Stack>
            <ScrollArea className='mt-5 h-3/4'>
                <Table miw={800} verticalSpacing="sm" stickyHeader>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th w={40}>
                                <Checkbox
                                    onChange={toggleAll}
                                    checked={selection.length === adminData.length}
                                    indeterminate={selection.length > 0 && selection.length !== adminData.length}
                                />
                            </Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Created At</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </CommonLayout>
    )
}

export default ManageAdmin
