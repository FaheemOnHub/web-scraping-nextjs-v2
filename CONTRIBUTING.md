# Contributing to Price-Analyzer

Thank you for your interest in contributing to **Price-Analyzer**! Whether you’re fixing bugs, adding new features, improving documentation, or enhancing the user interface, your contributions are highly valued.

## Getting Started

### 1. Fork the Repository

Start by forking the repository to your GitHub account. This will create a copy of the repo where you can make changes.

### 2. Clone Your Fork

Clone your forked repository to your local machine:

```bash
git clone https://github.com/your-username/price-analyzer.git
cd price-analyzer
```

### 3. Set Up the Development Environment

Install the necessary dependencies:

```bash
npm install
```

Create a `.env` file and configure the required environment variables:

```env
username=your-brightdata-username
password=your-brightdata-password
host=your-brightdata-host
```

Start the development server:

```bash
npm run dev
```

### 4. Create a New Branch

Create a new branch for your changes. Use a descriptive name that reflects the work you’re doing:

```bash
git checkout -b feature/your-feature-name
```

## Making Changes

### 1. Write Clean, Modular Code

- Follow the existing coding style.
- Write clear and concise commit messages.
- Break down large changes into smaller, more manageable commits.

### 2. Add or Update Tests

If your changes affect the logic of the application, make sure to add or update the corresponding tests. This helps ensure that the codebase remains stable.

### 3. Run Tests

Before submitting your changes, make sure that all tests pass:

```bash
npm run test
```

## Submitting Changes

### 1. Push Your Changes

Once you’ve committed your changes, push your branch to your forked repository:

```bash
git push origin feature/your-feature-name
```

### 2. Open a Pull Request

Go to the original repository on GitHub and open a Pull Request (PR) from your forked repository. Ensure that you provide a clear description of what you’ve done and why.

### 3. Address Feedback

Your PR will be reviewed by a maintainer. Be ready to address any feedback or questions that come up during the review process.

## Reporting Issues

If you find a bug or have a suggestion for improvement, please open an issue in the repository. When reporting a bug, include as much detail as possible:

- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots or error logs (if applicable)

## Code of Conduct

Please adhere to the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) in all your interactions within the project.

---

Thank you for contributing! Your efforts help make **Price-Analyzer** better for everyone.
