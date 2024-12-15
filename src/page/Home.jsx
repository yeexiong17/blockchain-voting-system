import { useEffect, useState, useRef } from 'react'
import { createNewLocation } from '../supabase'


const Home = () => {

    const [position, setPosition] = useState(null)
    const lastPositionRef = useRef(null)
    const DISTANCE_THRESHOLD = 10

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3
        const toRad = (deg) => (deg * Math.PI) / 180
        const dLat = toRad(lat2 - lat1)
        const dLon = toRad(lon2 - lon1)

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        return R * c
    }

    const geolocationInaccessible = () => {
        alert("Can't get location")
    }

    const updateMap = async (pos) => {
        alert("Get location successfully")

        const { latitude, longitude } = pos.coords;

        let locationObject = {
            booking_id: 1,
            latitude,
            longitude
        }

        if (lastPositionRef.current) {
            // Calculate distance from the last position
            const distance = calculateDistance(
                lastPositionRef.current.latitude,
                lastPositionRef.current.longitude,
                latitude,
                longitude
            )

            if (distance >= DISTANCE_THRESHOLD) {
                console.log("Significant position change:", { latitude, longitude })

                // let res = await createNewLocation(locationObject)
                // if (!res.success) alert("Something went wrong while updating location")

                setPosition({ latitude, longitude })
                lastPositionRef.current = { latitude, longitude }
            } else {
                console.log("Insignificant change, nothing happen")
            }
        } else {
            console.log("Initial position:", { latitude, longitude })

            // let res = await createNewLocation(locationObject)
            // if (!res.success) alert("Something went wrong while updating location")

            setPosition({ latitude, longitude })
            lastPositionRef.current = { latitude, longitude }
        }
    }

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(updateMap, geolocationInaccessible, {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 10000
            })
        } else {
            alert('Your current browser does not support the Geolocation feature.')
        }
    }

    return (
        <div>
            <button onClick={handleGetLocation}>Get Current Location</button>

            {position && (
                <div>
                    <p>Latitude: {position.latitude}</p>
                    <p>Longitude: {position.longitude}</p>
                </div>
            )}
        </div>
    )
}

export default Home
