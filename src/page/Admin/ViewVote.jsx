import { useEffect, useState } from "react"
import { IconDots, IconPencil, IconTrash } from "@tabler/icons-react"
import { ActionIcon, Checkbox, Group, Menu, ScrollArea, Stack, Table, Text } from "@mantine/core"

import CommonLayout from "../../components/CommonLayout"
import { supabase } from "../../supabase"
import { notifications } from "@mantine/notifications"

const ViewVote = () => {
    const [selection, setSelection] = useState(['1'])
    const [adminData, setAdminData] = useState([])

    useEffect(() => {
        fetchAllAdmin()
    }, [])

    const fetchAllAdmin = async () => {
        const { data, error } = await supabase.from('users').select().eq('role', 'user')
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
                <p className='font-bold text-2xl'>View Vote</p>
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
            </Stack>
        </CommonLayout>
    )
}

export default ViewVote
