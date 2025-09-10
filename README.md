# Test Yourself - Redux Toolkit Integration

This app uses Redux Toolkit, react-redux, i18next, and styled-components.

## How to add a new feature
1. Create folder: `src/features/<entity>/`.
2. Add `src/features/<entity>/<entity>Slice.ts` with `createSlice` and optional thunks via `createAsyncThunk`.
3. Export `<entity>Reducer` and selectors.
4. Register reducer in `src/store/index.ts` under the `reducer` object.

## How to add mock data
- Add JSON under `src/mocks/` (e.g., `users.json`).
- Make sure the shape matches types in `src/types/index.ts`.

## How to add slice to the store
- Import the reducer in `src/store/index.ts` and add to `configureStore({ reducer: { ... } })`.
- Export `RootState` and `AppDispatch` from `src/store/index.ts` for typed hooks.

## Swap mock service with real API
- Update functions in `src/services/api.ts` to call your backend (fetch/axios).
- Keep function names and return types consistent to avoid changes across the app.

## Commands
- Start: `yarn start`
- Test: `yarn test`
- Lint: `yarn lint --fix`
- Build: `yarn build`
