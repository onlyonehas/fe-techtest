import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import App from './App';

const checkMultipleof2 = (highlightedNumbers: any) => {
	let isMultiple = true;
	highlightedNumbers.forEach((element: any) => {
		const number: any = element.textContent;
		if (number % 2 !== 0) {
			isMultiple = false;
		}
	});
	return isMultiple;
};



test('childrens multiplication page should load successfully with nothing selected', () => {
	render(<App />);
	const title = screen.getByTestId("title");
  const container = screen.getByTestId("gridCointainer");
	const gridElements = screen.getAllByTestId("gridElementNumbers");
	const unSelectedNumbers = screen.getAllByTestId("unSelectedNumbers");
	const highlightedNumbers = screen.queryAllByTestId("highlightedNumbers");

  
  expect(title).toBeInTheDocument();
  expect(title.textContent).toBe("Children's Multiplication");
	expect(container).toBeInTheDocument();
  expect(gridElements.length).toBe(144);
  expect(unSelectedNumbers.length).toBe(144);
  expect(highlightedNumbers.length).toBe(0);
});

test("should highlight the correct multiples of 2 when clicked", () => {
	render(<App />);
  fireEvent.click(screen.getByText("2"));

	const unSelectedNumbers = screen.getAllByTestId("unSelectedNumbers");
	const highlightedNumbers = screen.getAllByTestId("highlightedNumbers");

	expect(checkMultipleof2(highlightedNumbers)).toBeTruthy();
	expect(unSelectedNumbers.length).toBe(72);
	expect(highlightedNumbers.length).toBe(72);
});


test("should render correctly when selecting any another number", () => {
	render(<App />);
	// clicking 1 should highlight everything
  fireEvent.click(screen.getByText("1"));
	let highlightedNumbers = screen.getAllByTestId("highlightedNumbers");
	let unSelectedNumbers = screen.queryAllByTestId("unSelectedNumbers");
	
  expect(highlightedNumbers.length).toBe(144);
	expect(unSelectedNumbers.length).toBe(0);

  // clicking 2 afterwards should only display multiples of 2 
  fireEvent.click(screen.getByText("2"));
	unSelectedNumbers = screen.getAllByTestId("unSelectedNumbers");
	highlightedNumbers = screen.getAllByTestId("highlightedNumbers");

	expect(checkMultipleof2(highlightedNumbers)).toBeTruthy();
	expect(unSelectedNumbers.length).toBe(72);
	expect(highlightedNumbers.length).toBe(72);
});
