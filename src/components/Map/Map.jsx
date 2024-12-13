import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import L from 'leaflet'

const Map = ({ bookingLocation }) => {

    const { booking_id, latitude, longitude } = bookingLocation[bookingLocation.length - 1]

    const markerIcon = L.icon({ iconUrl: "/images/leaflet/marker-icon.png" })

    return (
        <div className="h-96">
            <MapContainer className="h-full" center={[latitude, longitude]} zoom={80} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]} icon={markerIcon}>
                    <Popup>
                        <p>{latitude}, {longitude}</p>
                    </Popup>
                </Marker>
            </MapContainer>
        </div >
    )
}

export default Map
