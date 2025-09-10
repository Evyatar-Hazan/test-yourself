// TODO: Ensure i18n loads and fallback works
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../App";
import i18n from "../i18n";
import { store } from "../store";
import "../i18n";

describe("i18n", () => {
  it("renders welcome text in default (en)", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  it("falls back to key when missing", () => {
    // Simulate missing key by querying non-existing translation – t will return key
    expect(i18n.t("__missing_key__" as never)).toBe("__missing_key__");
  });
});
