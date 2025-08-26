//adjust_matrix_dimensions ensures that the dimensions of the matrix are changed
//according to user input i.e builds the grid
function adjust_matrix_dimensions(matrixBox, rows, cols) {
    const grid = matrixBox.querySelector('.matrix-grid'); //rinds grid where inputs go

    grid.innerHTML = ''; //Clears existing inputs

    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`; //adjusts number of cols according to input

    for (let i = 0; i < rows * cols; i++) {
        const input = document.createElement('input');//create new <input> element and stores it in memory
        input.type = 'text'; //sets the type attribute of <input> to text
        input.className = 'matrix-cell'; //assigns the class 'matrix-cell' to <input>

        const row = Math.floor(i/cols)+1;
        const col = (i%cols) + 1;

        const matrixName = matrixBox.querySelector('h3').textContent.includes('A') ? 'a' : 'b'; //Checks if we are in matrix A || B
        input.placeholder = `${matrixName}_${row}${col}`; //sets placeholder

        number_validation(input);

        grid.appendChild(input);
    }
}

//Ensures that only values from the set of positive integers are allowed
function number_validation(input) {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/[^0-4]/g, '');

        if (input.value.startsWith('0')) {
            input.value = input.value.replace(/^0+/, '');
        }
    });
}

//Attaches a signal/listeners for row/column inputs in both matrices/grids
document.querySelectorAll('.matrix-box').forEach(matrixBox => {
    const [rowInput, colInput] = matrixBox.querySelectorAll('.size-input input');
    rowInput.addEventListener('input', () => {
        adjust_matrix_dimensions(matrixBox, parseInt(rowInput.value), parseInt(colInput.value));
    });
    colInput.addEventListener('input', () => {
        adjust_matrix_dimensions(matrixBox, parseInt(rowInput.value), parseInt(colInput.value));
    });
});