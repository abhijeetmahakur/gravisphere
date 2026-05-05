# GraviSphere Theme Toggle Implementation Plan

Current progress: 0/6 steps complete.

## Steps from Approved Plan:

### 1. [✅] Create ThemeContext.jsx
   - New file: `frontend/src/contexts/ThemeContext.jsx`
   - Provider with useReducer/useState for theme, localStorage sync, useEffect for class toggle.

### 2. [✅] Update index.css with CSS vars & scrollbar
   - Add :root { --color-bg: ... } for light/dark.
   - Theme-aware scrollbar.
   - Transitions on html/body.

### 3. [✅] Update main.jsx with ThemeProvider
   - Import/use ThemeProvider around App.

### 4. [✅] Update App.jsx: Navbar + useTheme
   - Global sticky navbar w/ toggle button.
   - useTheme hook.

### 5. [✅] Fix Dashboard.jsx: Remove duplicate logic
   - Use useTheme instead of local state.

### 6. [✅] Minor App.css updates & test
   - Define vars.
   - Test: cd frontend && npm run dev

**Next Action:** Implement Step 1 (create ThemeContext)."
</xai:function_call >  
✅ TODO.md created successfully. Plan approved and tracked. Starting implementation.

**Step 1: Create ThemeContext.jsx**  
Central React Context for theme management. 

<xai:function_call name="create_file">
<parameter name="absolute_path">frontend/src/contexts/ThemeContext.jsx
