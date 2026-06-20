# Agent Guidelines for React Pizza

## Repository Overview
**React Pizza** is a simple prototype of a pizzeria application featuring a catalog of pizzas organized by categories. The project is built with modern web technologies and emphasizes TypeScript for type safety.

### Language Composition
- **TypeScript**: 70.2% (Primary language)
- **CSS**: 25% (Styling)
- **JavaScript**: 2.6% (Legacy/build scripts)
- **HTML**: 2.2% (Markup)

## Core Principles

1. **Type Safety First**: All new code should be written in TypeScript with proper type annotations. Avoid using `any` types unless absolutely necessary.
2. **Component-Based Architecture**: Follow React best practices with functional components and hooks.
3. **Styling Standards**: Use CSS modules or CSS-in-JS solutions consistently. Maintain the existing styling approach.
4. **Code Quality**: Ensure code is readable, maintainable, and follows the existing project conventions.

## Key Areas

### Pizza Catalog
- Display pizzas with detailed information (name, description, price, image)
- Organize pizzas by categories for better UX
- Support filtering and searching functionality

### Components
- Keep components small and focused on single responsibilities
- Use TypeScript interfaces for props to maintain type safety
- Document complex component logic

### State Management
- Use React hooks (useState, useContext) for state management
- Consider existing patterns in the codebase before introducing new state management libraries

### Styling
- Match existing CSS patterns and naming conventions
- Ensure responsive design for mobile and desktop
- Maintain visual consistency across the application

## Common Tasks

### Adding New Features
1. Create TypeScript component files in the appropriate directory
2. Define interfaces for props and state
3. Write CSS/styling following existing conventions
4. Update category or pizza data as needed

### Bug Fixes
1. Identify the affected component or utility
2. Add type annotations for clarity
3. Test changes with both TypeScript compilation and runtime behavior
4. Update related tests if applicable

### Performance Optimization
1. Use React.memo for expensive components
2. Implement lazy loading for pizza images if needed
3. Optimize CSS to reduce unused styles
4. Profile with browser DevTools before making changes

## Development Workflow

1. **Feature Branch**: Create a branch for new features (e.g., `feature/add-filters`)
2. **Type Checking**: Ensure TypeScript compilation passes without errors
3. **Testing**: Test in multiple browsers if styling changes are made
4. **Code Review**: Prepare clear PR descriptions explaining changes
5. **Documentation**: Update this file if new patterns or conventions are established

## Tools & Technologies
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **CSS**: Styling (25% of codebase)
- **Build Tools**: Check `package.json` for current setup

## Best Practices

- ✅ Write TypeScript with proper types
- ✅ Keep components reusable and focused
- ✅ Maintain consistent code formatting
- ✅ Write meaningful commit messages
- ✅ Test changes before submitting PRs

- ❌ Avoid prop drilling; consider context for deeply nested props
- ❌ Don't mix styling approaches (e.g., inline styles with CSS modules)
- ❌ Avoid hardcoding data; use centralized data sources
- ❌ Don't commit console.log() statements or debug code

## Contributing

When working on this repository:
1. Maintain the current TypeScript/CSS ratio
2. Follow the existing project structure
3. Ensure all TypeScript code compiles without errors
4. Keep CSS modular and reusable
5. Write clear comments for non-obvious logic

---

*Last updated: 2026-06-20*
