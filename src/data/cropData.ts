import { Crop } from '../types';

export const cropData: Crop[] = [
  {
    id: 'rice',
    name: 'Rice',
    scientificName: 'Oryza sativa',
    imageUrl: 'https://images.unsplash.com/photo-1536054326497-8a72dd7c8946?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'A staple food in India, rice is grown in paddy fields with standing water.',
    growingPeriod: 120,
    phases: [
      {
        name: 'Germination',
        description: 'Seeds begin to sprout',
        startDay: 0,
        endDay: 10,
        optimalTemperature: {
          min: 20,
          max: 35
        },
        optimalHumidity: {
          min: 80,
          max: 100
        },
        tasks: ['Prepare nursery beds', 'Soak seeds before sowing']
      },
      {
        name: 'Seedling',
        description: 'Young plants develop initial leaves',
        startDay: 11,
        endDay: 30,
        optimalTemperature: {
          min: 20,
          max: 30
        },
        optimalHumidity: {
          min: 75,
          max: 90
        },
        tasks: ['Maintain water level', 'Prepare main field for transplanting']
      },
      {
        name: 'Vegetative',
        description: 'Plant grows taller and produces tillers',
        startDay: 31,
        endDay: 60,
        optimalTemperature: {
          min: 20,
          max: 30
        },
        optimalHumidity: {
          min: 70,
          max: 85
        },
        tasks: ['Apply nitrogen fertilizer', 'Weed control', 'Monitor for pests']
      },
      {
        name: 'Reproductive',
        description: 'Flowering and panicle development',
        startDay: 61,
        endDay: 90,
        optimalTemperature: {
          min: 22,
          max: 28
        },
        optimalHumidity: {
          min: 70,
          max: 80
        },
        tasks: ['Maintain critical water level', 'Apply potassium fertilizer']
      },
      {
        name: 'Ripening',
        description: 'Grain filling and maturation',
        startDay: 91,
        endDay: 120,
        optimalTemperature: {
          min: 20,
          max: 25
        },
        optimalHumidity: {
          min: 60,
          max: 70
        },
        tasks: ['Drain field', 'Prepare for harvest']
      }
    ],
    idealTemperature: {
      min: 20,
      max: 30
    },
    idealHumidity: {
      min: 70,
      max: 90
    },
    waterRequirements: 'high',
    soilType: ['Clay', 'Clay loam', 'Silt loam'],
    seasonality: {
      bestPlantingMonths: [6, 7], // June-July (Kharif)
      bestHarvestingMonths: [10, 11] // October-November
    },
    commonPests: ['Rice stem borer', 'Brown planthopper', 'Gall midge'],
    commonDiseases: ['Rice blast', 'Bacterial leaf blight', 'Sheath blight']
  },
  {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    imageUrl: 'https://images.unsplash.com/photo-1631444930786-d19d996430f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'A major cereal crop in India, grown primarily in the winter season.',
    growingPeriod: 135,
    phases: [
      {
        name: 'Germination',
        description: 'Seeds sprout and establish roots',
        startDay: 0,
        endDay: 7,
        optimalTemperature: {
          min: 12,
          max: 25
        },
        optimalHumidity: {
          min: 60,
          max: 70
        },
        tasks: ['Ensure proper seed depth', 'Light irrigation']
      },
      {
        name: 'Seedling',
        description: 'Early leaf development',
        startDay: 8,
        endDay: 20,
        optimalTemperature: {
          min: 15,
          max: 25
        },
        optimalHumidity: {
          min: 60,
          max: 70
        },
        tasks: ['Monitor for early pests', 'First fertilization']
      },
      {
        name: 'Tillering',
        description: 'Multiple shoots emerge from main shoot',
        startDay: 21,
        endDay: 50,
        optimalTemperature: {
          min: 15,
          max: 22
        },
        optimalHumidity: {
          min: 60,
          max: 70
        },
        tasks: ['Apply nitrogen', 'Weed control', 'Second irrigation']
      },
      {
        name: 'Stem Extension',
        description: 'Plant grows taller',
        startDay: 51,
        endDay: 80,
        optimalTemperature: {
          min: 15,
          max: 20
        },
        optimalHumidity: {
          min: 60,
          max: 70
        },
        tasks: ['Third irrigation', 'Disease monitoring']
      },
      {
        name: 'Heading & Flowering',
        description: 'Spike emerges and pollination occurs',
        startDay: 81,
        endDay: 100,
        optimalTemperature: {
          min: 18,
          max: 24
        },
        optimalHumidity: {
          min: 60,
          max: 70
        },
        tasks: ['Critical irrigation', 'Avoid waterlogging']
      },
      {
        name: 'Grain Filling',
        description: 'Grain develops and matures',
        startDay: 101,
        endDay: 135,
        optimalTemperature: {
          min: 20,
          max: 25
        },
        optimalHumidity: {
          min: 50,
          max: 60
        },
        tasks: ['Final irrigation', 'Prepare for harvest']
      }
    ],
    idealTemperature: {
      min: 15,
      max: 24
    },
    idealHumidity: {
      min: 55,
      max: 70
    },
    waterRequirements: 'medium',
    soilType: ['Loam', 'Clay loam', 'Silt loam'],
    seasonality: {
      bestPlantingMonths: [10, 11], // October-November (Rabi)
      bestHarvestingMonths: [3, 4] // March-April
    },
    commonPests: ['Aphids', 'Termites', 'Army worm'],
    commonDiseases: ['Rust', 'Powdery mildew', 'Loose smut']
  },
  {
    id: 'cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    imageUrl: 'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'An important cash crop that provides fiber for the textile industry.',
    growingPeriod: 160,
    phases: [
      {
        name: 'Germination',
        description: 'Seeds sprout and emergence',
        startDay: 0,
        endDay: 10,
        optimalTemperature: {
          min: 15,
          max: 30
        },
        optimalHumidity: {
          min: 60,
          max: 70
        },
        tasks: ['Ensure proper moisture', 'Seed treatment']
      },
      {
        name: 'Seedling',
        description: 'Development of first true leaves',
        startDay: 11,
        endDay: 40,
        optimalTemperature: {
          min: 20,
          max: 30
        },
        optimalHumidity: {
          min: 60,
          max: 70
        },
        tasks: ['Thinning', 'First weeding', 'Initial fertilization']
      },
      {
        name: 'Vegetative',
        description: 'Rapid growth of leaves and branches',
        startDay: 41,
        endDay: 80,
        optimalTemperature: {
          min: 25,
          max: 35
        },
        optimalHumidity: {
          min: 55,
          max: 70
        },
        tasks: ['Nitrogen application', 'Regular weeding', 'Pest monitoring']
      },
      {
        name: 'Flowering & Boll Formation',
        description: 'Flowers appear and bolls begin to form',
        startDay: 81,
        endDay: 120,
        optimalTemperature: {
          min: 25,
          max: 35
        },
        optimalHumidity: {
          min: 60,
          max: 70
        },
        tasks: ['Critical irrigation', 'Potassium application', 'Bollworm control']
      },
      {
        name: 'Boll Development',
        description: 'Bolls grow and mature',
        startDay: 121,
        endDay: 160,
        optimalTemperature: {
          min: 25,
          max: 30
        },
        optimalHumidity: {
          min: 50,
          max: 60
        },
        tasks: ['Final irrigation', 'Prepare for harvest', 'Defoliation if needed']
      }
    ],
    idealTemperature: {
      min: 25,
      max: 35
    },
    idealHumidity: {
      min: 55,
      max: 70
    },
    waterRequirements: 'medium',
    soilType: ['Loam', 'Black soil', 'Sandy loam'],
    seasonality: {
      bestPlantingMonths: [4, 5, 6], // April-June
      bestHarvestingMonths: [10, 11, 12] // October-December
    },
    commonPests: ['Bollworm', 'Whitefly', 'Pink bollworm'],
    commonDiseases: ['Bacterial blight', 'Root rot', 'Leaf curl virus']
  },
  {
    id: 'chickpea',
    name: 'Chickpea',
    scientificName: 'Cicer arietinum',
    imageUrl: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'An important pulse crop in India, also known as Bengal gram or chana.',
    growingPeriod: 110,
    phases: [
      {
        name: 'Germination',
        description: 'Seeds sprout and emergence',
        startDay: 0,
        endDay: 7,
        optimalTemperature: {
          min: 15,
          max: 25
        },
        optimalHumidity: {
          min: 60,
          max: 70
        },
        tasks: ['Seed treatment', 'Light irrigation if needed']
      },
      {
        name: 'Vegetative',
        description: 'Plant develops leaves and branches',
        startDay: 8,
        endDay: 45,
        optimalTemperature: {
          min: 20,
          max: 25
        },
        optimalHumidity: {
          min: 50,
          max: 60
        },
        tasks: ['Weed control', 'Monitor for pod borer']
      },
      {
        name: 'Flowering',
        description: 'Development of flowers',
        startDay: 46,
        endDay: 65,
        optimalTemperature: {
          min: 18,
          max: 25
        },
        optimalHumidity: {
          min: 45,
          max: 55
        },
        tasks: ['Light irrigation if needed', 'Pod borer control']
      },
      {
        name: 'Pod Development',
        description: 'Pods form and fill',
        startDay: 66,
        endDay: 90,
        optimalTemperature: {
          min: 15,
          max: 22
        },
        optimalHumidity: {
          min: 45,
          max: 55
        },
        tasks: ['Avoid excess moisture', 'Disease monitoring']
      },
      {
        name: 'Maturation',
        description: 'Pods dry and mature',
        startDay: 91,
        endDay: 110,
        optimalTemperature: {
          min: 15,
          max: 20
        },
        optimalHumidity: {
          min: 40,
          max: 50
        },
        tasks: ['Stop irrigation', 'Prepare for harvest']
      }
    ],
    idealTemperature: {
      min: 15,
      max: 25
    },
    idealHumidity: {
      min: 45,
      max: 60
    },
    waterRequirements: 'low',
    soilType: ['Sandy loam', 'Loam', 'Black soil'],
    seasonality: {
      bestPlantingMonths: [10, 11], // October-November (Rabi)
      bestHarvestingMonths: [2, 3] // February-March
    },
    commonPests: ['Pod borer', 'Aphids', 'Cutworm'],
    commonDiseases: ['Ascochyta blight', 'Fusarium wilt', 'Root rot']
  }
];
