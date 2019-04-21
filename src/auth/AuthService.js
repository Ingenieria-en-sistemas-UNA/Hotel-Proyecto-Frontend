import decode from 'jwt-decode';
export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://192.168.43.102:8443/user'
    }

    login = async (username, password) => {
        try {
            const res = await this.fetch(`${this.domain}/signin?username=${username}&password=${password}`, {
                method: 'POST',
            });
            this.setToken(res.token);
            // return Promise.resolve(res);
        }
        catch (error) {

            if(error.message === "Failed to fetch" || error.message === "NetworkError when attempting to fetch resource." ) {
                throw new Error("Servidor apagado")
            } 
            throw error
        }
    }
    Signup = async (user) => {
        try {
            const res = await this.fetch(`${this.domain}/signup`, {
                method: 'POST',
                body: JSON.stringify(user)
            });
            this.setToken(res.token);
            // return Promise.resolve(res);
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
            let token = this.getToken()
            if(this.isTokenExpired(token)){
                token = this.refrech()
            }
            headers['Authorization'] = 'Bearer ' + token
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

    refrech = () => {
        const profile = this.getProfile()
        this.fetch(`${this.domain}/user/refresh/${profile.sub}`)
            .then(({tokenResponse}) => {
                this.setToken(tokenResponse) 
                return Promise.resolve(tokenResponse);
            }).catch(error => { throw error })
    }
}