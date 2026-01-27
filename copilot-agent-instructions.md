# GitHub Copilot Agent Instructions

This document provides detailed instructions for developers on how to efficiently use the GitHub Copilot agent within the `nodejs-geoip2ws` repository. These guidelines ensure adherence to the project's philosophy of secure, lightweight, human-readable, and dependency-free coding practices.

## Table of Contents

- [Overview](#overview)
- [Core Development Principles](#core-development-principles)
- [Code Style and Standards](#code-style-and-standards)
- [Security Best Practices](#security-best-practices)
- [Development Workflow](#development-workflow)
- [Testing Guidelines](#testing-guidelines)
- [CodeQL Integration](#codeql-integration)
- [Common Tasks and Patterns](#common-tasks-and-patterns)

## Overview

The `nodejs-geoip2ws` module is an unofficial Node.js client for MaxMind's GeoIP2 Web Services. It emphasizes:

- **Zero dependencies** (production) - Only native Node.js APIs
- **Modern JavaScript** - ES2021+ features with async/await
- **Lightweight codebase** - Single file implementation (~80 lines)
- **Security-first approach** - Regular CodeQL analysis and secure coding practices
- **Human-readable code** - Clear, maintainable, and well-documented

## Core Development Principles

When working with GitHub Copilot on this repository, always follow these principles:

### 1. Dependency-Free Approach

**DO:**
- Use native Node.js APIs (`fetch`, `Buffer`, `AbortSignal`, etc.)
- Leverage built-in JavaScript features
- Implement functionality directly when simple and clear

**DON'T:**
- Add new production dependencies without exceptional justification
- Use third-party libraries for simple operations
- Over-engineer solutions that can be solved with native APIs

**Example:**
```javascript
// ✅ GOOD: Using native Buffer for Base64 encoding
const auth = Buffer.from(`${userId}:${licenseKey}`).toString('base64');

// ❌ BAD: Adding a dependency for Base64 encoding
const auth = someLibrary.base64Encode(`${userId}:${licenseKey}`);
```

### 2. Modern and Lightweight Coding

**DO:**
- Use async/await for asynchronous operations
- Leverage destructuring and modern ES6+ syntax
- Keep functions focused and concise
- Use meaningful variable names

**DON'T:**
- Use callbacks or Promises chains when async/await is clearer
- Create unnecessary abstractions
- Write verbose code when concise is equally clear

**Example:**
```javascript
// ✅ GOOD: Modern, clean async/await
async function geoip2ws({ userId, licenseKey, ip = 'me' }) {
  const res = await fetch(endpoint, options);
  const data = await res.json();
  return data;
}

// ❌ BAD: Old-style Promise chains
function geoip2ws(config) {
  return fetch(endpoint, options)
    .then(res => res.json())
    .then(data => {
      return data;
    });
}
```

### 3. Security-First Development

**DO:**
- Validate and sanitize all external inputs
- Use secure authentication methods (Basic Auth with HTTPS)
- Implement proper timeout handling
- Follow OWASP security guidelines
- Handle errors gracefully without exposing sensitive information

**DON'T:**
- Log or expose credentials in error messages
- Trust user input without validation
- Skip timeout configurations
- Ignore security warnings from CodeQL

## Code Style and Standards

This project uses ESLint with a strict configuration. Copilot should generate code that adheres to:

### Formatting Rules
- **Indentation:** 2 spaces
- **Quotes:** Single quotes (`'`)
- **Semicolons:** Required
- **Brace style:** Stroustrup (else on new line)
- **Line breaks:** Unix (LF)
- **Trailing commas:** Always in multi-line structures

### Naming Conventions
- **Variables/Functions:** camelCase
- **Constants:** camelCase (not SCREAMING_CASE)
- **No underscores:** Avoid leading/trailing underscores

### Function Style
- **Spacing:** Space before function parentheses: `function name ()`
- **Parens:** Space inside parentheses: `if ( condition )`
- **Return:** Always explicit return statements
- **Declarations:** Use `const` by default, `let` when needed, never `var`

### Comment Standards
- **JSDoc:** Required for all exported functions
- **Block comments:** Surrounding empty lines
- **Line comments:** Empty line before
- **No inline comments:** Avoid comments on the same line as code

**Example:**
```javascript
/**
 * GeoIP lookup
 *
 * @param   {object}  o
 * @param   {string}  [o.userId]      Account user ID
 * @param   {string}  [o.licenseKey]  Account license key
 * @param   {string}  [o.ip='me']     IP-address or hostname
 *
 * @return  {Promise<object>}
 */

module.exports = async function geoip2ws ( {
  userId = null,
  licenseKey = null,
  ip = 'me',
} ) {

  // Function implementation
  const options = {
    signal: AbortSignal.timeout( timeout ),
  };

  return data;

};
```

## Security Best Practices

### Input Validation

Always validate and sanitize inputs:

```javascript
// ✅ GOOD: Validate service parameter
const validServices = ['insights', 'country', 'city'];
if (!validServices.includes(service)) {
  throw new Error('Invalid service parameter');
}

// ✅ GOOD: Sanitize endpoint URL
endpoint = endpoint.replace(/\/$/, '');
```

### Credential Handling

```javascript
// ✅ GOOD: Proper Basic Auth encoding
if (userId && licenseKey) {
  options.headers.Authorization = 
    'Basic ' + Buffer.from(`${userId}:${licenseKey}`).toString('base64');
}

// ❌ BAD: Logging credentials
console.log(`Using credentials: ${userId}:${licenseKey}`);
```

### Error Handling

```javascript
// ✅ GOOD: Safe error messages
if (data.error) {
  const error = new Error(`API: ${data.error}`);
  error.reason = data.code;
  throw error;
}

// ❌ BAD: Exposing internal details
throw new Error(`API error with credentials ${userId}: ${data.error}`);
```

### Timeout Protection

```javascript
// ✅ GOOD: Always set timeouts
const options = {
  signal: AbortSignal.timeout(timeout),
};

// ❌ BAD: No timeout protection
const res = await fetch(endpoint);
```

## Development Workflow

### Setting Up the Environment

```bash
# Install dev dependencies only
npm install

# Run tests
npm test

# Lint code (ESLint)
npx eslint .
```

### Making Changes

1. **Understand the existing code** - Read the main module file first
2. **Check tests** - Review test.js for expected behavior
3. **Follow style guide** - Use the ESLint configuration
4. **Keep it minimal** - Single file, minimal changes
5. **Test thoroughly** - Run tests before committing
6. **Security scan** - CodeQL runs automatically on push

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "Brief description of changes"

# Push and create PR
git push origin feature/your-feature
```

## Testing Guidelines

### Test Framework

This project uses `dotest` for testing. Tests are minimal but comprehensive:

```javascript
// Example test structure
doTest.add('Test name', test => {
  test()
    .isFunction('fail', 'exports', pkg)
    .isString('fail', 'result.country.name', result.country.name)
    .done();
});
```

### Test Configuration

Tests can use environment variables:
- `GEOIP2WS_USERID` - MaxMind user ID
- `GEOIP2WS_LICENSE` - MaxMind license key
- `GEOIP2WS_SERVICE` - Service type (city, country, insights)
- `GEOIP2WS_ENDPOINT` - API endpoint URL
- `GEOIP2WS_TIMEOUT` - Request timeout in milliseconds

### Running Tests

```bash
# Run all tests
npm test

# With coverage (if configured)
npm run coverage
```

### Writing New Tests

When adding features, ensure tests:
- Cover happy path scenarios
- Test error conditions
- Validate input/output types
- Are minimal and focused
- Don't require actual API credentials (use test endpoint)

## CodeQL Integration

CodeQL is a critical security tool integrated into this repository's CI/CD pipeline.

### What is CodeQL?

CodeQL is GitHub's semantic code analysis engine that:
- Identifies security vulnerabilities
- Detects code quality issues
- Runs automatically on push and pull requests
- Provides actionable security insights

### CodeQL Workflow

The repository includes `.github/workflows/codeql-analysis.yml`:

```yaml
name: "CodeQL"

on:
  push:
    branches: [ develop, master ]
  pull_request:
    branches: [ develop ]
  schedule:
    - cron: '34 18 * * 6'  # Weekly scan
```

### Key Security Checks

CodeQL automatically scans for:
- **Injection vulnerabilities** - SQL, command, XSS
- **Insecure authentication** - Weak crypto, credentials exposure
- **Denial of Service** - Resource exhaustion, unbounded operations
- **Information disclosure** - Sensitive data in logs/errors
- **Insecure data handling** - Improper validation, deserialization issues

### Responding to CodeQL Alerts

When CodeQL flags an issue:

1. **Review the alert** - Understand the security concern
2. **Assess severity** - Determine if it's a true positive
3. **Fix the issue** - Implement secure alternatives
4. **Verify the fix** - Ensure CodeQL no longer flags it
5. **Document if needed** - Add comments explaining security choices

**Example Fix:**
```javascript
// CodeQL Alert: Uncontrolled data used in network request

// ❌ BEFORE: User input directly in URL
const url = `${endpoint}/${ip}`;

// ✅ AFTER: Validate and sanitize
const validIp = /^[\w\.:]+$/.test(ip) ? ip : 'me';
const url = `${endpoint}/${validIp}`;
```

### Best Practices for CodeQL

- **Don't disable alerts** without understanding them
- **Use secure APIs** - Prefer built-in secure methods
- **Validate inputs** - Always validate before use
- **Limit complexity** - Keep functions simple (complexity < 8)
- **Review weekly** - Check scheduled CodeQL scans

## Common Tasks and Patterns

### Adding a New Parameter

```javascript
// 1. Add to function signature with default
module.exports = async function geoip2ws ( {
  userId = null,
  licenseKey = null,
  newParam = 'default',  // Add here
  // ...
} ) {

// 2. Update JSDoc
/**
 * @param   {string}  [o.newParam='default']  Description
 */

// 3. Implement logic
if (newParam) {
  // Use parameter
}

// 4. Add tests
doTest.add('New parameter test', test => {
  // Test implementation
});
```

### Handling API Errors

```javascript
// Follow existing pattern
const res = await fetch(endpoint, options);
const data = await res.json();

if (data.error) {
  const error = new Error(`API: ${data.error}`);
  error.reason = data.code;
  throw error;
}
```

### Adding Response Processing

```javascript
// Normalize API responses
data.field = data.field || defaultValue;

if (!Array.isArray(data.items)) {
  data.items = [];
}

return data;
```

### Using fetch API

```javascript
// Always use with timeout and proper headers
const options = {
  signal: AbortSignal.timeout(timeout),
  headers: {
    'Accept': 'application/json',
    'Accept-Charset': 'UTF-8',
    'User-Agent': 'fvdm/nodejs-geoip2ws',
  },
};

const res = await fetch(endpoint, options);
```

## GitHub Copilot Chat Commands

Use these prompts when working with Copilot:

### Code Generation
- "Generate a function following the project's ESLint rules"
- "Add JSDoc comments for this function"
- "Refactor this to use async/await"
- "Make this code dependency-free using native Node.js APIs"

### Security
- "Review this code for security vulnerabilities"
- "Add input validation following OWASP guidelines"
- "Check if this code handles timeouts properly"
- "Ensure credentials are not logged or exposed"

### Testing
- "Generate a dotest test for this function"
- "Add error case tests for this code"
- "Create tests that don't require API credentials"

### Code Review
- "Does this follow the project's style guide?"
- "Is this implementation dependency-free?"
- "Check for potential CodeQL security issues"
- "Suggest improvements for code clarity"

## Quick Reference

### Allowed Dependencies
- **Production:** NONE (zero dependencies)
- **Development:** dotest, eslint, globals

### Node.js Version
- **Minimum:** Node.js 18+
- **Target:** Modern LTS versions

### Key Files
- `geoip2ws.js` - Main module (single file)
- `test.js` - Test suite
- `eslint.config.mjs` - Linting rules
- `example.js` - Usage examples

### CI/CD Workflows
- `node.js.yml` - Test automation
- `codeql-analysis.yml` - Security scanning

### Commands
```bash
npm test              # Run tests
npx eslint .         # Lint code
node example.js      # Run example
```

## Additional Resources

- [MaxMind GeoIP2 API Documentation](https://dev.maxmind.com/geoip/docs/web-services)
- [Node.js Fetch API](https://nodejs.org/docs/latest/api/globals.html#fetch)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)

---

**Remember:** When using GitHub Copilot, always prioritize security, simplicity, and maintainability. The goal is to keep this module lightweight, dependency-free, and easy to understand while maintaining the highest security standards.
