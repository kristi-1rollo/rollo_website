# Aamir Layer Preview Mode

This branch includes a staging-only preview of the new storytelling architecture.

## Enable preview mode

Use one of these options:

1. URL switch (quickest):
   - Open `http://localhost:5173/?preview=aamir`
2. Environment switch:
   - Add `VITE_ENABLE_AAMIR_PREVIEW=true` to `.env`
   - Start dev server and open `http://localhost:5173`

## Disable preview mode

- Remove `?preview=aamir` from URL and/or
- Set `VITE_ENABLE_AAMIR_PREVIEW=false` (or remove the variable)

When preview mode is disabled, the existing production homepage renders as before.
