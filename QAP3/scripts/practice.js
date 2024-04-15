//Zachary Ropson QAP 3
//Submitted April 15th, 2024

// Question 1
// This function is triggered on a certain event (like a button click). It prevents the default form submission, 
// constructs a string of HTML to display user details, and then sets the innerHTML of the element with id 'output' to this string.
function displayObj(event) {
    event.preventDefault(); // Prevents the default form submission
    let output = '<h2>User Details</h2>'; // Start of the output string
    if (users.length === 0) { // If there are no users
        output += '<p>No users to display</p>'; // Add a message saying there are no users
    } else { // If there are users
        output += '<ul>'; // Start a list
        users.forEach(user => { // For each user
            output += `<li>Name: ${user.name}, Age: ${user.age}</li>`; // Add a list item with the user's details
        });
        output += '</ul>'; // End the list
    }
    document.getElementById('output').innerHTML = output; // Set the innerHTML of the 'output' element to the output string
}
// Question 2
// This function is triggered on a certain event (like a button click). It prevents the default form submission, 
// makes a GET request to 'data/user.json', and then sets the innerHTML of the element with id 'json-output' to the user details from the JSON.
function showJSON(event) {
    event.preventDefault(); // Prevents the default form submission
    const xhr = new XMLHttpRequest(); // Creates a new XMLHttpRequest object
    xhr.open('GET', 'data/user.json', true); // Initializes a GET request to 'data/user.json'

    xhr.onload = function() { // When the request has completed
        if (this.status === 200) { 
            const user = JSON.parse(this.responseText); // Parse the response text as JSON
            let output = '<h2>User Details from JSON</h2>'; 
            output += `<p>Name: ${user.name}</p>`; 
            output += `<p>Email: ${user.email}</p>`; 
            output += `<p>Company: ${user.company}</p>`; 
            output += `<p>Address: ${user.address}</p>`;
            document.getElementById('json-output').innerHTML = output; // Set the innerHTML of the 'json-output' element to the output string
        } else { // If the status is not 200
            console.error('Error fetching JSON'); // Log an error message
        }
    };

    xhr.onerror = function() { // If an error occurs during the request
        console.error('Error fetching JSON'); // Log an error message
    };

    xhr.send(); // Send the request
}
//Question 3
// This function is triggered on a certain event (like a button click). It prevents the default form submission, 
// fetches todos from 'https://jsonplaceholder.typicode.com/todos', and then sets the innerHTML of the element with id 'todos-output' to the todos list.
function fetchTodos(event) {
    event.preventDefault(); // Prevents the default form submission
    fetch('https://jsonplaceholder.typicode.com/todos') // Fetches todos from the URL
        .then(response => response.json()) // Parses the response as JSON
        .then(data => { // When the promise is resolved
            let output = '<h2>Todos List</h2><ul>'; // Start of the output string
            data.forEach(todo => { // For each todo
                output += `<li>${todo.title} - ${todo.completed ? 'Completed' : 'Not Completed'}</li>`; // Add a list item with the todo's details
            });
            output += '</ul>'; // End the list
            document.getElementById('todos-output').innerHTML = output; // Set the innerHTML of the 'todos-output' element to the output string
        })
        .catch(error => console.error('Error:', error)); // If an error occurs, log the error
}

// Sets the innerHTML of the element with id 'todos-output' to a button that, when clicked, triggers the fetchTodos function.
document.getElementById('todos-output').innerHTML = '<button class="button-primary" onclick="fetchTodos(event)">Load Todos</button>';
