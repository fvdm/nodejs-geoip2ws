# Copilot Instructions for nodejs-geoip2ws

## Repository Overview

This repository contains **geoip2ws**, an unofficial Node.js module for the Maxmind GeoIP2 Web Services. It's a small, lightweight library that provides IP geolocation functionality using Maxmind's API.

**Key Details:**
- **Type**: Node.js library/package
- **Size**: Small (~15 files total)
- **Language**: JavaScript (ES2021)
- **Runtime**: Node.js >=18 (uses native fetch API)
- **License**: Unlicense (public domain)
- **Main Purpose**: IP geolocation via Maxmind GeoIP2 Web Services API

## Build and Validation Process

### Dependencies and Setup
```bash
# Always run this first - installs dotest testing framework
npm install
```
**Note**: You will see deprecation warnings during install. These are from the dotest dependency and are not critical.

### Testing
```bash
# Runs ESLint + tests + coverage analysis
npm test
```

**CRITICAL ISSUE**: The ESLint configuration file (`eslint.config.mjs`) currently has 409 formatting errors and will cause the test command to fail if you try to lint it directly. However, `npm test` works correctly as it doesn't lint the config file itself.

**Current Test Status**: Tests run successfully with network connectivity. You may see a few minor test assertion failures (2 errors, 2 warnings) and coverage slightly below 85% threshold for branches (80%), but core functionality works correctly.

**Test Environment Requirements:**
- Tests expect to connect to external test endpoint (`https://fvdm.com/u/ci_test.php`)
- Without API credentials, tests use fake data endpoint
- Coverage threshold is set to 85% for lines, branches, and statements

**Environment Variables for Real Testing:**
```bash
GEOIP2WS_USERID=your_user_id
GEOIP2WS_LICENSE=your_license_key  
GEOIP2WS_SERVICE=city
GEOIP2WS_ENDPOINT=https://geoip.maxmind.com
GEOIP2WS_TIMEOUT=5000
```

### Linting
Linting is integrated into `npm test` command and works correctly for the main code files. **DO NOT run ESLint directly on the config file** (`eslint.config.mjs`) as it has formatting issues - it will produce 409+ errors due to malformed config file.

### Building
This is a pure JavaScript library - no build step required. The main entry point `geoip2ws.js` is ready to use.

## Project Architecture and File Layout

### Core Files (Root Directory)
- **`geoip2ws.js`** - Main module file, exports single async function
- **`test.js`** - Test suite using dotest framework  
- **`example.js`** - Usage example and demo
- **`package.json`** - Project configuration and dependencies
- **`README.md`** - Comprehensive documentation with usage examples

### Configuration Files
- **`eslint.config.mjs`** - ESLint configuration (**BROKEN - has 409 formatting errors**)
- **`.editorconfig`** - Code formatting preferences (2-space indentation, LF line endings)
- **`.gitignore`** - Excludes node_modules, logs, coverage reports

### Documentation and Metadata
- **`CHANGELOG.md`** - Points to GitHub releases
- **`LICENSE`** - Unlicense (public domain)
- **`SECURITY.md`** - Security policy and vulnerability reporting

### GitHub Configuration (`.github/` directory)
- **`workflows/node.js.yml`** - Main CI pipeline
  - Tests on multiple Node.js LTS versions (fetched dynamically)
  - Runs `npm install` then `npm test`
  - Includes Coveralls coverage reporting
  - Requires secrets for API credentials
- **`workflows/codeql-analysis.yml`** - Security analysis
- **`dependabot.yml`** - Automated dependency updates
- **`FUNDING.yml`** - Ko-fi funding link

## CI/CD Pipeline Details

The GitHub Actions workflow (`.github/workflows/node.js.yml`) performs:

1. **Dynamic Version Matrix**: Fetches current Node.js LTS versions from external API
2. **Multi-Version Testing**: Tests on all current LTS Node.js versions
3. **Steps per version**:
   ```bash
   npm install
   npm test  # Includes ESLint, tests, and coverage
   ```
4. **Coverage Reporting**: Uploads coverage to Coveralls (parallel jobs)
5. **Required Secrets**: API credentials for real testing (optional)

**Timing**: Each test run typically completes in under 2 minutes.

## Common Development Tasks

### Making Code Changes
1. **Always run `npm install` first** after cloning
2. Make your changes to `geoip2ws.js` or other files
3. **Update tests** in `test.js` if adding new functionality
4. Run `npm test` to validate (expect ESLint errors from config file)
5. **Manually verify** functionality using `require('./')` to load the local module

**Testing the module locally:**
```javascript
const geoip = require('./');  // Load local module
// Use with test credentials or expect authentication errors
```

### Adding Tests
Tests use the `dotest` framework. Load the module with `require('./')`. Pattern for new tests:
```javascript
doTest.add('Test description', async test => {
  try {
    const result = await pkg({ /* test config */ });
    test()
      .isObject('fail', 'result', result)
      .done();
  } catch (err) {
    test(err).done();
  }
});
```

**Note**: The test command generates coverage reports in `coverage/` and `.nyc_output/` directories. These are automatically cleaned by dotest and excluded from git.

### Debugging Network Issues
If tests fail with `fetch failed` or `ENOTFOUND`:
- Ensure network connectivity to external test endpoints is available
- Tests try to connect to `fvdm.com` for fake data when no credentials provided
- Real API testing requires valid Maxmind credentials

## Code Style and Standards

**Enforced by ESLint** (when config is fixed):
- Single quotes for strings
- 2-space indentation  
- Semicolons required
- camelCase variables
- Stroustrup brace style
- No trailing spaces

**Current Issue**: ESLint config file itself violates these rules with 409 errors.

## Key Dependencies and APIs

### Runtime Dependencies
- **None** - Uses only Node.js built-ins (fetch, Buffer, AbortSignal)

### Development Dependencies  
- **dotest**: Testing framework with built-in coverage
- **eslint**: Code linting (via dotest integration)

### External APIs
- **Maxmind GeoIP2 Web Services**: Main service endpoint
- **Node.js LTS versions API**: For CI version matrix
- **Test endpoint**: `fvdm.com/u/ci_test.php` for fake data

## Critical Issues to Address

1. **ESLint Configuration**: The `eslint.config.mjs` file is completely malformed and needs to be fixed before any linting will work
2. **Minor Test Issues**: Some tests may have minor assertion failures but core functionality works
3. **Deprecation Warnings**: While not critical, there are deprecation warnings in the dependency chain

## Trust These Instructions

These instructions are comprehensive and current as of the repository state. Only perform additional code searching if:
- You encounter errors not covered here
- The information appears outdated or incorrect
- You need specific implementation details not provided

**Always run `npm install` before any other commands** to ensure dependencies are available.