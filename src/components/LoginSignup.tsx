import { loginUser } from "../api";
import { createUser } from "../api";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  background-color: white;
  border: 1px solid black;
  color: black;
  cursor: pointer;
  font-family: "Open Sans";
  max-width: 200px;
  padding: 5px;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

interface LoginSignupProps {
  type: "login" | "signup";
}

export const LoginSignup: React.FC<LoginSignupProps> = ({ type }) => {
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    if (type === "signup") {
      const user = await createUser(email, password);
      if (user) {
        console.log("User created:", user);
      } else {
        console.error("Failed to create user");
      }
    } else {
      const user = await loginUser(email, password);
      if (user) {
        console.log("User logged in:", user);
      } else {
        console.error("Failed to log in user");
      }
    }
  };

  return (
    <div>
      <h2>{type === "signup" ? "Sign up" : "Log in"}</h2>
      <StyledForm onSubmit={handleFormSubmit}>
        <Label>
          Email:
          <input type="text" name="email" />
        </Label>
        <Label>
          Password:
          <input type="password" name="password" />
        </Label>
        <Button type="submit">
          {type === "signup" ? "Sign up" : "Log in"}
        </Button>
      </StyledForm>
    </div>
  );
};
