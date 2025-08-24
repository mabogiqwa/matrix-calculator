function adjust_matrix_dimensions(matrixBox, rows, cols) {
    const grid = matrixBox.querySelector('.matrix-grid'); //rinds grid where inputs go

    grid.innerHTML = ''; //Clears existing inputs

    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`; //adjusts number of cols according to input

    for (let i = 0; i < rows * cols; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'matrix-cell';

        const row = Math.floor(i/cols)+1;
        const col = (i%cols) + 1;

        const matrixName = matrixBox.querySelector('h3').textContent.includes('A') ? 'a' : 'b'; //Checks if we are in matrix A || B
        input.placeholder = `${matrixName}_${row}${col}`; //sets placeholder

        setupNumberValidation(input);

        grid.appendChild(input);
    }
}