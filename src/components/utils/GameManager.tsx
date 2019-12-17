import { bonuses, developmentPowers, tileTypes } from '../../enums';
import { Tiles } from '../ConstructionZone';
import Chance from 'chance';

class GameManager {
    factionTiles: Array<Tiles>;
    homeWorldTiles: Array<Tiles>;
    gameTiles: Array<Tiles>;
    chance = new Chance();
    nextFactionTileIds: Array<number> = [];
    nextHomeWorldTileIds: Array<number> = [];
    nextGameTileIds: Array<number> = [];

    constructor() {
        this.factionTiles = [
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

        this.homeWorldTiles = [
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

        this.gameTiles = [
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
    };

    popRandomFactionTile(): Tiles {
        let result: Tiles;
        let idToPick: number | undefined = this.nextFactionTileIds.pop();
        if (idToPick) {
            result = this.factionTiles.filter((tile: Tiles) => tile.tileId === idToPick)[0];
        } else {
            result = this.chance.pickone(this.factionTiles);
        };
        this.factionTiles = this.factionTiles.filter((tile: Tiles) => tile !== result);
        return result;
    };

    popRandomHomeWorldTile(): Tiles {
        let result: Tiles;
        let idToPick: number | undefined = this.nextHomeWorldTileIds.pop();
        if (idToPick) {
            result = this.homeWorldTiles.filter((tile: Tiles) => tile.tileId === idToPick)[0];
        } else {
            result = this.chance.pickone(this.homeWorldTiles);
        };
        this.homeWorldTiles = this.homeWorldTiles.filter((tile: Tiles) => tile !== result);
        return result;
    };

    popRandomGameTile(): Tiles {
        let result: Tiles;
        let idToPick: number | undefined = this.nextGameTileIds.pop();
        if (idToPick) {
            result = this.gameTiles.filter((tile: Tiles) => tile.tileId === idToPick)[0];
        } else {
            result = this.chance.pickone(this.gameTiles);
        };
        this.gameTiles = this.gameTiles.filter((tile: Tiles) => tile !== result);
        return result;
    };

    chooseNextFactionTiles(ids: Array<number>): void {
        this.nextFactionTileIds = this.nextFactionTileIds.concat(ids);
    };

    chooseNextHomeWorldTiles(ids: Array<number>): void {
        this.nextFactionTileIds = this.nextHomeWorldTileIds.concat(ids);
    };

    chooseNextGameTiles(ids: Array<number>): void {
        this.nextFactionTileIds = this.nextGameTileIds.concat(ids);
    };
};

export default GameManager;