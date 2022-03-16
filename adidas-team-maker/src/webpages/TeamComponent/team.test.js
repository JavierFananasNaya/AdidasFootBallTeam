import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from "@testing-library/react";
import Team from "./team";
import PlayerCard from "../PlayerCard/PlayerCard"

test ('asks to select a team if there is not one', ()=> {
    const selectedTeam = null;
    const component = render(<Team selectedTeam={selectedTeam}></Team>)
    component.getByText('Select a team to load its info')
})

test('adding player is called when click addPlayer', () => {
    const player = {
        "player": {
            "id": 1480,
            "name": "J. Mathieu",
            "firstname": "Jérémy",
            "lastname": "Mathieu",
            "age": 38,
            "birth": {
                "date": "1983-10-29",
                "place": "Luxeuil-les-Bains",
                "country": "France"
            },
            "nationality": "France",
            "height": "189 cm",
            "weight": "82 kg",
            "injured": false,
            "photo": "https://media.api-sports.io/football/players/1480.png",
            "teamId": 2
        },
        "statistics": [
            {
                "team": {
                    "id": 2,
                    "name": "France",
                    "logo": "https://media.api-sports.io/football/teams/2.png"
                },
                "league": {
                    "id": 32,
                    "name": "World Cup - Qualification Europe",
                    "country": "World",
                    "logo": "https://media.api-sports.io/football/leagues/32.png",
                    "flag": null,
                    "season": 2018
                },
                "games": {
                    "appearences": 0,
                    "lineups": 0,
                    "minutes": 0,
                    "number": null,
                    "position": "Defender",
                    "rating": null,
                    "captain": false
                },
                "substitutes": {
                    "in": 0,
                    "out": 0,
                    "bench": 0
                },
                "shots": {
                    "total": null,
                    "on": null
                },
                "goals": {
                    "total": 0,
                    "conceded": null,
                    "assists": null,
                    "saves": null
                },
                "passes": {
                    "total": null,
                    "key": null,
                    "accuracy": null
                },
                "tackles": {
                    "total": null,
                    "blocks": null,
                    "interceptions": null
                },
                "duels": {
                    "total": null,
                    "won": null
                },
                "dribbles": {
                    "attempts": null,
                    "success": null,
                    "past": null
                },
                "fouls": {
                    "drawn": null,
                    "committed": null
                },
                "cards": {
                    "yellow": 0,
                    "yellowred": 0,
                    "red": 0
                },
                "penalty": {
                    "won": null,
                    "commited": null,
                    "scored": null,
                    "missed": null,
                    "saved": null
                }
            }
        ]
    }
    const mockHandler = jest.fn()
    const component = render(<PlayerCard player={player} type={'player'} onSelectPlayer={mockHandler}></PlayerCard>)
    const buttonAdd = component.container.querySelector('button');
    fireEvent.click(buttonAdd);
    expect(mockHandler.mock.calls).toHaveLength(1)

})