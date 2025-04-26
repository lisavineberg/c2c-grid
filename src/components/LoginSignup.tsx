import { loginUser } from "../api";
import { createUser } from "../api";
import styled from "styled-components";
import { useState } from "react";

const StyledForm = styled.form`
  align-items: start;
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

const ErrorMessage = styled.p`
  color: red;
`;

interface LoginSignupProps {
  type: "login" | "signup";
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const LoginSignup: React.FC<LoginSignupProps> = ({
  type,
  setIsLoggedIn,
}) => {
  const [error, setError] = useState("");

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    if (type === "signup") {
      const user = await createUser(email, password);
      if (!user) {
        setError("Error creating user");
      } else {
        setError("");
        setIsLoggedIn(true);
      }
    } else {
      const user = await loginUser(email, password);
      if (!user) {
        setError("Error logging in");
      } else {
        setError("");
        setIsLoggedIn(true);
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
      {error.length ? <ErrorMessage>{error}</ErrorMessage> : null}
    </div>
  );
};
