import type { AssessmentQuestion } from '@/types';

// 精简后仅保留感知潜能和行为潜能相关问题
export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // 一、感知潜能
  {
    id: 'perceptual_1',
    category: '一、感知潜能',
    subCategory: '感知能力',
    text: '它能够观察和感知周围环境的变化',
  },
  {
    id: 'perceptual_2',
    category: '一、感知潜能',
    subCategory: '感知能力',
    text: '它能够主动关注特定的对象或事件',
  },
  {
    id: 'perceptual_3',
    category: '一、感知潜能',
    subCategory: '感知能力',
    text: '它能够察觉到环境中的新事物或变化',
  },
  {
    id: 'perceptual_4',
    category: '一、感知潜能',
    subCategory: '感知能力',
    text: '它能够区分不同类型的物体或情境',
  },
  {
    id: 'perceptual_5',
    category: '一、感知潜能',
    subCategory: '感知表达',
    text: '我能够很容易地看出它正在关注什么',
  },
  {
    id: 'perceptual_6',
    category: '一、感知潜能',
    subCategory: '感知表达',
    text: '当它注意到某个事物时，会有明显的表现',
  },
  // 二、行为潜能
  {
    id: 'behavioral_1',
    category: '二、行为潜能',
    subCategory: '行为能力',
    text: '它表现出与人互动的意愿',
  },
  {
    id: 'behavioral_2',
    category: '二、行为潜能',
    subCategory: '行为能力',
    text: '它能够自主设计与人互动的方式',
  },
  {
    id: 'behavioral_3',
    category: '二、行为潜能',
    subCategory: '行为能力',
    text: '它能够预测我对它行为的反应',
  },
  {
    id: 'behavioral_4',
    category: '二、行为潜能',
    subCategory: '行为能力',
    text: '它能够理解我的言语或行为反馈',
  },
  {
    id: 'behavioral_5',
    category: '二、行为潜能',
    subCategory: '行为表达',
    text: '它的互动行为让我感到自然舒适',
  },
  {
    id: 'behavioral_6',
    category: '二、行为潜能',
    subCategory: '行为表达',
    text: '它的行为表现与其外观形象相符合',
  }
];

export const INITIAL_SLIDER_VALUE = 50;
