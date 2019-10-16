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
    BLUE: 'Blue',
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
    ADVANCED_LOGISTICS: 'You may rearrange all tiles in your construction zone (including turning them over)',
    ALIEN_ARCHAEOLOGY: '+$4 (instead of +$2) when Stocking with an Alien Technology (yellow) explorer.',
    ALIEN_RESEARCH_SHIP: 'Act as if your had an extra Home (white) explorer and an extra Alien Technology (yellow) explorer for use this phase.',
    ALIEN_RESEARCH_TEAM: 'Draw and keep an extra tile at the end of this phase. If you Scouted with at least one Alien Technology (yellow) explorer, +$1.',
    ALIEN_UPLIFT_BLUEPRINTS: 'Genes (green) and Alien Technology (yellow) worlds require one fewer settler to complete.',
    BACKUP_PLANNING: 'In the same round, you may Dictate more than once to Reassign workers.',
    BIOLOGICAL_ADAPTATION: 'All Reassign-power developments require one fewer developer to complete (but no fewer than one).',
    COLONIAL_AFFINITY: 'You may Reassign one worker to become a settler.',
    CONSUMER_MARKETS: '+$1 for each good on a Novelty (blue) world at the end of this phase.',
    DIVERSIFICATION: 'You may Reassign one Home (white) explorer to any phase.',
    EXECUTIVE_POWER: 'You may Reassign exactly two same-phase workers to the phase you select.',
    EXPORT_DUTIES: '+$1 for each good you Trade this phase.',
    FREE_TRADE_ASSOCIATION: '+$2 at the end of this phase.',
    GALACTIC_RELIGION: '+$1 for each Novelty (blue) die in your Citizenry at the end of this phase.',
    GENETICS_LAB: '+$2 for each good represented by a Genes (green) die at the end of this phase.',
    IMPROVED_RECONNAISSANCE: 'You may place new tiles on top of your stacks when Scouting.',
    JUMPDRIVE_RESEARCH: '+1$ for each good you Trade this turn from a Rare Elements (brown) world.',
    LOCAL_SUBSIDIES: 'You may Reassign one Home (white) worker to any phase.',
    MINING_INDUSTRY: '+$1 for each good you Consume (not Trade) this phase from a Rare Elements (brown) world.',
    NANOTECHNOLOGY: 'You may Reassign one or two workers to any phase(s).',
    SPACE_PIRACY: '+$1 for every two Military (red) dice (rounded up) in your Citizenry at the end of the phase.'
};

export const bonuses = {
    CONSCRIPTION: 'Remove any one of your dice, then gain two Military (red) dice into your cup.',
    EIGHT_CREDITS: 'Begin the game with $8 instead of $1.',
    ONE_BROWN_DIE_TO_CUP: 'Gain a Rare Elements (brown) die into your cup when you place this world.',
    ONE_BROWN_DIE_TO_CITIZENRY: 'Gain a Rare Elements (brown) die into your Citizenry when you place this world.',
    ONE_BROWN_DIE_TO_WORLD: 'Gain a Rare Elements (brown) good on this world when you place it.',
    ONE_BLUE_DIE_TO_CUP: 'Gain a Novelty (blue) die into your cup when you place this world.',
    ONE_BLUE_DIE_TO_WORLD: 'Gain a Novelty (blue) good on this world when you place it.',
    ONE_BLUE_DIE_AND_ONE_RED_DIE_TO_CITIZENRY: 'Gain a Novelty (blue) die and a Military (red) into your Citizenry when you place this world.',
    ONE_CREDIT_AND_ONE_BROWN_DIE_TO_WORLD: 'Gain $1 and a Rare Elements (brown) good on this world when you place it.',
    ONE_CREDIT_AND_ONE_GREEN_DIE_TO_CUP: 'Gain $1 and a Genes (green) die into your cup when you place this world.',
    ONE_CREDIT_AND_ONE_GREEN_DIE_TO_WORLD: 'Gain $1 and a Genes (green) good on this world when you place it.',
    ONE_GREEN_DIE_TO_CUP: 'Gain a Genes (green) die into your cup when you place this world.',
    ONE_GREEN_DIE_TO_CITIZENRY: 'Gain a Genes (green) die into your Citizenry when you place this world.',
    ONE_GREEN_DIE_TO_WORLD: 'Gain a Genes (green) good on this world when you place it.',
    ONE_PURPLE_DIE_TO_CITIZENRY: 'Gain a Consumption (purple) die into your Citizenry when you place this world.',
    ONE_PURPLE_DIE_TO_CUP: 'Gain a Consumption (purple) die into your cup when you place this world.',
    ONE_RED_DIE_TO_CITIZENRY: 'Gain a Military (red) die into your Citizenry when you place this world.',
    ONE_RED_DIE_TO_CUP: 'Gain a Military (red) die into your cup when you place this world.',
    ONE_YELLOW_DIE_TO_CITIZENRY: 'Gain a Alien Technology (yellow) die into your Citizenry when you place this world.',
    REBEL_WARRIOR_RACE: 'Remove any one of your dice and gain a Military (red) and a Genes (green) die into your Citizenry when you place this world.',
    TWO_CREDITS_AND_ONE_YELLOW_DIE_TO_WORLD: 'Gain $2 and a Alien Technology (yellow) good on this world when you place it.',
    TWO_CREDITS_AND_TWO_PURPLE_DICE_TO_CITIZENRY: 'Gain $2 and two Consumption (purple) dice into your Citizenry when you place this world.',
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
                bonus: bonuses.ONE_RED_DIE_TO_CITIZENRY
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
                bonus: bonuses.ONE_YELLOW_DIE_TO_CITIZENRY
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
                bonus: bonuses.ONE_BLUE_DIE_TO_CUP
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
                bonus: bonuses.ONE_BROWN_DIE_TO_CUP
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
                bonus: bonuses.ONE_GREEN_DIE_TO_CITIZENRY
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
                bonus: bonuses.ONE_BLUE_DIE_TO_WORLD
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
                bonus: bonuses.ONE_GREEN_DIE_TO_CUP
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
                bonus: bonuses.ONE_BROWN_DIE_TO_CITIZENRY
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
                bonus: bonuses.ONE_PURPLE_DIE_TO_CUP
            },
            {
                tileType: tileTypes.YELLOW_WORLD,
                points: 1,
                name: 'Awakened Alien Outpost',
                bonus: bonuses.ONE_RED_DIE_TO_CITIZENRY
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
            bonus: bonuses.TWO_RED_DICE_TO_CITIZENRY
        }
    },
    {
        tileId: 2,
        tile: {
            tileType: tileTypes.GRAY_WORLD,
            points: 0,
            name: 'Doomed World',
            bonus: bonuses.EIGHT_CREDITS
        }
    },
    {
        tileId: 3,
        tile: {
            tileType: tileTypes.BROWN_WORLD,
            points: 1,
            name: 'Alpha Centauri',
            bonus: bonuses.ONE_BROWN_DIE_TO_WORLD
        }
    },
    {
        tileId: 4,
        tile: {
            tileType: tileTypes.BLUE_WORLD,
            points: 2,
            name: 'Earth\'s Lost Colony',
            bonus: bonuses.ONE_BLUE_DIE_TO_WORLD
        }
    },
    {
        tileId: 5,
        tile: {
            tileType: tileTypes.GREEN_WORLD,
            points: 0,
            name: 'Ancient Race',
            bonus: bonuses.ONE_GREEN_DIE_TO_WORLD
        }
    },
    {
        tileId: 6,
        tile: {
            tileType: tileTypes.YELLOW_WORLD,
            points: 1,
            name: 'Damaged Alien Factory',
            bonus: bonuses.ONE_YELLOW_DIE_TO_CITIZENRY
        }
    },
    {
        tileId: 7,
        tile: {
            tileType: tileTypes.GRAY_WORLD,
            points: 3,
            name: 'Old Earth',
            bonus: bonuses.ONE_PURPLE_DIE_TO_CITIZENRY
        }
    },
    {
        tileId: 8,
        tile: {
            tileType: tileTypes.GRAY_WORLD,
            points: 2,
            name: 'Separatist Colony',
            bonus: bonuses.ONE_RED_DIE_TO_CUP
        }
    },
    {
        tileId: 9,
        tile: {
            tileType: tileTypes.GRAY_WORLD,
            points: 2,
            name: 'Epsilon Eridani',
            bonus: bonuses.ONE_BLUE_DIE_AND_ONE_RED_DIE_TO_CITIZENRY
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
                name: 'Advanced Logistics',
                [phases.EXPLORE]: developmentPowers.ADVANCED_LOGISTICS
            },
            {
                tileType: tileTypes.GREEN_WORLD,
                points: 5,
                name: 'Designer Species, Ultd.',
                bonus: bonuses.ONE_CREDIT_AND_ONE_GREEN_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 2,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 5,
                name: 'Alien Research Ship',
                [phases.EXPLORE]: developmentPowers.ALIEN_RESEARCH_SHIP
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 2,
                name: 'Spice World',
                bonus: bonuses.ONE_BLUE_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 3,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Alien Research Team',
                [phases.EXPLORE]: developmentPowers.ALIEN_RESEARCH_TEAM
            },
            {
                tileType: tileTypes.GREEN_WORLD,
                points: 3,
                name: 'Rebel Warrior Race',
                bonus: bonuses.REBEL_WARRIOR_RACE
            }
        ]
    },
    {
        tileId: 4,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Alien Uplift Blueprints',
                [phases.SETTLE]: developmentPowers.ALIEN_UPLIFT_BLUEPRINTS
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 3,
                name: 'Information Hub',
                bonus: bonuses.ONE_BLUE_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 5,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 1,
                name: 'Backup Planning',
                [phases.ASSIGNMENT]: developmentPowers.BACKUP_PLANNING
            },
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 6,
                name: 'Galactic Trendsetters',
                bonus: bonuses.TWO_CREDITS_AND_TWO_PURPLE_DICE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 6,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 4,
                name: 'Conscription',
                bonus: bonuses.CONSCRIPTION
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 2,
                name: 'Gem World',
                bonus: bonuses.ONE_BLUE_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 7,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Colonial Affinity',
                [phases.ASSIGNMENT]: developmentPowers.COLONIAL_AFFINITY
            },
            {
                tileType: tileTypes.GREEN_WORLD,
                points: 4,
                name: 'Malevolent Lifeforms',
                bonus: bonuses.ONE_GREEN_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 8,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 1,
                name: 'Diversification',
                [phases.ASSIGNMENT]: developmentPowers.DIVERSIFICATION
            },
            {
                tileType: tileTypes.GREEN_WORLD,
                points: 5,
                name: 'Lost Species Ark World',
                bonus: bonuses.ONE_CREDIT_AND_ONE_GREEN_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 9,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Executive Powers',
                [phases.ASSIGNMENT]: developmentPowers.EXECUTIVE_POWER
            },
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 3,
                name: 'Trading World',
                bonus: bonuses.ONE_PURPLE_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 10,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Export Duties',
                [phases.SHIP]: developmentPowers.EXPORT_DUTIES
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 4,
                name: 'Silicon World',
                bonus: bonuses.ONE_CREDIT_AND_ONE_BROWN_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 11,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 6,
                name: 'Free Trade Association',
                [phases.SHIP]: developmentPowers.FREE_TRADE_ASSOCIATION,
                endGame: 'Add half of your total Novelty (blue) world cost (rounded up).'
            },
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 2,
                name: 'Sentient Robots',
                bonus: bonuses.ONE_RED_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 29,
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
                bonus: bonuses.TWO_CREDITS_AND_ONE_YELLOW_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 30,
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
                bonus: bonuses.ONE_CREDIT_AND_ONE_GREEN_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 36,
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
                bonus: bonuses.ONE_BROWN_DIE_TO_CUP
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
