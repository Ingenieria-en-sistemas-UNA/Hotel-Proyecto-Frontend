import decode from 'jwt-decode';
import SesionExpiredExceprion from '../Error/SesionExpiredException'
export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://localhost:8443/user'
    }

    login = async (username, password) => {
        try {
            const res = await this.fetch(`${this.domain}/signin?username=${username}&password=${password}`, {
                method: 'POST',
            });
            this.setToken(res.token);
            return Promise.resolve(res);
        }
        catch (error) {
            throw error;
        }
    }
    Signup = async ({username, password, email, roles = [ "ROLE_CLIENT" ]}) => {
        try {
            const res = await this.fetch(`${this.domain}/signup`, {
                method: 'POST',
                body: JSON.stringify({ username, password, email, roles })
            });
            this.setToken(res.token);
            return Promise.resolve(res);
        }
        catch (error) {
            throw error;
        }
    }

    loggedIn = () => {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token) 
    }

    isTokenExpired = token => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken = idToken => localStorage.setItem('id_token', idToken)

    getToken = () => localStorage.getItem('id_token')

    logout = () => localStorage.removeItem('id_token')

    getProfile = () => decode(this.getToken())


    fetch = (url, options) => {

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus = response => {
        if (response.status >= 200 && response.status < 300) { 
            return response
        } else {
            return response.json().then((json) => {
                var error = new Error(json.message || response.statusText)
                error.response = response
                throw error
            });
        }
    }

    refrech = token => {
        if (this.isTokenExpired(token)) {
            return token
        }
        const profile = this.getProfile()
        this.fetch(`${this.domain}/user/refresh/${profile.username}`)
            .then(({tokenResponse}) => {
                this.setToken(tokenResponse) 
                return Promise.resolve(tokenResponse);
            }).catch(error => { throw error })
    }

    getTokenToRequest = () => {
        const token = this.getToken()
        if(!token){
            throw new SesionExpiredExceprion("No se encontro un token valido")
        }
        const verifyToken = this.refrech(token)
        return verifyToken
    }
}