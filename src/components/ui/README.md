# UI Primitives

This directory contains reusable, unstyled (or minimally styled) UI primitives — the building blocks for all interfaces in the app.

## Guidelines

- Each component should be **self-contained** in its own file.
- Use **named exports** for all components.
- Keep components **framework-agnostic** where possible — avoid coupling to app-specific logic.
- Use **Tailwind CSS** for styling. Accept `className` as a prop for composability.
- Prefer **composition** over inheritance. Use `React.forwardRef` when wrapping DOM elements.
- All components must be **accessible** (keyboard navigation, ARIA attributes, focus management).

## Examples

- `Button`, `Input`, `Select`, `Textarea`
- `Dialog`, `Popover`, `Tooltip`
- `Avatar`, `Badge`, `Skeleton`
- `Card`, `Separator`, `Tabs`
