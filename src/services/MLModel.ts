// This file simulates a trained ML model for crop health analysis
// In a real application, this would be a properly trained model using TensorFlow.js or a similar library
// or would make API calls to a backend ML service

type ModelInputs = {
  temperature: number | null;
  humidity: number | null;
  nitrogen: number | null;
  phosphorus: number | null;
  potassium: number | null;
};

type ModelPrediction = {
  status: 'healthy' | 'unhealthy' | null;
  disease: string | null;
  confidence: number | null;
  recommendations: string[] | null;
  detectedIssues: DetectedIssue[];
};

type DetectedIssue = {
  name: string;
  severity: 'low' | 'medium' | 'high';
  confidenceScore: number;
  contributionWeight: number;
};

export class CropHealthModel {
  // Simulated model parameters (these would be learned during training)
  private temperatureOptimalRange = { min: 18, max: 32 };
  private humidityOptimalRange = { min: 40, max: 80 };
  private nitrogenOptimalRange = { min: 40, max: 80 };
  private phosphorusOptimalRange = { min: 30, max: 70 };
  private potassiumOptimalRange = { min: 35, max: 75 };
  
  // Feature weights (simulating importance of each parameter as learned by model)
  private featureWeights = {
    temperature: 0.25,
    humidity: 0.20,
    nitrogen: 0.20,
    phosphorus: 0.15,
    potassium: 0.20
  };

  constructor() {
    console.log("CropHealth ML Model initialized");
  }

  // Main prediction function
  public predict(inputs: ModelInputs): ModelPrediction {
    // Validate inputs and use defaults if necessary
    const safeInputs = this.preprocessInputs(inputs);
    
    // Detect potential issues
    const detectedIssues = this.detectIssues(safeInputs);
    
    // Determine overall health status
    const { status, disease, confidence } = this.determineOverallStatus(detectedIssues);
    
    // Generate recommendations based on detected issues
    const recommendations = this.generateRecommendations(detectedIssues);
    
    return {
      status,
      disease,
      confidence,
      recommendations,
      detectedIssues
    };
  }

  private preprocessInputs(inputs: ModelInputs): Required<ModelInputs> {
    // Clean inputs and provide defaults if values are missing
    return {
      temperature: inputs.temperature ?? 25, // Default temperature
      humidity: inputs.humidity ?? 60,       // Default humidity
      nitrogen: inputs.nitrogen ?? 50,       // Default N value
      phosphorus: inputs.phosphorus ?? 40,   // Default P value
      potassium: inputs.potassium ?? 45      // Default K value
    };
  }

  private detectIssues(inputs: Required<ModelInputs>): DetectedIssue[] {
    const issues: DetectedIssue[] = [];
    
    // Check temperature conditions
    if (inputs.temperature > this.temperatureOptimalRange.max + 5) {
      const severity = inputs.temperature > this.temperatureOptimalRange.max + 10 ? 'high' : 'medium';
      const confidenceScore = this.calculateConfidenceScore(inputs.temperature, this.temperatureOptimalRange.max, 15);
      
      issues.push({
        name: 'Heat Stress',
        severity,
        confidenceScore,
        contributionWeight: this.featureWeights.temperature
      });
    } else if (inputs.temperature < this.temperatureOptimalRange.min - 5) {
      const severity = inputs.temperature < this.temperatureOptimalRange.min - 10 ? 'high' : 'medium';
      const confidenceScore = this.calculateConfidenceScore(this.temperatureOptimalRange.min, inputs.temperature, 15);
      
      issues.push({
        name: 'Cold Stress',
        severity,
        confidenceScore, 
        contributionWeight: this.featureWeights.temperature
      });
    }
    
    // Check humidity conditions
    if (inputs.humidity > this.humidityOptimalRange.max + 10) {
      const severity = inputs.humidity > this.humidityOptimalRange.max + 20 ? 'high' : 'medium';
      const confidenceScore = this.calculateConfidenceScore(inputs.humidity, this.humidityOptimalRange.max, 30);
      
      issues.push({
        name: 'Fungal Infection Risk',
        severity,
        confidenceScore,
        contributionWeight: this.featureWeights.humidity
      });
    } else if (inputs.humidity < this.humidityOptimalRange.min - 10) {
      const severity = inputs.humidity < this.humidityOptimalRange.min - 20 ? 'high' : 'medium';
      const confidenceScore = this.calculateConfidenceScore(this.humidityOptimalRange.min, inputs.humidity, 30);
      
      issues.push({
        name: 'Drought Stress',
        severity,
        confidenceScore,
        contributionWeight: this.featureWeights.humidity
      });
    }
    
    // Check nitrogen levels
    if (inputs.nitrogen < this.nitrogenOptimalRange.min) {
      const severity = inputs.nitrogen < this.nitrogenOptimalRange.min - 15 ? 'high' : 
                      inputs.nitrogen < this.nitrogenOptimalRange.min - 5 ? 'medium' : 'low';
      const confidenceScore = this.calculateConfidenceScore(this.nitrogenOptimalRange.min, inputs.nitrogen, 30);
      
      issues.push({
        name: 'Nitrogen Deficiency',
        severity,
        confidenceScore,
        contributionWeight: this.featureWeights.nitrogen
      });
    } else if (inputs.nitrogen > this.nitrogenOptimalRange.max + 15) {
      const severity = inputs.nitrogen > this.nitrogenOptimalRange.max + 30 ? 'high' : 'medium';
      const confidenceScore = this.calculateConfidenceScore(inputs.nitrogen, this.nitrogenOptimalRange.max, 50);
      
      issues.push({
        name: 'Nitrogen Toxicity',
        severity,
        confidenceScore,
        contributionWeight: this.featureWeights.nitrogen
      });
    }
    
    // Check phosphorus levels
    if (inputs.phosphorus < this.phosphorusOptimalRange.min) {
      const severity = inputs.phosphorus < this.phosphorusOptimalRange.min - 15 ? 'high' : 
                       inputs.phosphorus < this.phosphorusOptimalRange.min - 5 ? 'medium' : 'low';
      const confidenceScore = this.calculateConfidenceScore(this.phosphorusOptimalRange.min, inputs.phosphorus, 25);
      
      issues.push({
        name: 'Phosphorus Deficiency',
        severity,
        confidenceScore,
        contributionWeight: this.featureWeights.phosphorus
      });
    }
    
    // Check potassium levels
    if (inputs.potassium < this.potassiumOptimalRange.min) {
      const severity = inputs.potassium < this.potassiumOptimalRange.min - 15 ? 'high' : 
                       inputs.potassium < this.potassiumOptimalRange.min - 5 ? 'medium' : 'low';
      const confidenceScore = this.calculateConfidenceScore(this.potassiumOptimalRange.min, inputs.potassium, 30);
      
      issues.push({
        name: 'Potassium Deficiency',
        severity,
        confidenceScore,
        contributionWeight: this.featureWeights.potassium
      });
    }
    
    // Check for combination effects (simulating model's ability to detect complex patterns)
    if (inputs.humidity > 80 && inputs.temperature > 30) {
      const confidenceScore = 0.8 + (Math.min(inputs.humidity - 80, 20) / 100);
      
      issues.push({
        name: 'High Humidity Heat Stress',
        severity: 'high',
        confidenceScore,
        contributionWeight: (this.featureWeights.temperature + this.featureWeights.humidity) / 2
      });
    }
    
    if (inputs.nitrogen < 35 && inputs.phosphorus < 25) {
      const confidenceScore = 0.85 + (Math.min(40 - inputs.nitrogen, 30) / 150);
      
      issues.push({
        name: 'Combined N-P Deficiency',
        severity: 'high',
        confidenceScore,
        contributionWeight: (this.featureWeights.nitrogen + this.featureWeights.phosphorus) / 2
      });
    }
    
    return issues;
  }
  
  private calculateConfidenceScore(value1: number, value2: number, maxDiff: number): number {
    // Calculate how far the value is from optimal (normalized to 0-1)
    const difference = Math.abs(value1 - value2);
    const normalizedDiff = Math.min(difference, maxDiff) / maxDiff;
    
    // Convert to confidence score (0.5-0.98)
    return 0.5 + (normalizedDiff * 0.48);
  }
  
  private determineOverallStatus(issues: DetectedIssue[]): { status: 'healthy' | 'unhealthy' | null; disease: string | null; confidence: number | null } {
    if (issues.length === 0) {
      return {
        status: 'healthy',
        disease: null,
        confidence: 95
      };
    }
    
    // Sort issues by severity and confidence
    const sortedIssues = [...issues].sort((a, b) => {
      // First sort by severity
      const severityOrder = { high: 3, medium: 2, low: 1 };
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      
      if (severityDiff !== 0) return severityDiff;
      
      // Then by confidence score
      return b.confidenceScore - a.confidenceScore;
    });
    
    // Calculate weighted confidence score
    let totalWeightedConfidence = 0;
    let totalWeight = 0;
    
    for (const issue of issues) {
      totalWeightedConfidence += issue.confidenceScore * issue.contributionWeight;
      totalWeight += issue.contributionWeight;
    }
    
    const averageConfidence = Math.round((totalWeightedConfidence / totalWeight) * 100);
    
    return {
      status: 'unhealthy',
      disease: sortedIssues[0].name,
      confidence: averageConfidence
    };
  }
  
  private generateRecommendations(issues: DetectedIssue[]): string[] {
    if (issues.length === 0) {
      return [
        'Maintain current crop management practices',
        'Continue regular monitoring',
        'Consider a balanced fertilizer application for optimal growth'
      ];
    }
    
    const recommendations: string[] = [];
    const recommendationMap: Record<string, string[]> = {
      'Heat Stress': [
        'Increase irrigation frequency during hot periods',
        'Apply mulch to soil surface to conserve moisture',
        'Consider shade nets during peak heat hours',
        'Irrigate early in the morning or late in the evening'
      ],
      'Cold Stress': [
        'Apply protective coverings during cold nights',
        'Increase organic matter in soil to improve insulation',
        'Consider wind breaks to reduce cold damage',
        'Avoid irrigation before expected frost events'
      ],
      'Fungal Infection Risk': [
        'Improve air circulation around plants by proper spacing',
        'Reduce overhead watering to keep foliage dry',
        'Apply appropriate fungicide as a preventive measure',
        'Remove and destroy infected plant material'
      ],
      'Drought Stress': [
        'Increase irrigation frequency and duration',
        'Apply mulch to reduce soil water evaporation',
        'Consider drip irrigation for efficient water use',
        'Use soil moisture sensors to optimize irrigation timing'
      ],
      'Nitrogen Deficiency': [
        'Apply nitrogen-rich fertilizer following recommended rates',
        'Consider adding organic compost or manure',
        'Implement crop rotation with legumes next season',
        'Apply foliar nitrogen spray for quick uptake'
      ],
      'Nitrogen Toxicity': [
        'Stop any additional nitrogen application immediately',
        'Increase irrigation to help leach excess nitrogen',
        'Add carbon-rich materials to soil to balance N levels',
        'Consider planting nitrogen-hungry cover crops next season'
      ],
      'Phosphorus Deficiency': [
        'Apply phosphate fertilizer at recommended rates',
        'Check soil pH and adjust if necessary (ideal range 6.0-7.0)',
        'Add bone meal to improve phosphorus levels naturally',
        'Ensure adequate organic matter in soil'
      ],
      'Potassium Deficiency': [
        'Apply potassium-rich fertilizer at recommended rates',
        'Add wood ash to soil to increase potassium levels',
        'Consider compost with banana peels and other K-rich materials',
        'Avoid excessive irrigation which can leach potassium'
      ],
      'High Humidity Heat Stress': [
        'Improve ventilation and air circulation in the growing area',
        'Reduce plant density to allow better air flow',
        'Apply fungicide preventively to avoid disease outbreaks',
        'Adjust irrigation timing to reduce ambient humidity'
      ],
      'Combined N-P Deficiency': [
        'Apply balanced NPK fertilizer with higher N and P content',
        'Consider soil test for precise nutrient management',
        'Add both compost and bone meal to address both deficiencies',
        'Consider foliar application for faster nutrient uptake'
      ]
    };
    
    // Get specific recommendations for the top 2 issues
    const topIssues = [...issues]
      .sort((a, b) => b.confidenceScore - a.confidenceScore)
      .slice(0, 2);
    
    // Add recommendations for each top issue
    topIssues.forEach(issue => {
      const issueRecs = recommendationMap[issue.name] || [];
      
      // Add 2-3 recommendations per issue based on severity
      const numRecs = issue.severity === 'high' ? 3 : 2;
      
      for (let i = 0; i < numRecs && i < issueRecs.length; i++) {
        if (!recommendations.includes(issueRecs[i])) {
          recommendations.push(issueRecs[i]);
        }
      }
    });
    
    // Add general recommendations if we don't have enough specific ones
    if (recommendations.length < 3) {
      recommendations.push('Monitor crop regularly for any changes in condition');
    }
    
    return recommendations;
  }
}

// Export a singleton instance
export const cropHealthModel = new CropHealthModel();
