import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "john" },
    }),
  },
}));
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders fruit list item", () => {
  render(<App />);
  const element = screen.getAllByRole("listitem");
  expect(element.length).toBe(3);
});
test("h2 testing", () => {
  render(<App />);
  const element = screen.getByTestId("mytestid");
  expect(element).toBeInTheDocument();
});
test("number testing", () => {
  render(<App />);
  const element = screen.getByTitle("mytitle");
  expect(element.textContent).toBe("120");
});
test("input testing", () => {
  render(<App />);
  const element = screen.getByPlaceholderText(/Enter Username here/i);
  expect(element).toBeInTheDocument();
});
test("password testing", () => {
  render(<App />);
  const element = screen.getByPlaceholderText(/Enter password/i);
  expect(element).toBeInTheDocument();
});
test("input empty testing", () => {
  render(<App />);
  const element = screen.getByPlaceholderText(/Enter Username here/i);
  expect(element.value).toBe("");
});
test("password empty testing", () => {
  render(<App />);
  const element = screen.getByPlaceholderText(/Enter password/i);
  expect(element.value).toBe("");
});
test("disabled button", () => {
  render(<App />);
  const element = screen.getByTestId("mybutton1");
  expect(element).toBeDisabled();
});

test("error message should not be visible", () => {
  render(<App />);
  const element = screen.getByTestId("error message");
  expect(element).not.toBeVisible();
});

test("not null value in the username", () => {
  render(<App />);
  const element = screen.getByTestId("username");
  const testVal = "test";
  fireEvent.change(element, { target: { value: testVal } });
  expect(element.value).toBe(testVal);
});

test("not null value password", () => {
  render(<App />);
  const element = screen.getByTestId("password");
  const testPass = "testPass";
  fireEvent.change(element, { target: { value: testPass } });
  expect(element.value).toBe(testPass);
});

test("button should not be disabled when input exists", () => {
  render(<App />);
  const button1 = screen.getByTestId("mybutton1");
  const userInput = screen.getByTestId("username");
  const passInput = screen.getByTestId("password");
  const user = "user";
  const pass = "pass";
  fireEvent.change(userInput, { target: { value: user } });
  fireEvent.change(passInput, { target: { value: pass } });
  expect(button1).not.toBeDisabled();
});

test("loading should not be rendred", () => {
  render(<App />);
  const button1 = screen.getByTestId("mybutton1");
  expect(button1.textContent).not.toBe(/please wait/i);
});

test("loading should render on click", () => {
  render(<App />);
  const button1 = screen.getByTestId("mybutton1");
  const userinput = screen.getByTestId("username");
  const passinput = screen.getByTestId("password");
  fireEvent.change(userinput, { target: { value: "test" } });
  fireEvent.change(passinput, { target: { value: "test" } });
  fireEvent.click(button1);
  expect(button1.textContent).toBe("please wait");
});

test("loading should not be rendred after fetching", async () => {
  render(<App />);
  const button1 = screen.getByTestId("mybutton1");
  const userip = screen.getByTestId("username");
  const passip = screen.getByTestId("password");
  fireEvent.change(userip, { target: { value: "test" } });
  fireEvent.change(passip, { target: { value: "test" } });
  fireEvent.click(button1);
  await waitFor(() => expect(button1.textContent).not.toBe(/please wait/i));
});
