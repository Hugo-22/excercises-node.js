const axios = require('axios').default
const Human = require('./Human')

// Exercice 1
// Créez une fonction qui appelle l'API de SWAPI et qui retourne Yoda
const getYoda = async () => {
    try {
        const res = await axios.get('http://swapi.dev/api/people/', {
            params: {
                search: 'yoda'
            }
        })
        console.log(res.data.results);
    }
    catch (err) {
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

        for (let i = 0; i < humanPeople.data.people.length; i++) {
            const result = await axios.get(humanPeople.data.people[i])
            humans.push(result.data.height)
        }

        const totalHeight = humans.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue), 0)
        console.log(totalHeight)
    } catch (err) {
        console.log(err)
    }
}
// getTotalHeight()

// Exercice 4
// Créez une fonction qui retourne un tableau de tous les humains,
// contenant le nom, la taille, le poids, le nom des films
// dans lesquels ils sont apparus et le nom de leur planète d'origine
const getHumans = async () => {
    const humans = []
    try {
        const humansList = await axios.get('http://swapi.dev/api/species/1')
        
        for (let i = 0; i < humansList.data.people.length; i++) {
            
            const infos = await axios.get(humansList.data.people[i])
            const planet = await getHomeworld(infos.data.homeworld)
            const filmsTitle = await getFilms(infos.data.films)

            humans.push(new Human(infos.data.name, infos.data.height, infos.data.mass, planet.data.name, filmsTitle))
        }
    } catch (err) {
        console.log(err)
    }
    console.log(humans);
}
// getHumans()


// Récupère le nom d'une planète
const getHomeworld = async (planetUrl) => {
    try {
        const nameHomeworld = await axios.get(planetUrl)
        return nameHomeworld
    } catch (err) {
        console.log(err)
    }
}

// Récupère le titre d'un (ou plusieurs) films
const getFilms = async (arrFilmsUrl) => {
    const filmsTitle = []
    try {
        for (const url of arrFilmsUrl) {
            let filmsInfos = await axios.get(url)
            filmsTitle.push(filmsInfos.data.title)
        }
    } catch (err) {
        console.log(err)
    }
    return filmsTitle;
}