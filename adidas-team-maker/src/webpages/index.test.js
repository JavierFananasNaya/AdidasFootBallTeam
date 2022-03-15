import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react';
import Webpages from "./index";


test ('renders content', () => {
    const component = render(<Webpages></Webpages>)
    console.log(component)
    component.getByText('Select a team to load its info')
})