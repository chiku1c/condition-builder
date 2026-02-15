# Condition Builder

A React app for building nested condition trees with AND/OR groups and rules (field, operator, value). The current tree is shown as JSON at the bottom.

## Setup instructions

1. **Prerequisites**
   - [Node.js](https://nodejs.org/) (v18 or newer recommended)
   - npm (comes with Node.js) or yarn

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the app**
   ```bash
   npm start
   ```
   The app opens at [http://localhost:3000](http://localhost:3000).

4. **Other commands**
   - `npm run build` — production build in the `build` folder
   - `npm test` — run tests

## Assumptions

- **Environment:** Node.js and npm (or yarn) are available; the app runs in a modern browser.
- **Data:** The condition tree lives only in React state; there is no backend or persistence.
- **Fields and operators:** Field options (Price, Category, Rating) and operators (>, <, =, !=, >=, <=, contains) are fixed and defined in `src/constants.js`.
- **Structure:** The root is always a single group; it cannot be deleted. All rules must have a non-empty value for the UI to consider them valid (validation message only; no submit/blocking).
- **Tree model:** Updates are immutable; the tree is a plain JS object (groups with `type`, `operator`, `children`; rules with `type`, `field`, `operator`, `value`).

## Known limitations

- **No persistence:** Refreshing the page or closing the tab loses the entire tree.
- **No save/load:** There is no export, import, or save/load of condition trees.
- **Fixed schema:** Fields and operators are hardcoded; adding new ones requires code changes in `src/constants.js`.
- **Value type:** Rule values are strings only; there is no type-specific validation or formatting (e.g. numbers, dates).
- **No execution:** The tree is for building structure only; there is no engine that runs or evaluates conditions against data.
- **Root group:** The root group cannot be removed; only nested groups and rules can be deleted.

