# **@carnesen/run-and-catch** changelog

## Upcoming

- Fix: Returned objects showed up in the error message as "[object Object]". Now instead we explicitly call JSON.stringify on the returned/resolved object.

## v0.4.2 (2021-05-29)

- Internal: Update dev dependencies, license, fix lint errors

## 0.4.1

## Internal

- Update dev dependencies
- Use tabs instead of spaces

## 0.4.0

### Breaking

- Drop support for Node.js version 8

### Internal

- Update dev dependencies
- Use GitHub Actions for CI
- Use ESLint for linting
