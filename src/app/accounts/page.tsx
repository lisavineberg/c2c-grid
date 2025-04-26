"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getUser, logOutUser } from "../../api";
import { LoginSignup } from "../../components/LoginSignup";

const StyledAccounts = styled.div`
  display: flex;
  gap: 20px;
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

const Accounts = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setIsLoggedIn(!!user);
    };

    fetchUser();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    const loggedOut = await logOutUser();
    if (loggedOut) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      <h2>Accounts</h2>
      <p>Manage your accounts here.</p>
      {isLoggedIn ? (
        <div>
          You're all set to make and store patterns.{" "}
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <StyledAccounts>
          <LoginSignup type="signup" setIsLoggedIn={setIsLoggedIn} />
          <LoginSignup type="login" setIsLoggedIn={setIsLoggedIn} />
        </StyledAccounts>
      )}
    </div>
  );
};
export default Accounts;
