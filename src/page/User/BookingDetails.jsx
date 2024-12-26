import { useEffect, useState } from 'react'
import Map from '../../components/Map'
import { getLocation } from '../../supabase'

const BookingDetails = () => {

    const [bookingLocation, setBookingLocation] = useState(null)

    useEffect(() => {

        const getLocationById = async () => {
            let res = await getLocation()

            if (!res.success) alert(res.message)

            setBookingLocation(res.data)
        }

        getLocationById()

    }, [])

    return (
        <div className='w-full flex justify-center'>
            <div className='w-1/2'>
                {
                    bookingLocation
                        ? <Map bookingLocation={bookingLocation} />
                        : <h1>No location found!</h1>
                }
            </div>
        </div>
    )
}

export default BookingDetails
