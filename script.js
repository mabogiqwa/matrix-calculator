//adjust_matrix_dimensions ensures that the dimensions of the matrix are changed
//according to user input i.e builds the grid
function adjust_matrix_dimensions(matrixBox, rows, cols) {
    const grid = matrixBox.querySelector('.matrix-grid'); //rinds grid where inputs go

    rows = Math.min(rows, 4);
    cols = Math.min(cols, 4);

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
        input.value = input.value.replace(/[^0-9]/g, '');

        if (input.value.startsWith('0')) {
            input.value = input.value.replace(/^0+/, '');
        }
    });
}

//Attaches a signal/listeners for row/column inputs in both matrices/grids
document.querySelectorAll('.matrix-box').forEach(matrixBox => {
    const [rowInput, colInput] = matrixBox.querySelectorAll('.size-input input'); //finds all the <input> elements in .size-input input and stores in array-like structure
    rowInput.addEventListener('input', () => {
        adjust_matrix_dimensions(matrixBox, parseInt(rowInput.value), parseInt(colInput.value));
    }); //event listener that changes rows according to user input
    colInput.addEventListener('input', () => {
        adjust_matrix_dimensions(matrixBox, parseInt(rowInput.value), parseInt(colInput.value));
    }); //event listener that changes columns according to user input
});

function add_matrices(m1, m2) {
    const rowSize1 = m1.length;
    const colSize1 = m1[0].length;
    const rowSize2 = m2.length;
    const colSize2 = m2[0].length;

    //Ensures matrices have the same size
    if (rowSize1 != rowSize2 || colSize1 != colSize2 || rowSize1 > 4 || colSize1 > 4) {
        return [];
    }

    const result = [];
    for (let i = 0; i < rowSize1; i++) {
        const row = [];
        for (let j = 0; j < colSize1; j++) {
            row.push(m1[i][j] + m2[i][j]);
        }
        result.push(row);
    }

    return result;
}

function get_matrix_values(matrixBox) {
    const [rowInput, colInput] = matrixBox.querySelectorAll('.size-input input');
    const rows = parseInt(rowInput.value);
    const cols = parseInt(colInput.value);

    const inputs = matrixBox.querySelectorAll('.matrix-grid input');
    const matrix = [];
    
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            const index = r * cols + c;
            row.push(parseInt(inputs[index].value) || 0);
        }
        matrix.push(row);
    }

    return matrix;
}

function display_operation_result(matrix, operationName) {
    const resultsDiv = document.querySelector('.matrix-action-results');
    resultsDiv.innerHTML = `<h4>${operationName} Result:</h4>`;

    const table = document.createElement('table');
    table.className = 'result-matrix';
    matrix.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    resultsDiv.appendChild(table);
}

document.querySelector('.matrix-actions button').addEventListener('click', () => {
    const [matrixABox, matrixBBox] = document.querySelectorAll('.matrix-box');
    const A = get_matrix_values(matrixABox);
    const B = get_matrix_values(matrixBBox);

    const result = add_matrices(A, B);

    if (result.length === 0) {
        alert("Matrices must have the same dimensions.");
        return;
    }

    display_operation_result(result, "A + B");
});