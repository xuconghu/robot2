export interface AssessmentQuestion {
  id: string;
  category: string;       // Main category, e.g., '一、感知潜能'
  subCategory: string;    // Sub-category, e.g., '感知接收能力'
  text: string;           // The specific question text, e.g., '它可以观察周围环境。'
}

export interface RobotFeature {
  id: string;
  label: string;
  value: string; // "是" | "否" | ""
}

export interface RobotImage {
  id: string;
  filename: string;
  name: string;
}

export interface StoredRobotAssessment {
  robotId: string;
  robotName: string;
  robotImageUrl: string; 
  timestamp: string;
  sliderValues: number[]; 
  shuffledQuestionsSnapshot: AssessmentQuestion[]; 
  overallScore: number;
  userName: string;
  userAge: number;
  userGender: string;
  userMajor: string;
  assessmentDuration: number; // 评估耗时（秒）
  features?: RobotFeature[]; // 添加特征评估数据
}

export interface AssessmentSession {
  selectedRobots: RobotImage[];
  currentRobotIndex: number;
  completedAssessments: StoredRobotAssessment[];
}
