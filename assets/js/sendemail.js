function sendMail(contactForm) {
    // 1st parameter: Service ID (gmail, outlook, etc).
    // 2nd parameter: Template name set up on emailJS.
    // 3rd parameter: Form object data fields.
    emailjs.send("yahoo", "rosie", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
    .then(
        function(response) {
            console.log("OK", response);
        },
        function(error) {
            console.log("Failed", error);
        });
};
