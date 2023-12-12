//Below function...

async function showOptions(category) {
    const response = await fetch('gigs.json');    'http://fb01.decoded.com:5000/api/gigs'
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


//Below code is for registration

function showRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    registrationForm.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    const userRegistrationForm = document.getElementById('userRegistrationForm');

    userRegistrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get user input values
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Store user details in local storage
        const userDetails = {
            username: username,
            email: email,
            password: password
        };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));

        // Hide the registration form after registration
        const registrationForm = document.getElementById('registrationForm');
        registrationForm.style.display = 'none';
    });
});

//Below code is for login

function handleLogin() {
    const loginForm = document.getElementById('loginForm');
    loginForm.style.display = 'block';
}

function loginUser() {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    const loginForm = document.getElementById('loginForm');
    const enteredUsername = document.getElementById('loginUsername').value;
    const enteredPassword = document.getElementById('loginPassword').value;

    if (
        storedUserDetails &&
        enteredUsername === storedUserDetails.username &&
        enteredPassword === storedUserDetails.password
    ) {
        // Clear login form
        loginForm.style.display = 'none';

        // Hide the login and register buttons
        const loginButton = document.getElementById('login');
        const registerButton = document.getElementById('register');
        const loginText = document.getElementById('AR');
        const registerText = document.getElementById('FTH');
        
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        loginText.style.display = 'none';
        registerText.style.display = 'none';

        // Show user profile section
        const userProfile = document.createElement('section');
        userProfile.setAttribute('id', 'userProfile');
        
        // Create and add user image
        const userImage = document.createElement('img');
        userImage.setAttribute('src', 'Images/UserProfile.png'); // Replace 'path_to_your_image.jpg' with the actual path to your image
        userImage.setAttribute('alt', 'User Image');
        userProfile.appendChild(userImage);

        // Create and add user welcome message
        const welcomeMessage = document.createElement('h2');
        welcomeMessage.textContent = `${enteredUsername}`;
        userProfile.appendChild(welcomeMessage);


        // Add CSS classes for styling
        userProfile.classList.add('user-profile');
        welcomeMessage.classList.add('welcome-message');
        userImage.classList.add('user-image');
        
        // Append the user profile to the home page container
        const homePageContainer = document.getElementById('homePageContainer');
        homePageContainer.appendChild(userProfile);
    
    } else {
        // Display an error message for incorrect login details
        alert('Incorrect username or password. Please try again.');
    }
}

//Function to ensure the login and register forms close if a user clicks away:


document.body.addEventListener('click', function(event) {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('login');
    const registerButton = document.getElementById('register');

    // Check if the clicked element is not within the registration or login forms,
    // and not the login/register buttons
    if (
        event.target !== registrationForm && !registrationForm.contains(event.target) &&
        event.target !== loginForm && !loginForm.contains(event.target) &&
        event.target !== loginButton && event.target !== registerButton
    ) {
        registrationForm.style.display = 'none';
        loginForm.style.display = 'none';
    }
});



//Below function...

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
            <div class="buyTickets">I want in!<br>Purchase</div>
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
