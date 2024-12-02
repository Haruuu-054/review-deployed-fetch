const getemployees = document.querySelector('#employees');
const updateBTN = document.querySelector('#update');
const submit = document.querySelector('#submit');

// Add an event listener to the window to load employee data when the page loads
window.addEventListener('load', () => {
    getEmployees(); // Call the function to fetch and display employee data
});

// Function to fetch employee data from the API and update the table
function getEmployees() {
    let html = ''; // Initialize an empty string to store the HTML for table rows

    // Fetch data from the API
    fetch('https://reviewer-finals-deployment.onrender.com/api/members', {mode: "cors"}, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Optionally, you can add more headers if required (e.g., authorization tokens)
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON data from the response
        })
        .then(data => {
            console.log(data); // Log the parsed data for debugging purposes

            // Loop through each member in the data array and create table rows
            data.forEach(element => {
                html += `
                    <tr>
                        <td>${element.first_name}</td>
                        <td>${element.last_name}</td>
                        <td>
                            <a href="javascript:void(0)" onClick="deleteMember(${element.id})">
                                <!-- Delete icon SVG here -->
                            </a>
                            <a href="javascript:void(0)" onclick="updateMember(${element.id})">
                                <!-- Update icon SVG here -->
                            </a>
                        </td>
                    </tr>
                `;
            });

            // Update the innerHTML of the table body with the generated rows
            getemployees.innerHTML = html;
        })
        .catch(error => {
            console.log('Fetch error:', error); // Log any errors encountered during the fetch process
        });
}



//POST FETCH (INSERT)

submit.addEventListener('click', ()=>{
    let first_name = document.querySelector('#first_name').value
    let last_name = document.querySelector('#last_name').value
    let email = document.querySelector('#email').value
    let gender = document.querySelector('#gender').value

    let formData = {
        'first_name': first_name, 'last_name': last_name, 'email': email, 'gender': gender
    };

    fetch('https://reviewer-finals-deployment.onrender.com/api/members', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers:{
            'Content-Type': 'application/json',
        }
    })
})

//DELETE FETCH
function deleteMember(id) {
    const userConfirmed = confirm("Are you sure you want to delete this member?");
    
    if (userConfirmed) {
        let formData = { id };
        fetch('https://reviewer-finals-deployment.onrender.com/api/members', {
            method: 'DELETE',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.text())
        .then(response => {
            console.log(response);
            alert('Member deleted successfully!');
            location.reload(); // Reload the current page
        })
        .catch(error => {
            console.error(error);
            alert('An error occurred. Please try again.');
        });
    } else {
        console.log("Deletion canceled by the user.");
    }
}

//PUT FETCH (UPDATE)
function updateMember(id) {
    fetch(https://reviewer-finals-deployment.onrender.com/api/members${id})
        .then(response => response.json())
        .then(data => {
            document.querySelector('#first_name').value = data[0].first_name;
            document.querySelector('#last_name').value = data[0].last_name;
            document.querySelector('#email').value = data[0].email;
            document.querySelector('#gender').value = data[0].gender;
            document.querySelector('#id').value = data[0].id;
        })
        .catch(error => console.log('Error fetching member data:', error));
}

updateBTN.addEventListener('click', () => {
    let first_name = document.querySelector('#first_name').value;
    let last_name = document.querySelector('#last_name').value;
    let email = document.querySelector('#email').value;
    let gender = document.querySelector('#gender').value;
    let id = document.querySelector('#id').value;

    // Form data
    let formData = { first_name, last_name, email, gender, id };

    // Sending the update request
    fetch('http://localhost:5000/api/members', {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                // Alert the user on success
                alert('Member updated successfully!');
                // Reload the page
                location.reload();
            } else {
                throw new Error('Failed to update member');
            }
        })
        .catch(error => {
            console.log('Error updating member:', error);
            alert('An error occurred while updating the member.');
        });
});
