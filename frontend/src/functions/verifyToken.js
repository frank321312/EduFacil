import axios from 'axios'
import Cookies from 'universal-cookie'

// Verifica si el token es valido, si es true el token es valido, si es false, el token no es valido
export const requestVerifyToken = async (token) => {
    const cookies = new Cookies()
    try {
        await axios.post("http://localhost:6008/api/token", { token })
        return true
    } catch (error) {
        if (error.response.data.error === 1) {
            cookies.remove("jwt")
            return false
        } else if (error.response.data.error === 2) {
            cookies.remove("jwt")
            return false
        } else {
            cookies.remove("jwt")
            return false
        }
    }
}