export const tileTypes = {
    BLUE_WORLD: 'Blue World',
    BROWN_WORLD: 'Brown World',
    DEVELOPMENT: 'Development',
    GRAY_WORLD: 'Gray World',
    GREEN_WORLD: 'Green World',
    YELLOW_WORLD: 'Yellow World'
};

export const phases = {
    ASSIGNMENT: 'Assignment',
    DEVELOP: 'Develop',
    EXPLORE: 'Explore',
    PRODUCE: 'Produce',
    SETTLE: 'Settle',
    SHIP: 'Ship'
};

export const dieColors = {
    BlUE: 'Blue',
    BROWN: 'Brown',
    GREEN: 'Green',
    PURPLE: 'Purple',
    RED: 'Red',
    WHITE: 'White',
    YELLOW: 'Yellow',
};

export const gameColors = {
    BLACK: '#000000',
    BLUE: '#00aadd',
    BROWN: '#8b4513',
    GRAY: '#808080',
    GREEN: '#008000',
    PURPLE: '#dd50dd',
    RED: '#ff2020',
    WHITE: '#ffffff',
    YELLOW: '#dddd00'
};

const developmentPowers = {
    ALIEN_ARCHAEOLOGY: '+$4 (instead of +$2) when Stocking with an Alien Technology (yellow) explorer.',
    BIOLOGICAL_ADAPTATION: 'All Reassign-power developments require one fewer developer to complete (but no fewer than one).',
    CONSUMER_MARKETS: '+$1 for each good on a Novelty (blue) world at the end of this phase.',
    GALACTIC_RELIGION: '+$1 for each Novelty (blue) die in your Citizenry at the end of this phase.',
    GENETICS_LAB: '+$2 for each good represented by a Genes (green) die at the end of this phase.',
    IMPROVED_RECONNAISSANCE: 'You may place new tiles on top of your stacks when Scouting.',
    JUMPDRIVE_RESEARCH: '+1$ for each good you Trade this turn from a Rare Elements (brown) world.',
    LOCAL_SUBSIDIES: 'You may Reassign one Home (white) worker to any phase.',
    MINING_INDUSTRY: '+$1 for each good you Consume (not Trade) this phase from a Rare Elements (brown) world.',
    NANOTECHNOLOGY: 'You may Reassign one or two workers to any phase(s).',
    SPACE_PIRACY: '+$1 for every two Military (red) dice (rounded up) in your Citizenry at the end of the phase.'
};

export const worldBonuses = {
    EIGHT_CREDITS: 'Begin the game with $8 instead of $1.',
    ONE_BROWN_DIE_TO_CUP: 'Gain a Rare Elements (brown) die into your cup when you place this world.',
    ONE_BROWN_DIE_TO_CITIZENRY: 'Gain a Rare Elements (brown) die into your Citizenry when you place this world.',
    ONE_BROWN_DIE_TO_WORLD: 'Gain a Rare Elements (brown) good on this world when you place it.',
    ONE_CREDIT_AND_ONE_GREEN_DIE_TO_CUP: 'Gain $1 and a Genes (green) die into your cup when you place this world.',
    ONE_BLUE_DIE_AND_ONE_RED_DIE_TO_CITIZENRY: 'Gain a Novelty (blue) die and a Military (red) into your Citizenry when you place this world.',
    ONE_BLUE_DIE_TO_CUP: 'Gain a Novelty (blue) die into your cup when you place this world.',
    ONE_BLUE_DIE_TO_WORLD: 'Gain a Novelty (blue) good on this world when you place it.',
    ONE_GREEN_DIE_TO_CUP: 'Gain a Genes (green) die into your cup when you place this world.',
    ONE_GREEN_DIE_TO_CITIZENRY: 'Gain a Genes (green) die into your Citizenry when you place this world.',
    ONE_GREEN_DIE_TO_WORLD: 'Gain a Genes (green) good on this world when you place it.',
    ONE_PURPLE_DIE_TO_CITIZENRY: 'Gain a Consumption (purple) die into your Citizenry when you place this world.',
    ONE_PURPLE_DIE_TO_CUP: 'Gain a Consumption (purple) die into your cup when you place this world.',
    ONE_RED_DIE_TO_CITIZENRY: 'Gain a Military (red) die into your Citizenry when you place this world.',
    ONE_RED_DIE_TO_CUP: 'Gain a Military (red) die into your cup when you place this world.',
    ONE_YELLOW_DIE_TO_CITIZENRY: 'Gain a Alien Technology (yellow) die into your Citizenry when you place this world.',
    TWO_CREDITS_AND_ONE_YELLOW_DIE_TO_WORLD: 'Gain $2 and a Alien Technology (yellow) good on this world when you place it.',
    TWO_RED_DICE_TO_CITIZENRY: 'Gain two Military (red) dice into your Citizenry when you place this world.'
};

const factionTiles = [
    {
        tileId: 1,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 0,
                name: 'Space Piracy',
                [phases.SHIP]: developmentPowers.SPACE_PIRACY
            },
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 2,
                name: 'Hidden Fortress',
                bonus: worldBonuses.ONE_RED_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 2,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 1,
                name: 'Alien Archaeology',
                [phases.SHIP]: developmentPowers.ALIEN_ARCHAEOLOGY
            },
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 1,
                name: 'Alien Rosetta Stone World',
                bonus: worldBonuses.ONE_YELLOW_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 3,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Consumer Markets',
                [phases.PRODUCE]: developmentPowers.CONSUMER_MARKETS
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 0,
                name: 'Space Mall',
                bonus: worldBonuses.ONE_BLUE_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 4,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Improved Reconnaissance',
                [phases.EXPLORE]: developmentPowers.IMPROVED_RECONNAISSANCE
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 3,
                name: 'Wormhole Station',
                bonus: worldBonuses.ONE_BROWN_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 5,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Genetics Lab',
                [phases.PRODUCE]: developmentPowers.GENETICS_LAB
            },
            {
                tileType: tileTypes.GREEN_WORLD,
                points: 0,
                name: 'The Last of the Gnarssh',
                bonus: worldBonuses.ONE_GREEN_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 6,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Galactic Religion',
                [phases.DEVELOP]: developmentPowers.GALACTIC_RELIGION
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 3,
                name: 'Pilgrimage World',
                bonus: worldBonuses.ONE_BLUE_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 7,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Biological Adaptation',
                [phases.DEVELOP]: developmentPowers.BIOLOGICAL_ADAPTATION
            },
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 2,
                name: 'Aquatic Uplift World',
                bonus: worldBonuses.ONE_GREEN_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 8,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Mining Industry',
                [phases.SHIP]: developmentPowers.MINING_INDUSTRY
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 1,
                name: 'Meteorite Planet',
                bonus: worldBonuses.ONE_BROWN_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 9,
        tiles: [
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 2,
                name: 'Destroyed Colony',
                bonus: worldBonuses.ONE_PURPLE_DIE_TO_CUP
            },
            {
                tileType: tileTypes.YELLOW_WORLD,
                points: 1,
                name: 'Awakened Alien Outpost',
                bonus: worldBonuses.ONE_RED_DIE_TO_CITIZENRY
            }
        ]
    }
];

const homeWorldTiles = [
    {
        tileId: 1,
        tile: {
            tileType: tileTypes.GRAY_WORLD,
            points: 2,
            name: 'New Sparta',
            bonus: worldBonuses.TWO_RED_DICE_TO_CITIZENRY
        }
    },
    {
        tileId: 2,
        tile: {
            tileType: tileTypes.GRAY_WORLD,
            points: 0,
            name: 'Doomed World',
            bonus: worldBonuses.EIGHT_CREDITS
        }
    },
    {
        tileId: 3,
        tile: {
            tileType: tileTypes.BROWN_WORLD,
            points: 1,
            name: 'Alpha Centauri',
            bonus: worldBonuses.ONE_BROWN_DIE_TO_WORLD
        }
    },
    {
        tileId: 4,
        tile: {
            tileType: tileTypes.BLUE_WORLD,
            points: 2,
            name: 'Earth\'s Lost Colony',
            bonus: worldBonuses.ONE_BLUE_DIE_TO_WORLD
        }
    },
    {
        tileId: 5,
        tile: {
            tileType: tileTypes.GREEN_WORLD,
            points: 0,
            name: 'Ancient Race',
            bonus: worldBonuses.ONE_GREEN_DIE_TO_WORLD
        }
    },
    {
        tileId: 6,
        tile: {
            tileType: tileTypes.YELLOW_WORLD,
            points: 1,
            name: 'Damaged Alien Factory',
            bonus: worldBonuses.ONE_YELLOW_DIE_TO_CITIZENRY
        }
    },
    {
        tileId: 7,
        tile: {
            tileType: tileTypes.GRAY_WORLD,
            points: 3,
            name: 'Old Earth',
            bonus: worldBonuses.ONE_PURPLE_DIE_TO_CITIZENRY
        }
    },
    {
        tileId: 8,
        tile: {
            tileType: tileTypes.GRAY_WORLD,
            points: 2,
            name: 'Separatist Colony',
            bonus: worldBonuses.ONE_RED_DIE_TO_CUP
        }
    },
    {
        tileId: 9,
        tile: {
            tileType: tileTypes.GRAY_WORLD,
            points: 2,
            name: 'Epsilon Eridani',
            bonus: worldBonuses.ONE_BLUE_DIE_AND_ONE_RED_DIE_TO_CITIZENRY
        }
    }
];

const gameTiles = [
    {
        tileId: 1,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 1,
                name: 'JumpDrive Research',
                [phases.SHIP]: developmentPowers.JUMPDRIVE_RESEARCH
            },
            {
                tileType: tileTypes.YELLOW_WORLD,
                points: 6,
                name: 'Deserted Alien Library',
                bonus: worldBonuses.TWO_CREDITS_AND_ONE_YELLOW_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 2,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Local Subsidies',
                [phases.ASSIGNMENT]: developmentPowers.LOCAL_SUBSIDIES
            },
            {
                tileType: tileTypes.GREEN_WORLD,
                points: 4,
                name: 'Distant World',
                bonus: worldBonuses.ONE_CREDIT_AND_ONE_GREEN_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 3,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 5,
                name: 'Nanotechnology',
                [phases.ASSIGNMENT]: developmentPowers.NANOTECHNOLOGY
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 2,
                name: 'Radioactive World',
                bonus: worldBonuses.ONE_BROWN_DIE_TO_CUP
            }
        ]
    }
];

export const initialGameState = {
    players: [],
    factionTiles,
    homeWorldTiles,
    gameTiles
};
