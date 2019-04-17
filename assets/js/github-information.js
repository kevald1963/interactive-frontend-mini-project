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

function repoInformationHTML(repos) {
    // Check array length to see if any information returned.
    // A zero length indicates nothing returned.
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repositories found!</div>`;
    };

    // The map method works like a forEach, but returns an array with the results of the function.
    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href ="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });
    
    // The join method below on the array, joins everything within the array
    // into one string. However a newline is added between each element so  
    // that each array item is displayed individually. This is a a clever
    // way of avoiding having to iterate through the array once again.
    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repository List:</strong>
                </p>    
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
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
    
    // Make a "promise" - i.e wait for a response to be made before doing something with that response!
    // Part of the jQuery library.
    $.when(
        // 1. Get GitHub API data, corresponding to the entered username, in JSON format i.e. as an object.
        // 2. Get the repository information as well.
        // Note the comma between the two JSON statements! This was missed originally
        // causing an error that was real hard to find (complained about missing bracket)!
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    // When we get the data, then display the responses in the user-data & repo-data fields, respectively.
    ).then (
        function(firstResponse, secondResponse) {
            // Note that if more than one type of data is requested then all data is put in 
            // the first cell of separate arrays for each.
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            // Call our bespoke functions with the API response as a parameter.
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
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