import React from 'react';
import {render} from '@testing-library/react';
import App from "../src/App.js";

describe('App loads correctly', () => {

    it('should work', () => {
        const rendered = render(<App />);

    });
});
