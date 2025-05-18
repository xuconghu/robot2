import type { AssessmentQuestion } from '@/types';

// 精简后仅保留感知潜能和行为潜能相关问题
export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // 一、感知潜能
  {
    id: 'perceptual_1',
    category: '一、感知潜能',
    subCategory: '感知接受',
    text: '它可以观察周围环境',
  },
  {
    id: 'perceptual_2',
    category: '一、感知潜能',
    subCategory: '感知接受',
    text: '它可以了解周围发生的变化',
  },
  {
    id: 'perceptual_3',
    category: '一、感知潜能',
    subCategory: '感知接受',
    text: '它可以察觉附近新出现的事物',
  },
  {
    id: 'perceptual_4',
    category: '一、感知潜能',
    subCategory: '感知表达',
    text: '我很容易看出它是否在观察周围环境',
  },
  {
    id: 'perceptual_5',
    category: '一、感知潜能',
    subCategory: '感知表达',
    text: '当它注意到某个东西时，会很明显的表现出来',
  },
  {
    id: 'perceptual_6',
    category: '一、感知潜能',
    subCategory: '感知表达',
    text: '我很容易看出它正在注意什么',
  },

  {
    id: 'perceptual_7',
    category: '一、感知潜能',
    subCategory: '感知表达',
    text: '我可以根据它的表现判断它是否会调整注意的对象',
  },

  // 二、行为潜能
  {
    id: 'behavioral_1',
    category: '二、行为潜能',
    subCategory: '行为能力',
    text: '它想与我互动',
  },
  {
    id: 'behavioral_2',
    category: '二、行为潜能',
    subCategory: '行为能力',
    text: '它可以自主设计怎样与我互动',
  },
  {
    id: 'behavioral_3',
    category: '二、行为潜能',
    subCategory: '行为能力',
    text: '它可以预测我对于它的行动的反馈',
  },
  {
    id: 'behavioral_4',
    category: '二、行为潜能',
    subCategory: '行为能力',
    text: '它可以理解我做出的言语或行为反馈',
  },
  {
    id: 'behavioral_5',
    category: '二、行为潜能',
    subCategory: '行为表达',
    text: '我想与它互动',
  },

];

export const INITIAL_SLIDER_VALUE = 50;
