import "styled-components";
import type { AppTheme } from "./types";

declare module "styled-components" {
  // Ensure all styled-components theme usages are strictly typed.
  // TODO: Keep this in sync with AppTheme when tokens evolve.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
