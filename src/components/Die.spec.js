import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Chance from 'chance';
import Die from './Die';
import { dieColor, dieFace } from '../enums';

const chance = new Chance();

describe('Die', () => {
    let expectedDieProps = {
        color: chance.pickone([
            dieColor.BLUE,
            dieColor.BROWN,
            dieColor.GREEN,
            dieColor.PURPLE,
            dieColor.RED,
            dieColor.WHITE,
            dieColor.YELLOW
        ]),
        face: chance.pickone([
            dieFace.EXPLORE,
            dieFace.DEVELOP,
            dieFace.SETTLE,
            dieFace.PRODUCE,
            dieFace.SHIP,
            dieFace.WILD
        ])
    }
    afterEach(cleanup);

    describe('Die Colors', () => {
        it('should render a blue die', () => {
            expectedDieProps.color = dieColor.BLUE;
    
            const {getByTestId} = render(<Die {...expectedDieProps} />);
    
            expect(getByTestId('BlueDie')).toBeTruthy();
        });
    
        it('should render a brown die', () => {
            expectedDieProps.color = dieColor.BROWN;
    
            const {getByTestId} = render(<Die {...expectedDieProps} />);
    
            expect(getByTestId('BrownDie')).toBeTruthy();
        });
    
        it('should render a green die', () => {
            expectedDieProps.color = dieColor.GREEN;
    
            const {getByTestId} = render(<Die {...expectedDieProps} />);
    
            expect(getByTestId('GreenDie')).toBeTruthy();
        });
    
        it('should render a purple die', () => {
            expectedDieProps.color = dieColor.PURPLE;
    
            const {getByTestId} = render(<Die {...expectedDieProps} />);
    
            expect(getByTestId('PurpleDie')).toBeTruthy();
        });
    
        it('should render a red die', () => {
            expectedDieProps.color = dieColor.RED;
    
            const {getByTestId} = render(<Die {...expectedDieProps} />);
    
            expect(getByTestId('RedDie')).toBeTruthy();
        });
    
        it('should render a white die', () => {
            expectedDieProps.color = dieColor.WHITE;
    
            const {getByTestId} = render(<Die {...expectedDieProps} />);
    
            expect(getByTestId('WhiteDie')).toBeTruthy();
        });
    
        it('should render a yellow die', () => {
            expectedDieProps.color = dieColor.YELLOW;
    
            const {getByTestId} = render(<Die {...expectedDieProps} />);
    
            expect(getByTestId('YellowDie')).toBeTruthy();
        });
    });

    describe('Die Faces', () => {
        it('should render a die with an explore face', () => {
            expectedDieProps.face = dieFace.EXPLORE;
    
            const {getByTestId} = render(<Die {...expectedDieProps} />);
    
            expect(getByTestId('explore-face')).toBeTruthy();
        });
    
        it('should render a die with a develop face', () => {
            expectedDieProps.face = dieFace.DEVELOP;
    
            const {getByTestId} = render(<Die {...expectedDieProps} />);
    
            expect(getByTestId('develop-face')).toBeTruthy();
        });
    
        it('should render a die with a settle face', () => {
            expectedDieProps.face = dieFace.SETTLE;
    
            const {getByTestId} = render(<Die {...expectedDieProps} />);
    
            expect(getByTestId('settle-face')).toBeTruthy();
        });
    
        it('should render a die with a produce face', () => {
            expectedDieProps.face = dieFace.PRODUCE;
    
            const {getByTestId} = render(<Die {...expectedDieProps} />);
    
            expect(getByTestId('produce-face')).toBeTruthy();
        });
    
        it('should render a die with a ship face', () => {
            expectedDieProps.face = dieFace.SHIP;
    
            const {getByTestId} = render(<Die {...expectedDieProps} />);
    
            expect(getByTestId('ship-face')).toBeTruthy();
        });
    
        it('should render a die with a wild face', () => {
            expectedDieProps.face = dieFace.WILD;
    
            const {getByTestId} = render(<Die {...expectedDieProps} />);
    
            expect(getByTestId('wild-face')).toBeTruthy();
        });
    })
});