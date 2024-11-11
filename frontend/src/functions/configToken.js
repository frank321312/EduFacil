import axios from "axios"
import Cookies from "universal-cookie"

export const createRequestPut = async (url, object) => {
    const cookies = new Cookies()
    const token = cookies.get("jwt")
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(url, object, config)
    return response
}

export const createRequestGet = async (url) => {
    const cookies = new Cookies()
    const token = cookies.get("jwt")
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(url, config)

    return response
}

export const createRequestPost = async (url, object) => {
    const cookies = new Cookies()
    const token = cookies.get("jwt")
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(url, object, config)

    return response
}

export const tokenError = (error) => {
    const cookies = new Cookies()
    const listError = [1, 2, 3]
    if (listError.includes(error.response.data.error)) {
        cookies.remove("jwt")
    }
}