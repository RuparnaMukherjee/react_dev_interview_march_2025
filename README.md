# Welcome to the Dragonsurge React Technical Assessment (March 2025 Version)!

<p align="center">
  <img src="https://emojis.slackmojis.com/emojis/images/1649622683/57262/charizard.png?1649622683" alt="pikachu gif" />
</p>


## Theme: Pokemon Teams, But This Time: Frontend! 


### Requirements
1. Please use the Pokemon API to create Pokemon teams!
- Note: If you've also been invited to participate in the backend Ruby on Rails assessment, no need to connect frontend to backend, as they'll be too different to combine. Instead, think of them as separate projects for the most part.

2. Inside the .env file, you'll see the base URL that you'll need to use to call the Pokemon API. Here's the link to the API's documentation: 

```
https://pokeapi.co/
```

3. Make a single page interface that says: "PokeTeam Creator!"
- There should be 6 empty slots on this page
- There should also be a button labeled: "Assemble my PokeTeam!"
- When clicked, it should assign six random Pokemon to the team

4. Display Pokémon stats once each Pokémon is in a slot
- `name`
- `experience`
- `weight`
- `moves list` (just the move names is fine for now)
- `species`
- `types`
- `hit points`
- `attack points`
- `defense points`

5. "Make All New Team" button
- When you have all the slots populated, the "Assemble my PokeTeam" button should change to a "Make All New Team" button
- This should retrieve 6 new randomized Pokemon

6. Under each Pokemon, include a button labeled: "Replace This Pokemon"
- This should replace only that specific Pokemon with a new one

7. There should also be a button that says: "Remove this Pokemon"
- This should remove this Pokemon from that particular slot

8. Also: Display team point totals (somewhere on the page) 
- Show the current team's collective hit points
- And the team's collective attack points
- And defense points

### Soft Limit:
1. Don't let yourself work longer than three hours on the project. Catch em' all!


![charizard cool gif](https://emojis.slackmojis.com/emojis/images/1643509135/38228/charizard_cool.png?1643509135)

# Codebase Setup: Getting Started!

## Setup

Note: This codebase is set to appear on port `3006`!

Note: Axios comes pre-installed for you!

Note: And also, this codebase uses `yarn` as opposed to `node`.

Begin by cloning the repository.

## Docker Compose 

docker compose is here to make things fast.

First make sure you have docker and docker compose installed:
https://docs.docker.com/engine/install/

First build:

```
docker compose build
```

Start the application and all dependencies:

```
docker compose up
```

If you don't see specific kinds of changes appear, feel free to spin down:

```
docker compose down
```

Rebuild, then spin back up!

## Shell Scripts for Entering The Bash Shells for Each Container:
`bash web_enter_container_bash.sh`

# Helpful Debugging Cases:

### Permissions issues with saving things in your code editor that you generated while in the web docker container?
Run the script to chown all files in current directory:

`bash ./chown_all_files.sh`

Be sure to chmod it first if necessary:

`sudo chmod +x ./chown_all_files.sh`