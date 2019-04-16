function userInformationHTML(user) {
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avant">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following: ${user.followers} <br> Repos: ${user.public_repos}</p>
        </div>`;
};

function fetchGitHubInformation(event) {
    
    // Use jQuery to retrieve the username entered in the input field.
    var username = $("#gh-username").val();
    // If username is blank, put a message in the username field using jQuery.
    // Note use of back ticks instead of normal quotes for the html tag section.
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        // Return nothing as we don't want to search on a blank field!
        return;
    }
    
    // If something has been entered then display an animated loader gif
    // in the user-data div following the username field. Note that the 
    // HTML is created here 'on the fly'.
    $("#gh-user-data").html(
        `<div id="loader">
             <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);
    
    // Make a "promise" (a bit like an 'if.. then' statement but on e that waits for a response).
    // This is part of the jQuery library.
    $.when(
        // Get GitHub API data, corresponding to the entered username, in JSON format i.e. as an object.
        $.getJSON(`https://api.github.com/users/${username}`)
    // When we've got the data then display the response in the user-data field.   
    ).then (
        function(response) {
            var userData = response;
            // Call our bespoke function 'userInformationHTML' with the API response as a parameter.
            $("#gh-user-data").html(userInformationHTML(userData));
        },
        function(errorResponse) {
            // 'Page Not Found' type error.
            if(errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for user ${username}.</h2>`);
                
            } else {
                // Display the message 'as is' for any other type of error.
                console.log(errorResponse);
                $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}.</h2>`);
            }

        }
    );
};