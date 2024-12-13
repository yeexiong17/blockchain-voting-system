import { createClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseAnonKey } from './constants'

const options = {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, options)

export const createNewLocation = async (locationData) => {

    const { booking_id, latitude, longitude } = locationData

    try {
        const { data, error } = await supabase
            .from('locations')
            .insert({ booking_id, latitude, longitude })
            .select()

        if (error) {
            throw new Error(error)
        }

        return { success: true, data: data }
    } catch (error) {
        console.log('Error creating new location: ', error)

        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}

export const getLocation = async () => {
    try {
        const { data, error } = await supabase
            .from('locations')
            .select()
            .eq('booking_id', 1)

        if (error) {
            throw new Error(error)
        }

        return {
            success: true,
            data
        }

        console.log(data)
    } catch (error) {
        return {
            success: false,
            message: "An error has occured: " + error
        }
    }
} 