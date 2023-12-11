async function showOptions(category) {
    const response = await fetch('gigs.json');
    const data = await response.json();

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    const uniqueOptions = new Set();
    data.gigs.forEach(gig => uniqueOptions.add(gig[category]));

    const optionsList = document.createElement('div');
    uniqueOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('options-list-item');

        button.addEventListener('click', () => {
            hideOptions();
            showGigsPage(category, option, data);

        });

        optionsList.appendChild(button);
    });

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close Menu';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', hideOptions);

    optionsContainer.appendChild(optionsList);
    optionsContainer.appendChild(closeButton);
    optionsContainer.style.display = 'block';
}

function showGigsPage(category, selectedOption, data) {
    const homePage = document.getElementById('homePage');
    const gigsPage = document.getElementById('gigsPage');
    const gigsPageContainer = document.getElementById('gigsPageContainer');

    homePage.style.display = 'none';
    gigsPage.style.display = 'block';
    gigsPageContainer.innerHTML = '';

    const gigsLogo = document.createElement('div');
    gigsLogo.innerHTML = '<img src="Images/Logo.png" alt="JGLogo">';
    gigsLogo.classList.add('logo');
    gigsPageContainer.appendChild(gigsLogo);

    const filteredGigs = data.gigs.filter(gig => gig[category] === selectedOption);

    const gigTemplate = `
        <div class="gig-element">
            <div>
                <img src="Images/{{imageFileName}}" alt="{{image}}">
            </div>
            <div class="gig-details">
                <div class="gig-detail">Artist: {{artist}}</div>
                <div class="gig-detail">Date: {{date}}</div>
                <div class="gig-detail">Venue: {{venue}}</div>
                <div class="gig-detail">Price: {{price}}</div>
            </div>
        </div>
    `;

    filteredGigs.forEach(gig => {
        const filledTemplate = gigTemplate
            .replace('{{imageFileName}}', gig.imageFileName)
            .replace('{{artist}}', gig.artist)
            .replace('{{date}}', gig.date)
            .replace('{{venue}}', gig.venue)
            .replace('{{price}}', gig.price);

        const gigElement = document.createElement('div');
        gigElement.innerHTML = filledTemplate.trim();
        gigsPageContainer.appendChild(gigElement.firstChild);
    });
}

function hideOptions() {
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.style.display = 'none';
}

function expLeft(element) {
    element.style.marginLeft = '-5em';
}

function restorePos(element) {
    element.style.marginLeft = '';
}
