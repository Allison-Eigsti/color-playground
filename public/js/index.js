const user = localStorage.getItem('UUID');
const form = document.querySelector('form');


document.addEventListener('DOMContentLoaded', () => {
    // Checks if browser is associated with a user
    if (user === null) {
        generateUUID();
    }

    // Loop through divs to change background color based on user input
    for (let i = 1; i <= 4; i++) {
        const color = document.getElementById(`color${i}`);
        const picker = document.getElementById(`colorPicker${i}`);

        if (color && picker) {
            color.addEventListener('click', () => {
                picker.click();
            })

            picker.addEventListener('input', (event) => {
                const colorValue = event.target.value;
                color.style.backgroundColor = colorValue;
            })
        }
    }

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!user) {
                console.error('No user found.')
                return;
            }
            
            const data = new FormData(form);

            const newPalette = {
                user: user,
                title: data.get('title'),
                colors: [
                    data.get('color1'),
                    data.get('color2'),
                    data.get('color3'),
                    data.get('color4'),
                ]
            }

            try {
                const res = await fetch('http://localhost:8000/api/palettes', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(newPalette)
                });

                if (res.ok) {
                    window.location.href = '../library.html';
                }
            }
            catch (error) {
                console.error(error.message)
            }
        })
    }
})


// Creates new user UUID
function generateUUID() {
    let newUUID = crypto.randomUUID();
    localStorage.setItem('UUID', newUUID);
}


export { user };