import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import SignUp from "./pages/signUp/signup";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Result from "./pages/resultPage/resultPage";
import HomePage from "./pages/homePage/homePage";
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';


test('renders SignUp component', () => {
  render(<BrowserRouter><SignUp /></BrowserRouter>);
  const linkElement = screen.getByText("Sign up at the website");
  expect(linkElement).toBeInTheDocument();
});

test('renders Login component', () => {
  render(<BrowserRouter><Login /></BrowserRouter>);
  const linkElement = screen.getByText("Sign in at the website");
  expect(linkElement).toBeInTheDocument();
});


test('renders resultPage component', () => {
  render(<Result />);
  const linkElement = screen.getByText("Here are your results");
  expect(linkElement).toBeInTheDocument();
});

test('renders HomePage component', () => {
  render(<BrowserRouter><HomePage /></BrowserRouter>);
  const linkElement = screen.getByText("Welcome to InfoChecker");
  expect(linkElement).toBeInTheDocument();
});
