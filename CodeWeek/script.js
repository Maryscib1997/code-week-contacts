let allUsers = [];

// Funzione per recuperare e visualizzare i dati degli utenti
async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    allUsers = users;
    return users;
}

// Filtrare gli utenti in base al pulsante cliccato o alla ricerca
async function filterUsers(range, query = '') {
    let filteredUsers = allUsers;

    // Filtra per range
    switch(range) {
        case 'AE':
            filteredUsers = filteredUsers.filter(user => /^[A-E]/i.test(user.name));
            break;
        case 'FL':
            filteredUsers = filteredUsers.filter(user => /^[F-L]/i.test(user.name));
            break;
        case 'MZ':
            filteredUsers = filteredUsers.filter(user => /^[M-Z]/i.test(user.name));
            break;
        case 'ALL':
        default:
            filteredUsers = filteredUsers;
    }

    // Filtra per query di ricerca
    if (query) {
        filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
    }

    displayUsers(filteredUsers);
}

// Visualizzare gli utenti filtrati
function displayUsers(users) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    if (users.length === 0) {
        cardContainer.innerHTML = '<p>Nessun account trovato per questo filtro</p>';
    } else {
        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'card';

            // Genera un numero casuale tra 1 e 99
            const randomNumber = Math.floor(Math.random() * 100) + 1;
            const imgSrc = `https://randomuser.me/api/portraits/women/${randomNumber}.jpg`;

            // Crea l'elemento img
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = user.name;
            img.className = 'card-img';
            card.appendChild(img);

            const name = document.createElement('h2');
            name.textContent = user.name;
            card.appendChild(name);
            
            const username = document.createElement('p');
            username.innerHTML = `<strong>Username:</strong> ${user.username}`;
            card.appendChild(username);

            const email = document.createElement('p');
            email.innerHTML = `<strong>Email:</strong> ${user.email}`;
            card.appendChild(email);

            const address = document.createElement('p');
            address.innerHTML = `<strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
            card.appendChild(address);

            const phone = document.createElement('p');
            phone.innerHTML = `<strong>Phone:</strong> ${user.phone}`;
            card.appendChild(phone);

            const website = document.createElement('p');
            website.innerHTML = `<strong>Website:</strong> ${user.website}`;
            card.appendChild(website);

            const company = document.createElement('p');
            company.innerHTML = `<strong>Company:</strong> ${user.company.name}`;
            card.appendChild(company);

            cardContainer.appendChild(card);
        });
    }
}

// Cambio colore bottone
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const researchInput = document.getElementById('research');

// Passaggio del mouse sui bottoni
function handleMouseOver() {
    this.style.opacity = 0.6; // Riduce l'opacità al passaggio del mouse
}

// Uscita del mouse dai bottoni
function handleMouseOut() {
    this.style.opacity = 1; // Ripristina l'opacità originale all'uscita del mouse
}

// Gestire il click
function handleClick() {
    // Rimuovi la classe 'selected' da tutti i bottoni
    [button1, button2, button3, button4].forEach(btn => {
        btn.classList.remove('selected');
        btn.style.color = 'white'; // Ripristina colore del testo originale per tutti i bottoni
        btn.style.backgroundColor = 'rgb(2, 0, 74)'; // Ripristina colore di sfondo originale per tutti i bottoni
        btn.style.border = 'none'; // Rimuovi bordo per tutti i bottoni
    });

    this.classList.add('selected'); // Aggiungi la classe 'selected' al bottone cliccato
    this.style.color = 'rgb(2, 0, 74)'; // Cambia colore del testo per il bottone cliccato
    this.style.backgroundColor = 'white'; // Cambia colore di sfondo per il bottone cliccato
    this.style.border = '1px solid rgb(2, 0, 74)'; // Aggiungi bordo blu per il bottone cliccato

    // Chiamata alla funzione di filtraggio con il valore del bottone cliccato
    let range;
    switch (this.id) {
        case 'button1':
            range = 'AE';
            break;
        case 'button2':
            range = 'FL';
            break;
        case 'button3':
            range = 'MZ';
            break;
        case 'button4':
            range = 'ALL';
            break;
        default:
            range = 'ALL';
            break;
    }

    filterUsers(range); // Filtra gli utenti in base al bottone cliccato
}

// Disabilita bottoni e ripristina stile quando l'input di ricerca è in focus
function handleResearchFocus() {
    [button1, button2, button3, button4].forEach(btn => {
        btn.disabled = true; // Disabilita i bottoni
        btn.classList.remove('selected'); // Rimuovi la classe selected dai bottoni
        btn.style.color = 'white'; // Ripristina colore del testo originale 
        btn.style.backgroundColor = 'rgb(2, 0, 74)'; // Ripristina colore di sfondo originale 
        btn.style.border = 'none'; // Rimuovi bordo 
    });
}

// Abilita bottoni quando l'input di ricerca perde il focus
function handleResearchBlur() {
    [button1, button2, button3, button4].forEach(btn => {
        btn.disabled = false; // Abilita i bottoni
    });
}

// Aggiungi event listener per il click
[button1, button2, button3, button4].forEach(btn => {
    btn.addEventListener('click', handleClick);
    btn.addEventListener('mouseover', handleMouseOver);
    btn.addEventListener('mouseout', handleMouseOut);
});

// Aggiungi event listener per il focus e blur dell'input di ricerca
researchInput.addEventListener('focus', handleResearchFocus);
researchInput.addEventListener('blur', handleResearchBlur);

// Event listener per l'input nella barra di ricerca
researchInput.addEventListener('input', () => {
    const value = researchInput.value;
    filterUsers('ALL', value);
});

// Caricamento iniziale di tutti gli utenti
fetchUsers().then(users => {
    allUsers = users;
    filterUsers('ALL');
});
