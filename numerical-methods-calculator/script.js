function adjust_matrix_dimensions(size) {
    const grid = document.getElementById('matrix-grid');
    const sizeDisplay = document.getElementById('size-display');

    size = Math.min(Math.max(size, 2), 5);

    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    sizeDisplay.textContent = size;

    for (let i = 0; i < size * size; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'matrix-cell';

        const row = Math.floor(i/size) + 1;
        const col = (i%size) + 1;
        input.placeholder = `a_${row}${col}`;

        numberValidation(input);
        grid.appendChild(input);
    }

    const initialVectorInput = document.getElementById('initial-vector');
    const placeholderVector = Array(size).fill('1').join(', ');
    initialVectorInput.placeholder = placeholderVector;
    initialVectorInput.value = placeholderVector;
}

function numberValidation(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value;
    });
}

document.getElementById('matrix-size').addEventListener('input', (e) => {
    adjust_matrix_dimensions(parseInt(e.target.value));
});

adjust_matrix_dimensions(3);