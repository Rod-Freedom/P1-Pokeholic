
//Bringing team info 
const displayTeamInfo = () => {
    const teamMembers = [
        { name: 'Rodrigo Lavalle', github: 'Rod-Freedom' },
        { name: 'Miguel Uribe', github: 'AlejnadroVill' },
        { name: 'Karime Gutiérrez', github: 'Karimegtz' },
        { name: 'Marco Elias', github: 'Marcoeliasb' },
   //para añadir a más miembros 
    ];

    const teamInfoContainer = document.getElementById('team-info');
    teamMembers.forEach(member => {
        fetch(`https://api.github.com/users/${member.github}`)
            .then(response => {
                console.log(`Response from GitHub for ${member.github}:`, response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(userData => {
                console.log(`Data received for ${member.github}:`, userData);
                const memberElement = document.createElement('div');
                memberElement.innerHTML = `
                    <p>${member.name}</p>
                    <img src="${userData.avatar_url}" alt="Avatar de ${member.name}" style="width: 100px; height: 100px;">
                    <p><a href="${userData.html_url}" target="_blank">@${member.github}</a></p>
                `;
                teamInfoContainer.appendChild(memberElement);
            })
            .catch(error => {
                console.log('Error fetching GitHub data:', error);
                const errorElement = document.createElement('p');
                errorElement.textContent = `Error fetching data for ${member.name}`;
                teamInfoContainer.appendChild(errorElement);
            });
    });
};

window.onload = () => {
    displayTeamInfo(); // Llama a esta función al cargar la página
};
