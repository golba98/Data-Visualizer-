# Contributing to Two Sets, All Dates

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🚀 Quick Start

1. **Fork and clone**

   ```bash
   git clone https://github.com/yourusername/5-Date-Verification.git
   cd 5-Date-Verification
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## 📋 Development Workflow

### Before You Start

- Check existing issues to avoid duplicate work
- Create an issue to discuss major changes
- Keep pull requests focused on a single change

### Making Changes

1. **Create a branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style (enforced by ESLint/Prettier)
   - Add tests for new features
   - Update documentation as needed

3. **Test your changes**

   ```bash
   npm run lint        # Check for linting errors
   npm run format      # Format code
   npm test            # Run tests
   npm run build       # Ensure build succeeds
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   Pre-commit hooks will automatically:
   - Lint your code
   - Format your code
   - Run tests

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

**Examples:**

```
feat: add keyboard shortcuts for date navigation
fix: correct rotation logic for date 19
docs: update README with new features
test: add tests for generatePairs function
```

### Pull Request Process

1. **Push your branch**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request**
   - Provide a clear description of changes
   - Reference related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

3. **Code Review**
   - Address feedback promptly
   - Keep discussions focused and professional
   - Update your PR based on review comments

4. **Merge**
   - Maintainers will merge after approval
   - Delete your branch after merge

## 🎨 Code Style

### TypeScript

- Use TypeScript for all new code
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Add JSDoc comments for complex functions

### React

- Use functional components with hooks
- Keep components small and focused
- Use `memo()` for expensive components
- Follow the existing component structure

### CSS/Tailwind

- Use Tailwind utility classes
- Follow existing design system (theme.css)
- Use CSS custom properties for dynamic values
- Keep styles consistent with existing patterns

### File Organization

```
src/
├── components/     # React components
├── data/           # Static data and constants
├── logic/          # Core business logic
├── styles/         # Global styles and theme
└── utils/          # Utility functions
```

## 🧪 Testing

### Unit Tests

- Test all logic functions
- Use descriptive test names
- Cover edge cases
- Location: `*.test.ts` files next to source

### Running Tests

```bash
npm test              # Run all tests once
npm run test:watch    # Run tests in watch mode
```

### Writing Tests

```typescript
import { describe, it, expect } from "vitest";
import { generateMappingsForDay } from "./generatePairs";

describe("generateMappingsForDay", () => {
  it("should generate mappings for day 29", () => {
    const mappings = generateMappingsForDay(29);
    expect(mappings).toHaveLength(1);
    expect(mappings[0].pairFamily).toBe("B*×A");
  });
});
```

## 📝 Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Document complex algorithms
- Include examples in JSDoc

### README Updates

- Update README for new features
- Keep installation steps current
- Add screenshots for visual changes

### Documentation Files

- `README.md` - Project overview
- `docs/proof.md` - Mathematical proof
- `docs/practicality.md` - Physical interpretation
- `docs/design-notes.md` - Design decisions

## 🐛 Reporting Bugs

### Before Reporting

- Search existing issues
- Verify it's reproducible
- Test on latest version

### Bug Report Template

```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:

1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen.

**Screenshots**
If applicable.

**Environment**

- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Version: [e.g., 1.0.0]
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Problem**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives**
Other approaches considered?

**Additional Context**
Mockups, examples, etc.
```

## 🔒 Security

- **Do not** commit secrets or credentials
- **Do not** include personal information
- Report security issues privately to maintainers

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be acknowledged in:

- GitHub contributors page
- Release notes (for significant contributions)

## 📞 Questions?

- Open an issue with the `question` label
- Check existing issues and discussions
- Be patient and respectful

---

Thank you for contributing to Two Sets, All Dates! 🎉
