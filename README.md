# Matrix Calculator

A comprehensive web-based matrix calculator that performs basic matrix operations and advanced numerical methods for solving linear systems and finding eigenvalues.

## Features

### Basic Matrix Operations
- **Matrix Addition** (A + B)
- **Matrix Subtraction** (A - B)
- **Matrix Multiplication** (A × B and B × A)
- **Matrix Transpose** 
- **Determinant Calculation** (2×2, 3×3, and 4×4 matrices)
- **Matrix Inverse** (using Gauss-Seidel method for larger matrices)
- **Scalar Multiplication** (supports decimal scalars)

### Numerical Methods
- **Jacobi Method** - Iterative solver for linear systems
- **Gauss-Seidel Method** - Enhanced iterative solver with faster convergence
- **Power Method** - Finds dominant eigenvalue and eigenvector
- **Inverse Power Method** - Theoretical implementation for smallest eigenvalue

## Project Structure

```
matrix-calculator/
├── index.html              # Main matrix calculator interface
├── script.js              # Core matrix operations and UI logic
├── styles.css             # Styling for main calculator
└── numerical-methods-calculator/
    ├── index.html          # Numerical methods interface
    ├── script.js           # Iterative methods implementation
    └── styles.css          # Styling for numerical methods
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required

### Running the Application

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser to access the main matrix calculator
3. **Navigate to numerical methods** by clicking the "Iterative Methods Calculator" link

## Usage Guide

### Basic Matrix Calculator

#### Setting Up Matrices
1. **Matrix Dimensions**: Use the row/column inputs to set matrix size (1×1 to 4×4)
2. **Scalar Values**: Adjust scalar multipliers for each matrix (supports decimals)
3. **Matrix Elements**: Enter values in the generated grid (supports decimals and negatives)

#### Performing Operations
- Click any operation button (A + B, A - B, etc.)
- Results display in a formatted table below the buttons
- Error messages appear for invalid operations (dimension mismatches, singular matrices)

#### Supported Matrix Sizes
- **Addition/Subtraction**: Up to 4×4 matrices
- **Multiplication**: Any compatible dimensions up to 4×4
- **Determinant**: 2×2, 3×3, and 4×4 square matrices only
- **Inverse**: 2×2, 3×3, 4×4, and 5×5 matrices

### Numerical Methods Calculator

#### Matrix Setup
1. **Size Selection**: Choose matrix size (2×2 to 5×5)
2. **Matrix A**: Enter coefficient matrix values
3. **Vector b**: Enter the right-hand side vector (comma-separated)
4. **Initial Vector**: Set starting guess for iterative methods

#### Method Parameters
- **Max Iterations**: Control iteration limit (1-50)
- **Tolerance**: Set convergence criteria (default provided)

#### Available Methods

**Jacobi Method**
- Simultaneous update iterative solver
- Checks for diagonal dominance
- Shows convergence analysis

**Gauss-Seidel Method**
- Sequential update iterative solver
- Generally faster convergence than Jacobi
- Updates variables immediately

**Power Method**
- Finds dominant eigenvalue and eigenvector
- Uses Rayleigh quotient for eigenvalue estimation
- Iteratively converges to largest eigenvalue

## Technical Implementation

### Matrix Operations
- **Addition/Subtraction**: Element-wise operations with dimension checking
- **Multiplication**: Standard matrix multiplication with compatibility validation
- **Determinant**: Explicit formulas for 2×2, 3×3, 4×4 matrices
- **Inverse**: 2×2 uses analytical formula; larger matrices use Gauss-Seidel

### Numerical Methods
- **Iterative Solvers**: Implement standard algorithms with error tracking
- **Convergence Criteria**: Maximum absolute difference between iterations
- **Error Handling**: Validates input dimensions and detects convergence issues

### Input Validation
- **Number Format**: Supports integers, decimals, and negative numbers
- **Matrix Dimensions**: Enforces size limits and compatibility
- **Error Prevention**: Regex-based input filtering prevents invalid characters

## Features and Limitations

### Current Limitations
- **Matrix Size**: Maximum 4×4 for basic operations, 5×5 for numerical methods
- **Precision**: Standard JavaScript floating-point precision
- **Inverse Power Method**: Theoretical implementation only
- **Memory**: All operations performed in browser memory

## Educational Use

This calculator was specifically created to aid in problem-solving for various mathematics modules, including:
- **APM1513** (Applied Mathematics)
- **APM2613** (Numerical Methods)
- **APM3706** (Advanced Numerical Methods)
- **MAT1503** (Linear Algebra)
- **MAT2611** (Advanced Linear Algebra)
- **MAT3701** (Abstract Algebra)
- **And other related mathematics modules**

This calculator is ideal for:
- **Linear Algebra Courses**: Verifying hand calculations and matrix operations
- **Numerical Analysis**: Understanding iterative methods and convergence
- **Applied Mathematics**: Solving real-world problems involving linear systems
- **Engineering Applications**: Quick matrix computations for technical problems
- **Academic Research**: Prototyping small-scale mathematical problems
- **Assignment Verification**: Checking solutions for coursework and exercises

## Future Enhancements

Potential improvements could include:
- Larger matrix support (beyond 5×5)
- LU decomposition methods
- QR decomposition for eigenvalue problems
- Export/import functionality for matrices
- Step-by-step solution display
- Complex number support

## License

This project is open source and available under standard web development practices.

---

**Note**: This calculator is designed for educational and small-scale computational purposes. For large matrices or production applications, consider using specialized mathematical libraries.
