import CommonLayout from '../components/CommonLayout'
import { Navbar } from '../components/Navbar'

const Home = () => {

    return (
        <CommonLayout>
            <div className='p-4'>
                <h1 className='text-2xl font-bold'>Home</h1>
                <p>Welcome to the home page</p>
            </div>
        </CommonLayout>
    )
}

export default Home
