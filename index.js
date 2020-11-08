const axios = require('axios').default

// Exercice 1
// Créez une fonction qui appelle l'API de SWAPI et qui retourne Yoda
const getYoda = async () => {
    try {
        let page = 1
        let lastPage = false

        while (!lastPage) {
            let res = await axios.get('http://swapi.dev/api/people/', {
                params: {
                    page
                }
            })
            for (const props in res.data.results) {
                if (res.data.results[props].name === 'Yoda') {
                    console.log(res.data.results[props])
                    return;
                }
            }
            res.data.next ? page++ : lastPage = true
    }
    } catch (err) {
        console.log(err)
    }
} 
getYoda()