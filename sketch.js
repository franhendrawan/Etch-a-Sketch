// Grid id container element
const gridContainer = document.querySelector('#grid-container');
const resetButton = document.querySelector('#reset-button');
const resizeButton = document.querySelector('#resize-button');

// Function to generate a random RGB color
function randomizedRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Track opacity in tenths to avoid floating-point equality issues
let opacityStep = 0;

// Create 256 grid items and append them to the grid container
function createGridItems(size) {
    gridContainer.innerHTML = ''; // Clear existing grid items
    const gridSize = size; // Number of rows and columns (16x16 grid)

    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        gridItem.style.width = `${100 / gridSize}%`; // Set width based on grid size
        gridItem.style.height = `${100 / gridSize}%`; // Set height based on grid size

        // Add event listener to change color on hover
        gridItem.addEventListener('mouseover', () => {
            gridItem.style.backgroundColor = randomizedRGB(); // Change color on hover with random RGB value
            // Increment opacity step and cycle back to 0 after reaching 10
            opacityStep = (opacityStep + 1) % 10;
            gridItem.style.opacity = opacityStep / 10;
        });

        gridContainer.appendChild(gridItem);
    }
}

// Size button event listener
resizeButton.addEventListener('click', () => {
    const newSize = prompt('Enter new grid size (1-100):');
    const size = parseInt(newSize);
    // Check if the size is valid (between 1 and 100)
    if (size >= 1 && size <= 100) {
        createGridItems(size); // Create new grid items with the specified size
        opacityStep = 0; // Reset opacity cycle when resizing
    } else {
        alert('Invalid size. Please enter a number between 1 and 100.');
    }
});

// Reset button event listener
resetButton.addEventListener('click', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.style.backgroundColor = ''; // Reset background color
        item.style.opacity = ''; // Reset opacity
        opacityStep = 0; // Reset opacity cycle
    });
});

// Initial grid creation with default size of 16
createGridItems(16);

