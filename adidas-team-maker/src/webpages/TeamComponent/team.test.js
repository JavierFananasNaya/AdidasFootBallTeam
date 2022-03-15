import React from "react";
import '@testing-library/jest-dom/extend-expect';
import addPlayerHandler from './team'
import { prettyDOM, render } from "@testing-library/react";
import Team from "./team";

test ('asks to select a team if there is not one', ()=> {
    const selectedTeam = null;
    const component = render(<Team selectedTeam={selectedTeam}></Team>)
    component.getByText('Select a team to load its info')
})