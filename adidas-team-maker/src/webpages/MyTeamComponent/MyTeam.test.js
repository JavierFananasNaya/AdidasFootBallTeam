import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, prettyDOM } from "@testing-library/react";
import { render } from '@testing-library/react';
import MyTeam from "./MyTeam";


test('team is being saved when button clicked', () => {
    const component = render(<MyTeam id="myTeam"></MyTeam>);
    const buttonAdd = component.container.querySelector('.save-team-button');
    fireEvent.click(buttonAdd);
    const teamStoraged = localStorage.getItem('myTeam')
    expect(teamStoraged).not.toBe(null)
})