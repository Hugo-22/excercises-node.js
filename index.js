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
// getYoda()

// Exercice 2
// Créez une fonction qui retourne le nom de chaque espèce 
// qui contient au moins 2 personnages
const getSpecies = async () => {
    try {
        let page = 1
        let lastPage = false
        const species = []

        while (!lastPage) {
            let res = await axios.get('http://swapi.dev/api/species/', {
                params: {
                    page
                }
            })
            for (const props in res.data.results) {
                if (res.data.results[props].people.length >= 2) {
                    species.push(res.data.results[props].name)
                }
            }
            res.data.next ? page++ : lastPage = true
        }
        console.log(species)
    } catch (err) {
        console.log(err)
    }
}
// getSpecies()

// Exercice 3
// Créez une fonction qui retourne la somme des tailles de tous les humains
const getTotalHeight = async () => {
    try {
        const humans = []
        const humanPeople = await axios.get('http://swapi.dev/api/species/1')
        // console.log(humanPeople.data.p);
        for (let i = 0; i < humanPeople.data.people.length; i++) {
            humans.push(axios.get(humanPeople.data.people[i]))
        }

        axios.all(humans)
        .then((res) => {
            const totalHeight = res.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.data.height), 0)
            console.log(totalHeight);
        })
    } catch (err) {
        console.log(err)
    }
}
getTotalHeight()