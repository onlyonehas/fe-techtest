import  { useState } from "react";
import styled from "styled-components";

 const Container = styled.div`
		display: grid;
		justify-items: space-evenly;
		grid-gap: 10px;
		grid-template-columns: repeat(3, 33%);
		margin: 2rem 5rem;

		@media (max-width: 800px) {
			grid-template-columns: repeat(2, 50%);
		}

		@media (max-width: 400px) {
			grid-template-columns: repeat(1, 100%);
		}
 `;

 const GridElement = styled.div`
		place-self: center;
 `;

  const Title = styled.h1`
		display: grid;
		justify-items: center;
	`;
 
 const HighlightedNumbers = styled.button`
		background-color: red;
		font-weight: bold;
		font-family: "Arial";
		font-size: 2rem;
		line-height: 1.5;
		cursor: pointer;
 `;

 const UnselectedNumbers = styled.button`
		background-color: yellow;
		font-family: "Arial";
		font-size: 1.5rem;
		line-height: 1;
		cursor: pointer;
 `;

function App() {
	const [selectedNumbers, setNumbers] = useState <number[]>([]);
  
  const checkMultiples = (clickedNumber: number) => {
		let shouldBeHighlighted = [];
		for (let i = 1; i <= 144; i++) {
			if (i % clickedNumber === 0) shouldBeHighlighted.push(i);
		}
		if (shouldBeHighlighted) setNumbers(shouldBeHighlighted);
	};

	const displayAllNumbers = () => {
		let mutiples = [];
		for (let i: number = 1; i <= 144; i++) {
     let displayedNumber
    
     const stateNumbers: any = Object.values(selectedNumbers);
      displayedNumber =
				stateNumbers && stateNumbers.includes(i) ? (
					<HighlightedNumbers data-testid="highlightedNumbers">
						{i}
					</HighlightedNumbers>
				) : (
					<UnselectedNumbers data-testid="unSelectedNumbers">
						{i}
					</UnselectedNumbers>
				);
      	      
      mutiples.push(
				<GridElement
					onClick={() => {
						checkMultiples(i);
					}}
					key={i}
					data-testid="gridElementNumbers"
				>
					{displayedNumber}
				</GridElement>
			);
		}
		return mutiples;
	};

	return (
		<div className="App">
			<Title data-testid="title">Children's Multiplication</Title>
			<Container data-testid="gridCointainer">{displayAllNumbers()}</Container>
		</div>
	);
}

export default App;
