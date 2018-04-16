## Tournament Manger Front End

This tournament app is used to set up soccer tournaments. Each tournament is composed of a set of games, delineated by birth year and any other classification (gender, skill level), referred to here as divisions.

The set-up for each division of a tournament has 16 teams, each competing as 4 groups of 4, playing against each team in their group.

In this stage, points are awards to each game with the following rules: 6 points for a win, 1 point for a tie, 1 point for each goal scored up to 3, and 1 point for a clean-sheet (no goals allowed). The maximum points in a game in group play is 10.
From the groups, the two teams with the highest points move on to the play-offs. The play-offs consist of single elimination games at the quarter-final, semi-final and final level.
Once complete, each division will have completed 31 games.

## Application structure
The front-end of the application uses React.JS and a Redux store to handle state.  Webpack is used to transpile the code.  Testing is carried out using Jest.  All the additional dependencies are listed in the package.json file.

The project is deployed on Heroku at https://tournament-front-end.herokuapp.com/.


## User Stories
As an admininstrator, before the tournament starts, I want to be able to create a tournament divison - a set of games for a given age and class (gender and/or skill level). I also want to be able to create multiple flights to make a tournament.

As a user, I want to easily view the available tournaments, the divisions within the selected tournament and the game within the selected division.
