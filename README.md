# TicTacToeJS
Small beginner project in html/css/js

First, lets break down the user interface:

- title
- 3x3 grid
- the grid should be clickable
- the grid cells should have the correct player sign displayed an information display
- should display a message informing the current player it’s their turn
- should show us who won the game
- should show us if the game ended in a draw
- restart button
- will restart the entire game

------------
 Next, lets break down the game flow for a cell click:
- needs to track any clicks that happen on our cells
- needs to check if a valid move has been made
- needs to make sure nothing happens if an already played cell has been clicked
- we should update our game state
- we should validate the game state
- check if a player has won
- check if the game ended in a draw
- either stop the game or change the active player, depending on the above checks
- reflect the updates made on the UI
- rinse and repeat
