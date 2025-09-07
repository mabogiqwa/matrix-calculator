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

function subtract_matrices(m1, m2) {
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
            row.push(m1[i][j] - m2[i][j]);
        }
        result.push(row);
    }

    return result;
}

function multiply_matrices(m1, m2) {
    const rowSize1 = m1.length;
    const colSize1 = m1[0].length;
    const colSize2 = m2[0].length;

    if (colSize1 != m2.length) {
        return [];
    }

    const result = [];

    for (let i = 0; i < rowSize1; i++) {
        const row = [];
        for (let j = 0; j < colSize2; j++) {
            let sum = 0;
            for (let k = 0; k < colSize1; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            row.push(sum);
        }
        result.push(row);
    }

    return result;
}

function compute_determinant(m) {
    let determinant;
    const rows = m.length;
    const cols = m[0].length;

    if (rows != cols) { return null; }

    if (rows == 2 && cols == 2) {
        determinant = (m[0][0] * m[1][1]) - (m[0][1] * m[1][0]);
    }

    if (rows == 3 && cols == 3) {
        determinant =
            m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
          - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
          + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
    }

    if (rows == 4 && cols == 4) {
        determinant =
            m[0][0] * ( m[1][1] * (m[2][2]*m[3][3] - m[2][3]*m[3][2])
                      - m[1][2] * (m[2][1]*m[3][3] - m[2][3]*m[3][1])
                      + m[1][3] * (m[2][1]*m[3][2] - m[2][2]*m[3][1]) )
          - m[0][1] * ( m[1][0] * (m[2][2]*m[3][3] - m[2][3]*m[3][2])
                      - m[1][2] * (m[2][0]*m[3][3] - m[2][3]*m[3][0])
                      + m[1][3] * (m[2][0]*m[3][2] - m[2][2]*m[3][0]) )
          + m[0][2] * ( m[1][0] * (m[2][1]*m[3][3] - m[2][3]*m[3][1])
                      - m[1][1] * (m[2][0]*m[3][3] - m[2][3]*m[3][0])
                      + m[1][3] * (m[2][0]*m[3][1] - m[2][1]*m[3][0]) )
          - m[0][3] * ( m[1][0] * (m[2][1]*m[3][2] - m[2][2]*m[3][1])
                      - m[1][1] * (m[2][0]*m[3][2] - m[2][2]*m[3][0])
                      + m[1][2] * (m[2][0]*m[3][1] - m[2][1]*m[3][0]) );
    }

    return determinant;
}

function gauss_seidel(A, b, iterations) {
    const rows = A.length;
    const cols = A[0].length;

    let x;

    if (rows == 2 && cols == 2) {
        let firstApprox, secondApprox;

        x = [[0, 0]];

        for (let iter = 0; iter < iterations; iter++) {
            firstApprox = (1 / A[0][0]) * (b[0][0] - A[0][1] * x[0][1]);
            x[0][0] = firstApprox;
            secondApprox = (1 / A[1][1]) * (b[1][0] - A[1][0] * x[0][0]);
            x[0][1] = secondApprox;
        }
    }

    if (rows == 3 && cols == 3) {
        let firstApprox, secondApprox, thirdApprox;

        x = [[0, 0, 0]];

        for (let iter = 0; iter < iterations; iter++) {
            firstApprox = (1/A[0][0]) * (b[0][0] - A[0][1] * x[0][1] - A[0][2]*x[0][2]);
            x[0][0] = firstApprox;
            secondApprox = (1/A[1][1]) * (b[1][0] - A[1][0]*x[0][0] - A[1][2]*x[0][2]);
            x[0][1] = secondApprox;
            thirdApprox = (1/A[2][2]) * (b[2][0] - A[2][0]*x[0][0] - A[2][1]*x[0][1]);
        }
    }

    if (rows == 4 && cols == 4) {
        let firstApprox, secondApprox, thirdApprox, fourthApprox;

        x = [[0,0,0,0]];

        for (let iter = 0; iter < iterations; iter++) {
            firstApprox = (1/A[0][0])*(b[0][0] - A[0][1]*x[0][1] - A[0][2]*x[0][2] - A[0][3]*x[0][3]);
            x[0][0] = firstApprox;
            secondApprox = (1/A[1][1])*(b[1][0] - A[1][0]*x[0][0] - A[1][2]*x[0][2] - A[1][3]*x[0][3]);
            x[0][1] = secondApprox;
            thirdApprox = (1/A[2][2])*(b[2][0] - A[2][0]*x[0][0] - A[2][1]*x[0][1] - A[2][3]*x[0][3]);
            x[0][2] = thirdApprox;
            fourthApprox = (1/A[3][3])*(b[3][0] - A[3][0]*x[0][0] - A[3][1]*x[0][1] - A[3][2]*x[0][2]);
            x[0][3] = fourthApprox;
        }
    }

    return x;
}

function scalar_multiplication(scalar, m) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        const row = [];
        for (let j = 0; j < matrix[i].length; j++) {
            row.push(scalar * matrix[i][j]);
        }
        result.push(row);
    }
    return result;
}

function compute_inverse(m) {
    const rows = m.length;
    const cols = m[0].length;
    let result = [[]];
    let determinant;

    det = compute_determinant(m);

    if ((det != 0) ** (rows == cols)) {
        if ((rows == 2) && (cols == 2)) {
            const scalar = 1.0/(m[0][0]*m[1][1] - m[0][1]*m[1][0]);
            result = [[m[1][1], -m[0][1]], [-m[1][0], m[0][0]]];
            result = scalar_multiplication(scalar, result);
        }
    }
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

function transpose(m) {
    const rows = m.length;
    const cols = m[0].length;

    //const result = Array.from({ length: cols }, () => Array(rows).fill(0));
    if (rows == 0 || cols == 0) 
        return [];

    const result = [];
    for (let i = 0; i < cols; i++) {
        const row = [];
        for (let j = 0; j < rows; j++) {
            row.push(m[j][i]);
        }
        result.push(row);
    }

    return result;
}

const buttons = document.querySelectorAll('.matrix-actions button'); //Get all buttons and attach event listeners

//Listener for addition button
buttons[0].addEventListener('click', () => {
    const [matrixABox, matrixBBox] = document.querySelectorAll('.matrix-box');
    const A = get_matrix_values(matrixABox);
    const B = get_matrix_values(matrixBBox);

    const result = add_matrices(A, B);

    if (result.length == 0) {
        alert("Matrices must have same dimensions!");
        return;
    }

    display_operation_result(result, "A + B");
});

//Listener for subtraction button
buttons[1].addEventListener('click', () => {
    const [matrixABox, matrixBBox] = document.querySelectorAll('.matrix-box');
    const A = get_matrix_values(matrixABox);
    const B = get_matrix_values(matrixBBox);

    const result = subtract_matrices(A, B);

    if (result.length == 0) {
        alert("Matrices must have same dimensions!");
        return;
    }

    display_operation_result(result, "A - B");
});

//Listener for matrix multiplication
buttons[2].addEventListener('click', () => {
    const [matrixABox, matrixBBox] = document.querySelectorAll('.matrix-box');
    const A = get_matrix_values(matrixABox);
    const B = get_matrix_values(matrixBBox);

    const result = multiply_matrices(A, B);

    if (result.length == 0) {
        alert("size of columns of A != size of rows of B");
        return;
    }

    display_operation_result(result, "A * B");
});

buttons[3].addEventListener('click', () => {
    const [matrixABox] = document.querySelectorAll('.matrix-box');
    const A = get_matrix_values(matrixABox);

    const result = compute_determinant(A);

    if (result == null) {
        alert("Determinant can only be computed for square matrices.");
        return;
    }

    display_determinant_result(result, "det(A)");
});

buttons[4].addEventListener('click', () => {
    const [, matrixBBox] = document.querySelectorAll('.matrix-box');
    const B = get_matrix_values(matrixBBox);

    const result = compute_determinant(B);

    if (result == null) {
        alert("Determinant can only be computed for square matrices.");
        return;
    }

    display_determinant_result(result, "det(B)");
});

buttons[5].addEventListener('click', () => {
    const [matrixABox] = document.querySelectorAll('.matrix-box');
    const A = get_matrix_values(matrixABox);

    const result = transpose(A);

    display_operation_result(result, "Transpose(A)");
});

buttons[6].addEventListener('click', () => {
    const [, matrixBBox] = document.querySelectorAll('.matrix-box');
    const B = get_matrix_values(matrixBBox);

    const result = transpose(B);

    display_operation_result(result, "Transpose(B)");
});

function display_determinant_result(determinant, operationName) {
    const resultsDiv = document.querySelector('.matrix-action-results');
    resultsDiv.innerHTML = `
        <h4>${operationName} Result:</h4>
        <div class="determinant-result">
            <span class="det-value">${determinant}</span>
        </div>
    `;
}