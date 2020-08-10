class httpService{
    request = (route, method, getParams = null, headers = false) =>
        new Promise((resolve, reject) => {

            const fullPath = 'http://www.filltext.com/' + route;
            fetch(fullPath).then(response => {
                if(headers){
                    return resolve( {
                        users: response.json()
                    })
                }
                return resolve(response.json())
            }).catch(err => { console.error('err http: ', err); })
        })
}

export default new httpService()