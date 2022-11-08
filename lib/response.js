// response class for standardized api reposonses

class Response {
    constructor(status = 200, message = null, data = null, error = null) {
        this.status = status
        this.message = message
        this.data = data
        this.error = error
    }
}

module.exports = Response