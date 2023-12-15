//showOptions function fetches data from my 'gigs' API, which is generated using c# and
//stored on a remote server. It then generates a set of buttons based on unique values 
//found within the specified category of the fetched data.

//Please note - My intention was to exclude the 'Date' option from this function and then add a function    
//to deal specifically with 'Date'. The plan was to display a calendar for the user to select a date range which
//would then show the relevant gigs within that range.............but I ran out of time! 


async function showOptions(category) {
    const response = await fetch('http://fb01.decoded.com:5000/api/gigs');  //'gigs.json'
    const data = await response.json();                     //The fetched data is converted to JSON and stored in the data variable.

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    const uniqueOptions = new Set();                        //It iterates through (loops over) the fetched data and extracts unique values for
    data.forEach(gig => uniqueOptions.add(gig[category]));  //the specified category. These unique values are stored in the Set 'uniqueOptions'.
    
    const optionsList = document.createElement('div');      //For each unique option found, it creates a new button element, each button is given
    uniqueOptions.forEach(option => {                       //the text content based on the unique option and assigned a class. Event listeners     
        const button = document.createElement('button');    //are added to each button, where clicking a button calls hideOptions() and                         
        button.textContent = option;                        //showGigsPage() with specific parameters.  
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

    optionsContainer.appendChild(optionsList);              //The options list and the close button are added to the optionsContainer.
    optionsContainer.appendChild(closeButton);
    optionsContainer.style.display = 'block';
}


//showRegistrationForm() displays the registration form. When the user submits the form (userRegistrationForm), it prevents the default 
//submission, captures user input, saves it in localStorage, and hides the registration form after successful registration.
//It then retains user details using browser localStorage.


function showRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    registrationForm.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    const userRegistrationForm = document.getElementById('userRegistrationForm');

    userRegistrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get user input values:

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Store user details in local storage:

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

//Below functions manage the login process by checking user input against stored credentials and then dynamically displaying
//a user profile (avatar and welcome message) upon successful authentication, whilst also handling errors for incorrect login details.

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

        // Show user profile section:

        const userProfile = document.createElement('section');
        userProfile.setAttribute('id', 'userProfile');
        
        // Create and add user image:

        const userImage = document.createElement('img');
        userImage.setAttribute('src', 'Images/UserProfile.png');
        userImage.setAttribute('alt', 'User Image');
        userProfile.appendChild(userImage);

        // Create and add user welcome message:

        const welcomeMessage = document.createElement('h2');
        welcomeMessage.textContent = `Welcome ${enteredUsername}`;
        userProfile.appendChild(welcomeMessage);

        // Add CSS classes for styling:

        userProfile.classList.add('user-profile');
        welcomeMessage.classList.add('welcome-message');
        userImage.classList.add('user-image');
        
        // Append the user profile to the home page container:

        const homePageContainer = document.getElementById('homePageContainer');
        homePageContainer.appendChild(userProfile);
    
    } else {
        alert('Incorrect username or password. Please try again.'); //Display an error message for incorrect login details
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


//Below function creates the gigsPage which is accessed by selecting an option from the 
//optionsContainer. Content of the gigsPage is generated dynamically based on what the user
//has selected, and the details are added to the html template.

function showGigsPage(category, selectedOption, data) {
    const homePage = document.getElementById('homePage');
    const gigsPage = document.getElementById('gigsPage');
    const gigsPageContainer = document.getElementById('gigsPageContainer');

    homePage.style.display = 'none';
    gigsPage.style.display = 'block';
    gigsPageContainer.innerHTML = '';

//The 12 lines below ensure the JG logo and JUST GIGS text appear on the gigsPage when homePage 
//is hidden:
    
    const gigsLogo = document.createElement('div');
    const justGigs = document.createElement('div');
    const slogan = document.createElement('div');

    gigsLogo.innerHTML = '<img src="Images/Logo.png" alt="JGLogo">';
    justGigs.innerHTML = 'JUST<br>GIGS';
    slogan.innerHTML = 'The place for music fanatics.';

    gigsLogo.classList.add('logo');
    justGigs.classList.add('justGigs');
    slogan.classList.add('slogan');

    gigsPageContainer.appendChild(gigsLogo);
    gigsPageContainer.appendChild(justGigs);
    gigsPageContainer.appendChild(slogan);

    const filteredGigs = data.filter(gig => gig[category] === selectedOption);

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

//Iterates through the filtered gigs, replaces placeholders in a template with gig data, and creates HTML elements for each gig.
//Appends these gig elements to the gigs page container:

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

//Creates a "Back Home" button dynamically:

    const homeButton = document.createElement('button');
        homeButton.textContent = 'Back Home';
        homeButton.classList.add('home-button')
        homeButton.addEventListener('click', () => {
            gigsPage.style.display = 'none';
            homePage.style.display = 'block';
    });

    gigsPageContainer.appendChild(homeButton);
}

//Hides the options container element:

function hideOptions() {
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.style.display = 'none';
}

//Functions below move the specificSearch buttons left 'onmouseover' and then
//return to theor original positions 'onmouseout'.

function expLeft(element) {
    element.style.marginLeft = '-5em';
}

function restorePos(element) {
    element.style.marginLeft = '';
}
