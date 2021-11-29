Sasha Sirota's Capstone Project

Public Steam API with Game information:

- https://store.steampowered.com/

Private Steam Web API:

- https://steampowered.com/
- API_KEY: 9AC94E4A61E63CCF470E57C5A0688534

SteamSpy API:

- Basic query structure:
  - steamspy.com/api.php?request=
- Ex:
  - steamspy.com/api.php?request=top100in2weeks

Plotting out the logic:

- Iterate through x number of top games
  - Iterate through x number of reviews for each game
    - Iterate through most played games for each reviewer with x number of hours played in the game they reviewed
    - save a list of game objects including the number of times they showed up in most played games

Ideas to consider:

- Main page includes most played game only with bubbles floating around, with sizes varying by number of people who also played that game.
- Main page includes multiple top games simultaneously, or multiple pinned games. Games have branches coming off them connecting to the most played games of that playerbase.
