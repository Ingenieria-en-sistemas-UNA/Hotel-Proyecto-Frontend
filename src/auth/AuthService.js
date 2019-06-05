import decode from 'jwt-decode'
import config from '../config/config'

export default class AuthService {
    constructor(domain) {
        this.domain = domain || `${config.URL}/user`
    }

    login = async (username, password) => {
        try {
            const res = await this.fetch(`${this.domain}/signin?username=${username}&password=${password}`, {
                method: 'POST',
            })
            this.setToken(res.token)
            // return Promise.resolve(res)
        }
        catch ({ message }) {

            const serverError = this.getServerError(message)
            
            throw new Error(serverError)
        }
    }

    getServerError = message => {
        console.log(message)
        return message === "Failed to fetch" || message === "NetworkError when attempting to fetch resource." ? "Servidor apagado" : message
    }

    Signup = async (user) => {
        try {
            const res = await this.fetch(`${this.domain}/signup`, {
                method: 'POST',
                body: JSON.stringify(user)
            })
            this.setToken(res.token)
            // return Promise.resolve(res)
        }
        catch (error) {
            throw error
        }
    }

    loggedIn = () => {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired = token => {
        try {
            const decoded = decode(token)
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true
            }
            else
                return false
        }
        catch (err) {
            return false
        }
    }

    setToken = idToken => localStorage.setItem('id_token', idToken)

    getToken = () => localStorage.getItem('id_token')

    logout = () => localStorage.removeItem('id_token')

    getProfile = () => decode(this.getToken())

    getUserRoles = () => {
        const { auth } = this.getProfile()
        return auth
    }

    isAdmin = () => {
        if (this.loggedIn()) {
            const auth = this.getUserRoles()
            let authorities = []
            auth.forEach(({ authority }) => {
                authorities = [ ...authorities, authority]
            })
            for (const authority of authorities) {
                if(authority === "ROLE_ADMIN"){
                    return true
                }
            }
            return false
        }
    }


    fetch = (url, options) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if (this.loggedIn()) {
            let token = this.getToken()
            if (this.isTokenExpired(token)) {
                token = this.refrech()
            }
            headers['Authorization'] = 'Bearer ' + token
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => {
                return response.json()
            })
    }

    fetchImg = async imgName => {
        try {
            const image = await fetch(`${config.URL}/downloadFile/${imgName}`)
                .then(this._checkStatus)
                .then(response => response.blob())
                return Promise.resolve(image)
        } catch ({message}) {
            const serverError = this.getServerError(message)
            
            throw new Error(serverError)
        }
    }

    _checkStatus = response => {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            return response.json().then((json) => {
                var error = new Error(json.message || response.statusText)
                error.response = response
                throw error
            })
        }
    }

    refrech = async () => {
        const profile = this.getProfile()
        try {
            const client = await this.fetch(`${this.domain}/refresh/${profile.sub}`)
            console.log(client)
            this.setToken(client.token)    
        } catch (error) {
            console.log(error)
        }
    }
}