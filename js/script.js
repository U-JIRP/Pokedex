const base_URL = 'https://pokeapi.co/api/v2/pokemon';


const lblPokeName = document.getElementById("lblPokeName");
const pokemonImg = document.getElementById("pokemonImg");
const txtName = document.getElementById("txtName");
const btnSearch = document.getElementById("btnSearch");
const lblHeight = document.getElementById("lblHeight");
const lblWeight = document.getElementById("lblWeight");
const lblType = document.getElementById("type");

btnSearch.addEventListener('click', function(event) {
    event.preventDefault();
    let pokeName = txtName.value.toLowerCase();

    if (pokeName === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter a valid name',
        })
    } else {
        fecthPokemon(pokeName);
    }
});



const fecthPokemon = (name) => {
    let endPoint = `${base_URL}/${name}`;

    fetch(endPoint).then((resp) => {
        if (!resp.ok) {
            Swal.fire({
                icon: 'error',
                title: `Error ${resp.status}`,
                text: 'Oops...Your request cannot be processed',
            });
            throw new Error(`HTTP error! Status: ${ resp.status }`);

        }

        return resp.json()

    }).then((data) => showInformation(data));
}


function showInformation(data) {

    console.log(data);

    pokemonImg.src = data.sprites.front_default;
    lblPokeName.innerText = data.name;


    let types = [];
    data.types.forEach(type => {
        types.push(`<span style="box-sizing:border-box;background-color:#3498db;color:#ffffff;border-radius: 3rem;text-align: center;padding: .1rem .65rem .2rem; font-size:15px"> ${type.type.name}</span>`);
    });

    let stats = [];
    data.stats.forEach((stat) => {
        stats.push(`<li style="list-style-type: none;text-align="left"><span><i class='bx bx-chart'></i></span><b>${stat.stat.name}:</b> ${ stat.base_stat}<li>`)
    })


    let moves = [];
    data.moves.forEach((move) => {
        moves.push(`<li style="list-style-type:none;"><span><i class='bx bx-star'></i></span>${move.move.name}</li>`)
    })

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<p><b>ID:</b> #${data.id}.</p>
    <p><b>Height:</b> ${data.height} ft.</p>
    <p><b>Weight:</b> ${data.weight} lbs.</p>
    <p><b>Type:</b> ${types.join(' ')}</p>
    <br>
    <div class="row" style="display:flex">
        <div class="column" style="flex:50%">
            <h4>Stats</h4>
            <ul>
                ${stats.join(' ')}
            </ul>
        </div>
        <div class="column" style="flex:50%">
            <h4>Moves</h4>
            <ul>
                ${moves.join(' ')}
            </ul>
        </div>
    </div>`;


    Swal.fire({
        title: `${data.name.split('').map((letter, index) => index ? letter.toLowerCase() : letter.toUpperCase(),).join('')}`,
        imageUrl: `${data.sprites.front_default}`,
        imageWidth: 200,
        imageHeight: 200,
        html: wrapper,
        imageAlt: `${data.name}`,
        confirmButtonText: 'Close',
        showClass: {
            popup: 'animate__animated animate__slideInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown'
        }
    });


}

/*
    types>type>name
    stats>stat>name
    moves>move>name
*/