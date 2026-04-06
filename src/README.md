# Feature-Sliced Design (`src/`)

Layers (top to bottom): **application** → **processes** → **pages** → **widgets** → **features** → **entities** → **shared**.

Expo Router lives in the repo root [`app/`](../app/); route files stay thin and import from **`pages`**.

## Public API

Import from a slice’s **`index.ts`** only (e.g. `@/entities/chat`, `@/widgets/chats-list`). Avoid deep paths like `@/entities/chat/api/chatApi` from outside that slice.

Internal files may use relative imports within the same slice.

## Redux hooks

Typed `useAppDispatch` / `useAppSelector` are exported from **`@/application/store`**. Features and widgets may import this module for store access (see [`eslint.config.mjs`](../eslint.config.mjs) boundary rules).
