"use client";

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { StoredRobotAssessment, AssessmentQuestion } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateCsvContent(data: StoredRobotAssessment[]): string {
  if (!data || data.length === 0) {
    return "";
  }

  // 获取所有特征的ID，用于生成表头
  const allFeatureIds = new Set<string>();
  data.forEach(assessment => {
    if (assessment.features && assessment.features.length > 0) {
      assessment.features.forEach(feature => {
        allFeatureIds.add(feature.id);
      });
    }
  });
  
  const featureColumns = Array.from(allFeatureIds);

  const header = [
    "用户姓名 (UserName)",
    "用户年龄 (UserAge)",
    "用户性别 (UserGender)",
    "用户专业 (UserMajor)",
    "机器人ID (RobotID)",
    "机器人名称 (RobotName)",
    "机器人图片URL (RobotImageURL)",
    "评估时间戳 (Timestamp)",
    "评估耗时(秒) (AssessmentDuration)",
    "机器人综合评分 (OverallRobotScore)",
    // 添加特征列表头
    ...featureColumns.map(id => `特征_${id} (Feature_${id})`),
    "问题ID (QuestionID)",
    "问题分类 (Category)",
    "问题子分类 (SubCategory)",
    "问题文本 (QuestionText)",
    "单项评分 (IndividualScore)",
  ];

  const rows = data.flatMap((robotAssessment) => {
    // 创建一个特征ID到特征值的映射
    const featureMap: Record<string, string> = {};
    if (robotAssessment.features && robotAssessment.features.length > 0) {
      robotAssessment.features.forEach(feature => {
        featureMap[feature.id] = feature.value;
      });
    }
    
    // 为每个特征ID生成对应的值
    const featureValues = featureColumns.map(id => `"${featureMap[id] || ""}"`);
    
    return robotAssessment.shuffledQuestionsSnapshot.map((question, index) => {
      return [
        `"${robotAssessment.userName || ""}"`,
        robotAssessment.userAge || "",
        `"${robotAssessment.userGender || ""}"`,
        `"${robotAssessment.userMajor || ""}"`,
        `"${robotAssessment.robotId}"`,
        `"${robotAssessment.robotName}"`,
        `"${robotAssessment.robotImageUrl}"`,
        `"${robotAssessment.timestamp}"`,
        robotAssessment.assessmentDuration || 0,
        robotAssessment.overallScore,
        // 添加特征值
        ...featureValues,
        `"${question.id}"`,
        `"${question.category}"`,
        `"${question.subCategory}"`,
        `"${question.text.replace(/"/g, '""')}"`, // Escape double quotes in question text
        robotAssessment.sliderValues[index],
      ].join(',');
    });
  });

  return [header.join(','), ...rows].join('\n');
}

export function downloadCsv(csvContent: string, filename: string): void {
  if (typeof window === "undefined") return;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) { // feature detection
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// 辅助函数：根据环境生成正确的URL路径
export function getBasePath() {
  // 在浏览器环境中判断
  if (typeof window !== 'undefined') {
    // 判断是否在GitHub Pages上运行
    if (window.location.hostname.includes('github.io')) {
      return '/test222';
    }
    
    // 处理自定义域名情况 (zhishiweilai.com)
    if (window.location.hostname.includes('zhishiweilai.com')) {
      return '';
    }
    
    // 本地开发环境
    return '';
  }
  
  // 服务器端渲染时默认返回空字符串
  return '';
}
