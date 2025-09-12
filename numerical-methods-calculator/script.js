function adjustMatrixDimensions(size) {
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
        input.value = (row == col) ? '2' : (Math.abs(row - col) == 1 ? '1' : '0');

        grid.appendChild(input);
    }

    const bVector = document.getElementById('b-vector');
    const initialVector = document.getElementById('initial-vector');
    const defaultVector = Array(size).fill('1').join(', ');
    bVector.placeholder = defaultVector;
    initialVector.placeholder = defaultVector;
    initialVector.value = defaultVector;
}

function getMatrixFromInputs() {
    const size = parseInt(document.getElementById('matrix-size').value);
    const inputs = document.querySelectorAll('.matrix-cell');
    const matrix = [];

    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            const value = parseFloat(inputs[i * size + j].value) || 0;
            matrix[i][j] = value;
        }
    }

    return matrix;
}

function getVectorFromInput(inputId) {
    const input = document.getElementById(inputId);
    return input.value.split(',').map(x => parseFloat(x.trim()) || 0);
}

function showResults(content) {
    const resultsDiv = document.getElementById('results');
    const contentDiv = document.getElementById('results-content');
    contentDiv.innerHTML = content;
    resultsDiv.classList.add('show');
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

function formatVector(vector, precision = 6) {
    return vector.map(x => x.toFixed(precision)).join(', ');
}

function jacobiMethod() {
    const A = getMatrixFromInputs();
    const b = getVectorFromInput('b-vector');
    const x0 = getVectorFromInput('initial-vector');
    const tolerance = parseFloat(document.getElementById('tolerance').value);
    const maxIterations = parseInt(document.getElementById('max-iterations').value);

    const n = A.length;
    let x = [...x0];
    let xNew = new Array(n).fill(0);
    let iterations = [];

    // Check for diagonal dominance
    let isDiagonallyDominant = true;
        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < n; j++) {
                if (i !== j) sum += Math.abs(A[i][j]);
            }
            if (Math.abs(A[i][i]) < sum) {
                isDiagonallyDominant = false;
                break;
            }
        }

        iterations.push({
            iteration: 0,
            x: [...x],
            error: 'N/A'
        });

        for (let iter = 1; iter <= maxIterations; iter++) {
            for (let i = 0; i < n; i++) {
                let sum = b[i];
                for (let j = 0; j < n; j++) {
                    if (i !== j) {
                        sum -= A[i][j] * x[j];
                    }
                }
                xNew[i] = sum / A[i][i];
            }

            let error = Math.max(...xNew.map((val, idx) => Math.abs(val - x[idx])));
                    
            iterations.push({
                iteration: iter,
                x: [...xNew],
                error: error.toFixed(8)
            });

            if (error < tolerance) {
                break;
            }

                x = [...xNew];
        }

        let resultsHtml = `
            <h4>Jacobi Method Results</h4>
            <p><strong>Diagonal Dominance:</strong> ${isDiagonallyDominant ? 'Yes (convergence likely)' : 'No (convergence not guaranteed)'}</p>
            <p><strong>Final Solution:</strong> [${formatVector(x)}]</p>
            <p><strong>Iterations:</strong> ${iterations.length - 1}</p>
            <p><strong>Final Error:</strong> ${iterations[iterations.length - 1].error}</p>
                    
            <table class="iteration-table">
                <thead>
                    <tr>
                    <th>Iteration</th>
                    <th>Solution Vector</th>
                    <th>Max Error</th>
                    </tr>
                </thead>
            <tbody>
                `;

    iterations.forEach(iter => {
        resultsHtml += `
            <tr>
                <td>${iter.iteration}</td>
                <td>[${formatVector(iter.x, 4)}]</td>
                <td>${iter.error}</td>
            </tr>
            `;
    });

    resultsHtml += `</tbody>
                    </table>`;

    showResults(resultsHtml);
}

function gaussSeidelMethod() {
    const A = getMatrixFromInputs();
    const b = getVectorFromInput('b-vector');
    const x0 = getVectorFromInput('initial-vector');
    const tolerance = parseFloat(document.getElementById('tolerance').value);
    const maxIterations = parseInt(document.getElementById('max-iterations').value);

    const n = A.length;
    let x = [...x0];
    let iterations = [];

    iterations.push({
        iteration: 0,
        x: [...x],
        error: 'N/A'
    });

    for (let iter = 1; iter <= maxIterations; iter++) {
        let xOld = [...x];
                    
        for (let i = 0; i < n; i++) {
            let sum = b[i];
            for (let j = 0; j < n; j++) {
                    if (i !== j) {
                        sum -= A[i][j] * x[j];
                    }
            }
            x[i] = sum / A[i][i];
        }

        let error = Math.max(...x.map((val, idx) => Math.abs(val - xOld[idx])));
                    
        iterations.push({
            iteration: iter,
            x: [...x],
            error: error.toFixed(8)
        });

        if (error < tolerance) {
            break;
        }
    }

    let resultsHtml = `
        <h4>Gauss-Seidel Method Results</h4>
            <p><strong>Final Solution:</strong> [${formatVector(x)}]</p>
            <p><strong>Iterations:</strong> ${iterations.length - 1}</p>
            <p><strong>Final Error:</strong> ${iterations[iterations.length - 1].error}</p>
                    
            <table class="iteration-table">
                <thead>
                    <tr>
                    <th>Iteration</th>
                    <th>Solution Vector</th>
                    <th>Max Error</th>
                    </tr>
                </thead>
            <tbody>`;

        iterations.forEach(iter => {
            resultsHtml += `
                <tr>
                    <td>${iter.iteration}</td>
                    <td>[${formatVector(iter.x, 4)}]</td>
                    <td>${iter.error}</td>
                </tr>`;
        });

        resultsHtml += `
            </tbody>
            </table>`;

    showResults(resultsHtml);
}

function powerMethod() {
    const A = getMatrixFromInputs();
    const x0 = getVectorFromInput('initial-vector');
    const tolerance = parseFloat(document.getElementById('tolerance').value);
    const maxIterations = parseInt(document.getElementById('max-iterations').value);

    const n = A.length;
    let x = [...x0];
    let eigenvalue = 0;
    let iterations = [];

    // Normalize initial vector
    let norm = Math.sqrt(x.reduce((sum, val) => sum + val * val, 0));
    x = x.map(val => val / norm);

    for (let iter = 0; iter < maxIterations; iter++) {
        let y = new Array(n).fill(0);
                    
        // Matrix-vector multiplication: y = Ax
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                y[i] += A[i][j] * x[j];
            }
        }

        // Find dominant eigenvalue (Rayleigh quotient)
        let newEigenvalue = 0;
        for (let i = 0; i < n; i++) {
            newEigenvalue += x[i] * y[i];
        }

        // Normalize y
        norm = Math.sqrt(y.reduce((sum, val) => sum + val * val, 0));
        y = y.map(val => val / norm);

        let error = Math.abs(newEigenvalue - eigenvalue);
                    
        iterations.push({
            iteration: iter,
            eigenvalue: newEigenvalue.toFixed(6),
            eigenvector: [...y],
            error: error.toFixed(8)
        });

        if (error < tolerance && iter > 0) {
            break;
        }

        eigenvalue = newEigenvalue;
        x = [...y];
    }

    let resultsHtml = `
        <h4>Power Method Results</h4>
        <p><strong>Dominant Eigenvalue:</strong> ${eigenvalue.toFixed(6)}</p>
        <p><strong>Corresponding Eigenvector:</strong> [${formatVector(x)}]</p>
        <p><strong>Iterations:</strong> ${iterations.length}</p>
                    
            <table class="iteration-table">
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>Eigenvalue</th>
                        <th>Eigenvector</th>
                        <th>Error</th>
                    </tr>
                </thead>
            <tbody>`;

    iterations.forEach(iter => {
        resultsHtml += `
            <tr>
                <td>${iter.iteration}</td>
                <td>${iter.eigenvalue}</td>
                <td>[${formatVector(iter.eigenvector, 4)}]</td>
                <td>${iter.error}</td>
            </tr>`;
    });

    resultsHtml += `
        </tbody>
        </table>`;

    showResults(resultsHtml);
}

function inversePowerMethod() {
                showResults(`
                    <h4>Inverse Power Method</h4>
                    <p>This method requires matrix inversion which is more complex to implement. 
                    The inverse power method finds the smallest eigenvalue by applying the power method to A⁻¹.</p>
                    <p><strong>Algorithm:</strong></p>
                    <pre>1. Choose initial vector x₀
2. For k = 0, 1, 2, ...
   - Solve Ay_{k+1} = x_k for y_{k+1}
   - x_{k+1} = y_{k+1} / ||y_{k+1}||
   - λ_{k+1} = x_{k+1}ᵀ A x_{k+1}</pre>
                `);
 }

// Event listeners
document.getElementById('matrix-size').addEventListener('input', (e) => {
    adjustMatrixDimensions(parseInt(e.target.value));
});

document.getElementById('jacobi-btn').addEventListener('click', jacobiMethod);
document.getElementById('gauss-seidel-btn').addEventListener('click', gaussSeidelMethod);
document.getElementById('power-method-btn').addEventListener('click', powerMethod);
document.getElementById('inverse-power-btn').addEventListener('click', inversePowerMethod);

// Initialize
adjustMatrixDimensions(3);
