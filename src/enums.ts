import { gameState, state } from "./components/Game";
import { Tiles } from "./components/ConstructionZone";

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
    ENDGAME: 'EndGame',
    EXPLORE: 'Explore',
    PRODUCE: 'Produce',
    SETTLE: 'Settle',
    SHIP: 'Ship'
};

export const dieColor = {
    BLUE: 'Blue',
    BROWN: 'Brown',
    GREEN: 'Green',
    PURPLE: 'Purple',
    RED: 'Red',
    WHITE: 'White',
    YELLOW: 'Yellow'
};

export const dieFace = {
    DEVELOP: 'Develop',
    EXPLORE: 'Explore',
    PRODUCE: 'Produce',
    SETTLE: 'Settle',
    SHIP: 'Ship',
    WILD: 'Wild'
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

export const bonuses = {
    CONSCRIPTION: 'Remove any one of your dice, then gain two Military (red) dice into your cup.',
    EIGHT_CREDITS: 'Begin the game with $8 instead of $1.',
    INFORMATION_TECH: 'Remove any one of your dice, then gain two Novelty (blue) dice into your cup.',
    ONE_BLUE_DIE_TO_CITIZENRY: 'Gain a Novelty (blue) die into your Citizenry when you place this world.',
    ONE_BLUE_DIE_TO_CUP: 'Gain a Novelty (blue) die into your cup when you place this world.',
    ONE_BLUE_DIE_TO_WORLD: 'Gain a Novelty (blue) good on this world when you place it.',
    ONE_BLUE_DIE_AND_ONE_RED_DIE_TO_CITIZENRY: 'Gain a Novelty (blue) die and a Military (red) into your Citizenry when you place this world.',
    ONE_BROWN_DIE_AND_ONE_RED_DIE_TO_CITIZENRY: 'Gain a Military (red) die and a Rare Elements (brown) die into your Citizenry when you place this world.',
    ONE_BROWN_DIE_TO_CUP: 'Gain a Rare Elements (brown) die into your cup when you place this world.',
    ONE_BROWN_DIE_TO_CITIZENRY: 'Gain a Rare Elements (brown) die into your Citizenry when you place this world.',
    ONE_BROWN_DIE_TO_WORLD: 'Gain a Rare Elements (brown) good on this world when you place it.',
    ONE_CREDIT_AND_ONE_BROWN_DIE_TO_WORLD: 'Gain $1 and a Rare Elements (brown) good on this world when you place it.',
    ONE_CREDIT_AND_ONE_GREEN_DIE_TO_CUP: 'Gain $1 and a Genes (green) die into your cup when you place this world.',
    ONE_CREDIT_AND_ONE_GREEN_DIE_TO_WORLD: 'Gain $1 and a Genes (green) good on this world when you place it.',
    ONE_CREDIT_AND_ONE_PURPLE_DIE_TO_CITIZENRY: 'Gain $1 and a Consumption (purple) die into your Citizenry when you place this world.',
    ONE_CREDIT_AND_ONE_YELLOW_DIE_TO_CUP: 'Gain $1 and a Alien Technology (yellow) die into your cup when you place this world.',
    ONE_CREDIT_AND_ONE_YELLOW_DIE_TO_WORLD: 'Gain $1 and a Alien Technology (yellow) good on this world when you place it.',
    ONE_GREEN_DIE_TO_CUP: 'Gain a Genes (green) die into your cup when you place this world.',
    ONE_GREEN_DIE_TO_CITIZENRY: 'Gain a Genes (green) die into your Citizenry when you place this world.',
    ONE_GREEN_DIE_TO_WORLD: 'Gain a Genes (green) good on this world when you place it.',
    ONE_PURPLE_DIE_TO_CITIZENRY: 'Gain a Consumption (purple) die into your Citizenry when you place this world.',
    ONE_PURPLE_DIE_TO_CUP: 'Gain a Consumption (purple) die into your cup when you place this world.',
    ONE_RED_DIE_TO_CITIZENRY: 'Gain a Military (red) die into your Citizenry when you place this world.',
    ONE_RED_DIE_TO_CUP: 'Gain a Military (red) die into your cup when you place this world.',
    ONE_YELLOW_DIE_TO_CITIZENRY: 'Gain a Alien Technology (yellow) die into your Citizenry when you place this world.',
    ONE_YELLOW_DIE_TO_WORLD: 'Gain an Alien Technology (yellow) good on this world when you place it.',
    REBEL_MINERS: 'Remove any one of your dice, then gain two Military (red) dice into your citizenry.',
    REBEL_WARRIOR_RACE: 'Remove any one of your dice and gain a Military (red) and a Genes (green) die into your Citizenry when you place this world.',
    REMOVE_ONE_DIE_AND_ONE_RED_DIE_TO_CUP: 'Remove any one of your dice and gain a Military (red) die into your cup when you place this world.',
    SPACE_MARINES: 'Remove any one of your dice, then gain $1 and a Military (red) die into your cup.',
    THREE_CREDITS_AND_ONE_YELLOW_DIE_TO_CUP: 'Gain $3 and an Alien Technology (yellow) die into your cup when you place this world.',
    TWO_CREDITS_AND_ONE_YELLOW_DIE_TO_CUP: 'Gain $2 and an Alien Technology (yellow) die into your cup when you place this world.',
    TWO_CREDITS_AND_ONE_YELLOW_DIE_TO_WORLD: 'Gain $2 and a Alien Technology (yellow) good on this world when you place it.',
    TWO_CREDITS_AND_ONE_PURPLE_DICE_TO_CITIZENRY: 'Gain $2 and one Consumption (purple) die into your Citizenry when you place this world.',
    TWO_CREDITS_AND_TWO_PURPLE_DICE_TO_CITIZENRY: 'Gain $2 and two Consumption (purple) dice into your Citizenry when you place this world.',
    TWO_RED_DICE_TO_CITIZENRY: 'Gain two Military (red) dice into your Citizenry when you place this world.'
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
    FREE_TRADE_ASSOCIATION_ENDGAME: 'Add half of your total Novelty (blue) world cost (rounded up).',
    FREE_TRADE_ZONE: 'Grey worlds require two fewer settlers to complete (but no fewer than two).',
    GALACTIC_BANKERS: 'Each time you Trade a good this phase, you may spend $1 to gain 1VP chip.',
    GALACTIC_BANKERS_ENDGAME: '+1 VP per development in your tableau',
    GALACTIC_DEMAND: '+$2 for each good you Trade this turn from a Novelty (blue) world.',
    GALACTIC_EXCHANGE: 'When completing each world, put one or two of the settlers used into your cup instead of your Citizenry.',
    GALACTIC_EXCHANGE_ENDGAME: '+1 VP for each different color of dice you own.',
    GALACTIC_FEDERATION: 'When completing each development (after this one), put one or two of the developers used into your cup instead of your Citizenry.',
    GALACTIC_FEDERATION_ENDGAME: 'Add one-third of your total base development cost (rounded up).',
    GALACTIC_INFLUENCE: 'You may Reassign one worker to any phase.',
    GALACTIC_INVESTORS: '+$2 at the end of this phase, including the phase in which you complete this.',
    GALACTIC_MANDATE: 'When using Dictate, you may Reassign up to three (not one) other workers to any phase(s).',
    GALACTIC_RECYCLING: '+$1 after completing each development or world, not including this one.',
    GALACTIC_RELIGION: '+$1 for each Novelty (blue) die in your Citizenry at the end of this phase.',
    GALACTIC_RENAISSANCE: '+1 VP chip for each good you Consume this phase.',
    GALACTIC_RENAISSANCE_ENDGAME: '+1, 2, 3, 4, ... VP for 1, 3, 6, 10, ... VP in chips.',
    GALACTIC_RESERVES: 'Each of your worlds can hold an extra good (each good still requires 1 shipper).',
    GALACTIC_RESERVES_ENDGAME: '+1 VP per good (at the end of the game).',
    GALACTIC_SALON: 'Gain 1 VP chip.',
    GENETICS_LAB: '+$2 for each good represented by a Genes (green) die at the end of this phase.',
    HOMEWORLD_PATRIOTISM: 'You may Reassign one or two Home (white) workers to the phase you select.',
    HYDROPONICS_GUILD: 'You may Reassign one Novelty (blue) or Genes (green) worker to any phase.',
    IMPROVED_RECONNAISSANCE: 'You may place new tiles on top of your stacks when Scouting.',
    INVESTMENT_CREDITS: 'All developments (after this one) require one fewer developer to complete (but not fewer than one).',
    ISOLATION_POLICY: 'You may Reassign one or two explorers to any phase(s).',
    JUMPDRIVE_RESEARCH: '+1$ for each good you Trade this turn from a Rare Elements (brown) world.',
    LOCAL_SUBSIDIES: 'You may Reassign one Home (white) worker to any phase.',
    MAD_SCIENTISTS: 'If you have the most Novelty (blue) worlds in tableau you may Reassign one or two workers to any phase(s). (If tied, you may Reassign one.)',
    MAJOR_RESEARCH_LABS: 'Act as if you have an extra Home (white) explorer for use this phase.',
    MERCHANT_GUILD: '+$2 at the end of this phase.',
    MINING_INDUSTRY: '+$1 for each good you Consume (not Trade) this phase from a Rare Elements (brown) world.',
    MINING_LEAGUE: '+$1 for each good on a Rare Elements (brown) world at the end of this phase.',
    MINING_LEAGUE_ENDGAME: '+2 VP per Rare Elements (brown) world in your tableau.',
    MINOR_RESEARCH_LABS: '+1 VP chip for each good you Consume from a Genes (green) or Alien Technology (yellow) world this phase.',
    NANOTECHNOLOGY: 'You may Reassign one or two workers to any phase(s).',
    NEW_ECONOMY: '+$2 for each good you Consume this phase.',
    NEW_ECONOMY_ENDGAME: '+1 VP per development without a Reassign power (including this one).',
    NEW_GALACTIC_ORDER: 'When completing each world, put all of the Military (red) settlers used into your cup instead of your Citizenry.',
    NEW_GALACTIC_ORDER_ENDGAME: '+2 VP per 3 Military (red) dice you own (rounded up).',
    OPERATIONS_AFFINITY: 'You may Reassign one worker to become an explorer or a producer.',
    ORGANIC_SHIPYARDS: 'Act as if you have an extra Home (white) shipper and an extra Genes (green) shipper for use this phase.',
    PROPAGANDA_CAMPAIGN: 'You may Reassign one or two workers to the phase you select.',
    PUBLIC_WORKS: '+$1 after completing each development (other than this one).',
    REPLICANT_ROBOTS: 'All worlds require one fewer settler to complete (but not fewer than one).',
    ROBOT_SURVEYORS: '+$2 at the end of this phase.',
    SHIPPING_AFFINITY: 'You may Reassign one worker to become a shipper.',
    SPACE_DOCKS: 'Act as if you have one more Home (white) shipper for use this phase.',
    SPACE_MERCENARIES: 'You may Reassign one Military (red) or Rare Elements (brown) worker to any phase.',
    SPACE_PIRACY: '+$1 for every two Military (red) dice (rounded up) in your Citizenry at the end of the phase.',
    SPACE_REFINERIES: '+1 VP chip for each good you Consume from a Rare Elements (brown) world this phase.',
    SPACE_TOURISM: '+$1. If you have the highest-cost world(s) across all tableaus, +$1 extra.',
    SYSTEM_DIVERSIFICATION: 'You may Reassign one or two non-Home (non-white) workers to any phase(s).',
    TECHNOLOGY_AFFINITY: 'You may Reassign one worker to become a developer.',
    TECHNOLOGY_UNIONS: '+$1 if you have the most developments in tableau. (If tied for most you do not get anything.)',
    TERRAFORMING_ROBOTS: '$1 after completing any world. If completing a Rare Elements (brown) world, +$1 extra.',
    TRADE_LEVIES: '+$1 for each good you Consume this phase.'
};

const factionTiles: Array<Tiles> = [
    {
        tileId: 1,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 0,
                name: 'Space Piracy',
                ship: developmentPowers.SPACE_PIRACY,
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
                ship: developmentPowers.ALIEN_ARCHAEOLOGY
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
                produce: developmentPowers.CONSUMER_MARKETS
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
                explore: developmentPowers.IMPROVED_RECONNAISSANCE
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
                produce: developmentPowers.GENETICS_LAB
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
                develop: developmentPowers.GALACTIC_RELIGION
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
                develop: developmentPowers.BIOLOGICAL_ADAPTATION
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
                ship: developmentPowers.MINING_INDUSTRY
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

const homeWorldTiles: Array<Tiles> = [
    {
        tileId: 1,
        tiles: [
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 2,
                name: 'New Sparta',
                bonus: bonuses.TWO_RED_DICE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 2,
        tiles: [
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 0,
                name: 'Doomed World',
                bonus: bonuses.EIGHT_CREDITS
            }
        ]
    },
    {
        tileId: 3,
        tiles: [
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 1,
                name: 'Alpha Centauri',
                bonus: bonuses.ONE_BROWN_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 4,
        tiles: [
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 2,
                name: 'Earth\'s Lost Colony',
                bonus: bonuses.ONE_BLUE_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 5,
        tiles: [
            {
                tileType: tileTypes.GREEN_WORLD,
                points: 0,
                name: 'Ancient Race',
                bonus: bonuses.ONE_GREEN_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 6,
        tiles: [
            {
                tileType: tileTypes.YELLOW_WORLD,
                points: 1,
                name: 'Damaged Alien Factory',
                bonus: bonuses.ONE_YELLOW_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 7,
        tiles: [
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 3,
                name: 'Old Earth',
                bonus: bonuses.ONE_PURPLE_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 8,
        tiles: [
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 2,
                name: 'Separatist Colony',
                bonus: bonuses.ONE_RED_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 9,
        tiles: [
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 2,
                name: 'Epsilon Eridani',
                bonus: bonuses.ONE_BLUE_DIE_AND_ONE_RED_DIE_TO_CITIZENRY
            }
        ]
    }
];

const gameTiles: Array<Tiles> = [
    {
        tileId: 1,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 1,
                name: 'Advanced Logistics',
                explore: developmentPowers.ADVANCED_LOGISTICS
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
                explore: developmentPowers.ALIEN_RESEARCH_SHIP
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
                explore: developmentPowers.ALIEN_RESEARCH_TEAM
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
                settle: developmentPowers.ALIEN_UPLIFT_BLUEPRINTS
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
                assignment: developmentPowers.BACKUP_PLANNING
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
                assignment: developmentPowers.COLONIAL_AFFINITY
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
                assignment: developmentPowers.DIVERSIFICATION
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
                assignment: developmentPowers.EXECUTIVE_POWER
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
                ship: developmentPowers.EXPORT_DUTIES
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
                ship: developmentPowers.FREE_TRADE_ASSOCIATION,
                endGame: developmentPowers.FREE_TRADE_ASSOCIATION_ENDGAME
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
        tileId: 12,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Free Trade Zone',
                settle: developmentPowers.FREE_TRADE_ZONE
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 3,
                name: 'Galactic Resort',
                bonus: bonuses.ONE_BLUE_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 13,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 6,
                name: 'Galactic Bankers',
                ship: developmentPowers.GALACTIC_BANKERS,
                endGame: developmentPowers.GALACTIC_BANKERS_ENDGAME
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 1,
                name: 'Former Penal Colony',
                bonus: bonuses.REMOVE_ONE_DIE_AND_ONE_RED_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 14,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Galactic Demand',
                ship: developmentPowers.GALACTIC_DEMAND
            },
            {
                tileType: tileTypes.YELLOW_WORLD,
                points: 4,
                name: 'Deserted Alien Outpost',
                bonus: bonuses.ONE_YELLOW_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 15,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 6,
                name: 'Galactic Exchange',
                settle: developmentPowers.GALACTIC_EXCHANGE,
                endGame: developmentPowers.GALACTIC_EXCHANGE_ENDGAME
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 1,
                name: 'Star Nomad Lair',
                bonus: bonuses.ONE_BLUE_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 16,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 6,
                name: 'Galactic Federation',
                develop: developmentPowers.GALACTIC_FEDERATION,
                endGame: developmentPowers.GALACTIC_FEDERATION_ENDGAME
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 1,
                name: 'Artist Colony',
                bonus: bonuses.ONE_BLUE_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 17,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Galactic Influence',
                assignment: developmentPowers.GALACTIC_INFLUENCE
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 3,
                name: 'Blaster Gem Mines',
                bonus: bonuses.ONE_BROWN_DIE_AND_ONE_RED_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 18,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 5,
                name: 'Galactic Investors',
                develop: developmentPowers.GALACTIC_INVESTORS
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 2,
                name: 'New Vinland',
                bonus: bonuses.ONE_BLUE_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 19,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Galactic Mandate',
                assignment: developmentPowers.GALACTIC_MANDATE
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 3,
                name: 'Mining World',
                bonus: bonuses.ONE_BROWN_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 20,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Galactic Recycling',
                develop: developmentPowers.GALACTIC_RECYCLING,
                settle: developmentPowers.GALACTIC_RECYCLING
            },
            {
                tileType: tileTypes.YELLOW_WORLD,
                points: 4,
                name: 'Alien Robot Scout Ship',
                bonus: bonuses.ONE_CREDIT_AND_ONE_YELLOW_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 21,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 6,
                name: 'Galactic Renaissance',
                ship: developmentPowers.GALACTIC_RENAISSANCE,
                endGame: developmentPowers.GALACTIC_RENAISSANCE_ENDGAME
            },
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 1,
                name: 'Fifth Column',
                bonus: bonuses.ONE_RED_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 22,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 6,
                name: 'Galactic Reserves',
                produce: developmentPowers.GALACTIC_RESERVES,
                endGame: developmentPowers.GALACTIC_RESERVES_ENDGAME
            },
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 2,
                name: 'Rebel Hideout',
                bonus: bonuses.TWO_RED_DICE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 23,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 4,
                name: 'Galactic Salon',
                ship: developmentPowers.GALACTIC_SALON
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 2,
                name: 'Runaway Robots',
                bonus: bonuses.ONE_RED_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 24,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Homeworld Patriotism',
                assignment: developmentPowers.HOMEWORLD_PATRIOTISM
            },
            {
                tileType: tileTypes.GREEN_WORLD,
                points: 3,
                name: 'Plague World',
                bonus: bonuses.ONE_GREEN_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 25,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 1,
                name: 'Hydroponics Guild',
                assignment: developmentPowers.HYDROPONICS_GUILD
            },
            {
                tileType: tileTypes.YELLOW_WORLD,
                points: 6,
                name: 'Alien Sentinels',
                bonus: bonuses.THREE_CREDITS_AND_ONE_YELLOW_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 26,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 4,
                name: 'Information Tech',
                bonus: bonuses.INFORMATION_TECH
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 2,
                name: 'Pirate World',
                bonus: bonuses.ONE_RED_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 27,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 4,
                name: 'Investment Credits',
                develop: developmentPowers.INVESTMENT_CREDITS
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 2,
                name: 'Galactic Survey Headquarters',
                bonus: bonuses.ONE_BLUE_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 28,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Isolation Policy',
                assignment: developmentPowers.ISOLATION_POLICY
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 3,
                name: 'Planetary Nebula',
                bonus: bonuses.ONE_BROWN_DIE_TO_WORLD
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
                ship: developmentPowers.JUMPDRIVE_RESEARCH
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
                assignment: developmentPowers.LOCAL_SUBSIDIES
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
        tileId: 31,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Mad Scientists',
                assignment: developmentPowers.MAD_SCIENTISTS
            },
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 3,
                name: 'Gateway Station',
                bonus: bonuses.ONE_PURPLE_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 32,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Major Research Labs',
                explore: developmentPowers.MAJOR_RESEARCH_LABS
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 3,
                name: 'Galactic Fuel Depot',
                bonus: bonuses.ONE_BROWN_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 33,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Merchant Guild',
                produce: developmentPowers.MERCHANT_GUILD
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 3,
                name: 'Jumpdrive Fuel Refinery',
                bonus: bonuses.ONE_BROWN_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 34,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 6,
                name: 'Mining League',
                produce: developmentPowers.MINING_LEAGUE,
                endGame: developmentPowers.MINING_LEAGUE_ENDGAME
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 1,
                name: 'New Survivalists',
                bonus: bonuses.ONE_BLUE_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 35,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Minor Research Labs',
                ship: developmentPowers.MINOR_RESEARCH_LABS
            },
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 4,
                name: 'Transport Hub',
                bonus: bonuses.ONE_CREDIT_AND_ONE_PURPLE_DIE_TO_CITIZENRY
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
                assignment: developmentPowers.NANOTECHNOLOGY
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 2,
                name: 'Radioactive World',
                bonus: bonuses.ONE_BROWN_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 37,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 6,
                name: 'New Economy',
                ship: developmentPowers.NEW_ECONOMY,
                endGame: developmentPowers.NEW_ECONOMY_ENDGAME
            },
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 1,
                name: 'High-Gravity World',
                bonus: bonuses.ONE_RED_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 38,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 6,
                name: 'New Galactic Order',
                settle: developmentPowers.NEW_GALACTIC_ORDER,
                endGame: developmentPowers.NEW_GALACTIC_ORDER_ENDGAME
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 1,
                name: 'Secluded World',
                bonus: bonuses.ONE_BLUE_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 39,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Operation Affinity',
                assignment: developmentPowers.OPERATIONS_AFFINITY
            },
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 4,
                name: 'Tourist World',
                bonus: bonuses.ONE_CREDIT_AND_ONE_PURPLE_DIE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 40,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 5,
                name: 'Organic Shipyards',
                ship: developmentPowers.ORGANIC_SHIPYARDS
            },
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 2,
                name: 'Outlaw World',
                bonus: bonuses.ONE_RED_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 41,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 4,
                name: 'Propaganda Campaign',
                assignment: developmentPowers.PROPAGANDA_CAMPAIGN
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 2,
                name: 'Ore-Rich World',
                bonus: bonuses.ONE_BROWN_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 42,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 1,
                name: 'Public Works',
                develop: developmentPowers.PUBLIC_WORKS
            },
            {
                tileType: tileTypes.YELLOW_WORLD,
                points: 5,
                name: 'Lost Alien Warship',
                bonus: bonuses.TWO_CREDITS_AND_ONE_YELLOW_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 43,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 4,
                name: 'Replicant Robots',
                settle: developmentPowers.REPLICANT_ROBOTS
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 2,
                name: 'Space Port',
                bonus: bonuses.ONE_BLUE_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 44,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 5,
                name: 'Robot Surveyors',
                settle: developmentPowers.ROBOT_SURVEYORS
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 2,
                name: 'Asteroid Belt',
                bonus: bonuses.ONE_BROWN_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 45,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Shipping Affinity',
                assignment: developmentPowers.SHIPPING_AFFINITY
            },
            {
                tileType: tileTypes.GREEN_WORLD,
                points: 4,
                name: 'Deep Space Symbionts, Ltd.',
                bonus: bonuses.ONE_CREDIT_AND_ONE_GREEN_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 46,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Space Docks',
                ship: developmentPowers.SPACE_DOCKS
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 4,
                name: 'Armaments World',
                bonus: bonuses.ONE_CREDIT_AND_ONE_BROWN_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 47,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Space Marines',
                bonus: bonuses.SPACE_MARINES
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 3,
                name: 'Prosperous World',
                bonus: bonuses.ONE_BLUE_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 48,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 1,
                name: 'Space Mercenaries',
                assignment: developmentPowers.SPACE_MERCENARIES
            },
            {
                tileType: tileTypes.YELLOW_WORLD,
                points: 6,
                name: 'Lost Alien Battle Fleet',
                bonus: bonuses.THREE_CREDITS_AND_ONE_YELLOW_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 49,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Space Refineries',
                ship: developmentPowers.SPACE_REFINERIES
            },
            {
                tileType: tileTypes.GREEN_WORLD,
                points: 3,
                name: 'Uplift Overseers',
                bonus: bonuses.ONE_GREEN_DIE_TO_CUP
            }
        ]
    },
    {
        tileId: 50,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Space Tourism',
                ship: developmentPowers.SPACE_TOURISM
            },
            {
                tileType: tileTypes.BLUE_WORLD,
                points: 3,
                name: 'Universal Exports',
                bonus: bonuses.ONE_BLUE_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 51,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 6,
                name: 'System Diversification',
                assignment: developmentPowers.SYSTEM_DIVERSIFICATION
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 2,
                name: 'Rebel Miners',
                bonus: bonuses.REBEL_MINERS
            }
        ]
    },
    {
        tileId: 52,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 2,
                name: 'Technology Affinity',
                assignment: developmentPowers.TECHNOLOGY_AFFINITY
            },
            {
                tileType: tileTypes.GREEN_WORLD,
                points: 4,
                name: 'Jungle World',
                bonus: bonuses.ONE_GREEN_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 53,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 1,
                name: 'Technology Unions',
                explore: developmentPowers.TECHNOLOGY_UNIONS,
                produce: developmentPowers.TECHNOLOGY_UNIONS
            },
            {
                tileType: tileTypes.YELLOW_WORLD,
                points: 5,
                name: 'Deserted Alien Colony',
                bonus: bonuses.ONE_CREDIT_AND_ONE_YELLOW_DIE_TO_WORLD
            }
        ]
    },
    {
        tileId: 54,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 1,
                name: 'Terraforming Robots',
                settle: developmentPowers.TERRAFORMING_ROBOTS
            },
            {
                tileType: tileTypes.GRAY_WORLD,
                points: 5,
                name: 'Terraformed World',
                bonus: bonuses.TWO_CREDITS_AND_ONE_PURPLE_DICE_TO_CITIZENRY
            }
        ]
    },
    {
        tileId: 55,
        tiles: [
            {
                tileType: tileTypes.DEVELOPMENT,
                points: 3,
                name: 'Trade Levies',
                ship: developmentPowers.TRADE_LEVIES
            },
            {
                tileType: tileTypes.BROWN_WORLD,
                points: 3,
                name: 'Comet Zone',
                bonus: bonuses.ONE_BROWN_DIE_TO_WORLD
            }
        ]
    }
];

const initialGameState: gameState = {
    factionTiles,
    homeWorldTiles,
    gameTiles,
    players: [],
    victoryPointPool: 0
};

export const initialState: state = {
    game: { ...initialGameState },
    startFormVisibility: true,
    assignmentPopupVisibility: false,
    startRoundVisibility: true
}
