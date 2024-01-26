const express = require('express');
const petList = require('./petList.js');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const htmlRes = `
        <h1>Adopt a Pet</h1>
        <p>Browse through the links below to find your new furry friend:</p>
        <ul>
            <li><a href="/animals/dogs">Dogs</a></li>
            <li><a href="/animals/cats">Cats</a></li>
            <li><a href="/animals/rabbits">Rabbits</a></li>
        </ul>
    `;

    res.send(htmlRes);
});

app.get('/animals/:pet_type', (req, res) => {
    const petType = req.params.pet_type;
    const pets = petList[petType];

    const htmlRes = `
        <h1>List of ${petType}</h1>
        <ul>
            ${pets.map((pet, index) => `
                <li>
                    <a href='/animals/${petType}/${index}'>${pet.name}</a>
                </li>`).join('')}
        </ul>
    `;

    res.send(htmlRes);
});

app.get('/animals/:pet_type/:pet_id', (req, res) => {
    const findPet = petList[req.params.pet_type][req.params.pet_id];

    const htmlRes = `
        <h1>${findPet.name}</h1>
        <img src="${findPet.url}" alt="${findPet.name}">
        <p>${findPet.description}</p>
        <ul>
            <li>Age: ${findPet.age}</li>
            <li>Breed: ${findPet.breed}</li>
        </ul>
    `;
    
    res.send(htmlRes);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
