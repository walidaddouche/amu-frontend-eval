import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Customer } from "../../utils/type";
import CustomerCard from "../../components/CustomerCard";
/*
describe("CustomerCard component", () => {
  const sampleCustomer: Customer = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  };

  it("renders the correct customer information", () => {
    const { getByText } = render(<CustomerCard {...sampleCustomer} />);

    // Check that the name is displayed
    const nameElement = getByText(sampleCustomer.name);
    expect(nameElement).toBeInTheDocument();

    // Check that the email is displayed
    const emailElement = getByText(sampleCustomer.email);
    expect(emailElement).toBeInTheDocument();
  });

  it("navigates to the correct URL when clicked", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <CustomerCard {...sampleCustomer} />
      </Router>
    );

    // Simulate a click on the CustomerCard
    const cardElement = getByText(sampleCustomer.name).parentElement;
    fireEvent.click(cardElement!);

    // Check that the URL is correct
    expect(history.location.pathname).toBe(`/${sampleCustomer.id}`);
  });

  it("matches the snapshot", () => {
    const { container } = render(<CustomerCard {...sampleCustomer} />);
    expect(container).toMatchSnapshot();
  });
});

 */
export {}; // Déclaration d'exportation vide pour transformer le fichier en module
