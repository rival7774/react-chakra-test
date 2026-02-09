import {Box} from '@chakra-ui/react'
import {Outlet} from 'react-router-dom'
import {Header} from "@/components/Header/Header.tsx";

export const MainLayout = () => {
    return (
        <Box minH="100vh">
            <Header/>
            <Box flex="1" p={['25px 19px', null, '21px 40px']}>
                <Outlet/>
            </Box>
        </Box>
    )
}
