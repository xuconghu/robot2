export interface RobotImage {
  id: string;
  filename: string;
  name: string;
}

import { RobotCountService, MAX_ASSESSMENT_COUNT } from '@/lib/api-service';

// ============================================================
// 配置区域：可以根据需要修改这些配置
// ============================================================

// 每次评估需要的机器人数量
export const ROBOTS_PER_ASSESSMENT = 5;

// 每个机器人允许的最大评估次数，应与后端设置保持一致
// 注意：此值在后端worker.js和前端api-service.ts中也定义了，修改时需要保持一致
// export const MAX_ASSESSMENT_COUNT = 15; // 直接从api-service.ts导入

// 要保留的机器人ID列表
// 如需修改此列表，只需在此处添加或删除机器人ID
// 您可以根据需要更新此列表
// 使用robot301-robot349编号范围，避免与历史数据冲突
const SELECTED_ROBOT_IDS = [
  'robot318', 'robot301', 'robot313', 'robot328', 'robot338', 'robot334', 'robot303',
  'robot346', 'robot337', 'robot327', 'robot306', 'robot319', 'robot302', 'robot322',
  'robot310', 'robot308', 'robot325', 'robot331', 'robot316', 'robot321', 'robot342',
  'robot315', 'robot348', 'robot344', 'robot314'
];

// ============================================================
// 以下内容通常不需要修改
// ============================================================

// 所有可用的机器人图片（自动生成的数据）
const ALL_ROBOT_IMAGES: RobotImage[] = [
  { id: 'robot301', filename: '/robot-images/1_H1.jpg', name: 'H1' },
  { id: 'robot302', filename: '/robot-images/2_G1.jpg', name: 'G1' },
  { id: 'robot303', filename: '/robot-images/3_Protoclon.jpg', name: 'Protoclon' },
  { id: 'robot304', filename: '/robot-images/4_Spot.jpg', name: 'Spot' },
  { id: 'robot305', filename: '/robot-images/5_Optimus.jpg', name: 'Optimus' },
  { id: 'robot306', filename: '/robot-images/6_Ameca.jpg', name: 'Ameca' },
  { id: 'robot307', filename: '/robot-images/7_EVE.jpg', name: 'EVE' },
  { id: 'robot308', filename: '/robot-images/8_GR-1.jpg', name: 'GR-1' },
  { id: 'robot309', filename: '/robot-images/10_Digit-2.jpg', name: 'Digit-2' },
  { id: 'robot310', filename: '/robot-images/11_SE01.jpg', name: 'SE01' },
  { id: 'robot311', filename: '/robot-images/13_SA01.jpg', name: 'SA01' },
  { id: 'robot312', filename: '/robot-images/14_s2.jpg', name: 's2' },
  { id: 'robot313', filename: '/robot-images/15_N1.jpg', name: 'N1' },
  { id: 'robot314', filename: '/robot-images/16_X1.jpg', name: 'X1' },
  { id: 'robot315', filename: '/robot-images/17_Go2.jpg', name: 'Go2' },
  { id: 'robot316', filename: '/robot-images/18_Surena IV.jpg', name: 'Surena IV' },
  { id: 'robot317', filename: '/robot-images/21_NEO Gamma.jpg', name: 'NEO Gamma' },
  { id: 'robot318', filename: '/robot-images/25_RT-G.jpg', name: 'RT-G' },
  { id: 'robot319', filename: '/robot-images/26_NICOL.jpg', name: 'NICOL' },
  { id: 'robot320', filename: '/robot-images/27_Berkeley Humanoid Lite.jpg', name: 'Berkeley Humanoid Lite' },
  { id: 'robot321', filename: '/robot-images/28_Emo.jpg', name: 'Emo' },
  { id: 'robot322', filename: '/robot-images/30_BDX  Droid.jpg', name: 'BDX  Droid' },
  { id: 'robot323', filename: '/robot-images/31_Vector.jpg', name: 'Vector' },
  { id: 'robot324', filename: '/robot-images/32_Emo the robotic head.jpg', name: 'Emo the robotic head' },
  { id: 'robot325', filename: '/robot-images/33_Booster T1.jpg', name: 'Booster T1' },
  { id: 'robot326', filename: '/robot-images/34_Qmini.jpg', name: 'Qmini' },
  { id: 'robot327', filename: '/robot-images/35_ToddlerBot.jpg', name: 'ToddlerBot' },
  { id: 'robot328', filename: '/robot-images/36_Yonbo.jpg', name: 'Yonbo' },
  { id: 'robot329', filename: '/robot-images/37_Chipo.jpg', name: 'Chipo' },
  { id: 'robot330', filename: '/robot-images/38_Creature_02.jpg', name: 'Creature-02' },
  { id: 'robot331', filename: '/robot-images/39_Bambot.jpg', name: 'Bambot' },
  { id: 'robot332', filename: '/robot-images/40_Mirokaï.jpg', name: 'Mirokaï' },
  { id: 'robot333', filename: '/robot-images/41_Tang Monk.jpg', name: 'Tang Monk' },
  { id: 'robot334', filename: '/robot-images/42_XGO_tiny.jpg', name: 'XGO-tiny' },
  { id: 'robot335', filename: '/robot-images/43_Lovot 3.jpg', name: 'Lovot 3' },
  { id: 'robot336', filename: '/robot-images/44_Mi-mo.jpg', name: 'Mi-mo' },
  { id: 'robot337', filename: '/robot-images/45_Tidybot++.jpg', name: 'Tidybot++' },
  { id: 'robot338', filename: '/robot-images/46_Aru.jpg', name: 'Aru' },
  { id: 'robot339', filename: '/robot-images/47_AIBI.jpg', name: 'AIBI' },
  { id: 'robot340', filename: '/robot-images/48_Ballie.jpg', name: 'Ballie' },
  { id: 'robot341', filename: '/robot-images/49_XGO-Rider.jpg', name: 'XGO-Rider' },
  { id: 'robot342', filename: '/robot-images/50_Ascento.jpg', name: 'Ascento' },
  { id: 'robot343', filename: '/robot-images/51_Nicobo.jpg', name: 'Nicobo' },
  { id: 'robot344', filename: '/robot-images/52_mini talking-bones.jpg', name: 'mini talking-bones' },
  { id: 'robot345', filename: '/robot-images/53_AYUDA-MiraMe.jpg', name: 'AYUDA-MiraMe' },
  { id: 'robot346', filename: '/robot-images/54_aibo.jpg', name: 'aibo' },
  { id: 'robot347', filename: '/robot-images/55_bocco emo.jpg', name: 'bocco emo' },
  { id: 'robot348', filename: '/robot-images/56_Ropet.jpg', name: 'Ropet' },
  { id: 'robot349', filename: '/robot-images/57_DJI Neo.jpg', name: 'DJI Neo' }
];

// 从所有机器人中过滤出指定ID的机器人
export const ROBOT_IMAGES: RobotImage[] = ALL_ROBOT_IMAGES.filter(robot => 
  SELECTED_ROBOT_IDS.includes(robot.id)
);

// 随机选择指定数量的机器人，从所有未达到评估上限的机器人中完全随机抽取
export async function getRandomRobotsWithCounts(count: number = ROBOTS_PER_ASSESSMENT): Promise<RobotImage[]> {
  try {
    // 获取所有机器人的评估次数
    const robotCounts = await RobotCountService.getRobotCounts();
    
    // 所有选定的机器人列表
    const allSelectedRobots = [...ROBOT_IMAGES];
    
    // 过滤出所有评估次数低于上限的机器人
    // 如果一个机器人从未被评估过，在robotCounts中就不存在记录，应该被包含在可选列表中
    const availableRobots = allSelectedRobots.filter(robot => 
      !robotCounts[robot.id] || robotCounts[robot.id] < MAX_ASSESSMENT_COUNT
    );
    
    // 如果没有可用机器人，使用所有机器人
    if (availableRobots.length === 0) {
      console.warn('没有可用的机器人，将使用全部机器人池');
      return getRandomRobots(count);
    }
    
    // 确保不要尝试选择比可用机器人更多的数量
    const selectCount = Math.min(count, availableRobots.length);
    
    // 复制数组防止修改原数组
    const shuffled = [...availableRobots];
    
    // Fisher-Yates 随机算法
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // 返回前selectCount个元素
    return shuffled.slice(0, selectCount);
    
  } catch (error) {
    console.error('获取随机机器人失败，使用本地随机选择:', error);
    // 发生错误时回退到原始的随机选择
    return getRandomRobots(count);
  }
}

// 保留原始的同步随机选择函数，作为备选
export function getRandomRobots(count: number = ROBOTS_PER_ASSESSMENT): RobotImage[] {
  // 确保不要尝试选择比可用机器人更多的数量
  const selectCount = Math.min(count, ROBOT_IMAGES.length);
  
  // 复制数组防止修改原数组
  const shuffled = [...ROBOT_IMAGES];
  
  // Fisher-Yates 随机算法
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // 返回前selectCount个元素
  return shuffled.slice(0, selectCount);
}