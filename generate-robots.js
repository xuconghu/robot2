const fs = require('fs');
const path = require('path');

// 直接从文件系统读取robot-images目录
const robotImagesDir = path.join(__dirname, 'public', 'robot-images');

try {
  // 读取目录中的文件
  const files = fs.readdirSync(robotImagesDir);
  
  // 筛选出jpg文件并排序
  const robotFiles = files
    .filter(filename => filename.toLowerCase().endsWith('.jpg'))
    .sort((a, b) => {
      // 提取文件名中的数字部分进行排序
      const numA = parseInt(a.match(/^(\d+)/)?.[1] || '0');
      const numB = parseInt(b.match(/^(\d+)/)?.[1] || '0');
      return numA - numB;
    });

  const robotImages = robotFiles.map((filename, index) => {
    // 使用robot301-robot349编号范围，避免与历史数据冲突
    const id = `robot${(index + 301).toString().padStart(3, '0')}`;
    
    // 从文件名提取机器人名称
    // 假设文件名格式为: 数字_名称.jpg
    const nameMatch = filename.match(/^\d+_(.+)\.jpg$/);
    let name = nameMatch ? nameMatch[1] : filename.replace(/\.\w+$/, '');
    
    // 替换下划线为空格
    name = name.replace(/_/g, '-');
    
    return `  { id: '${id}', filename: '/robot-images/${filename}', name: '${name}' }`;
  });

  // 创建配置文件内容
  const output = `export interface RobotImage {
  id: string;
  filename: string;
  name: string;
}

// 这里列出所有可用的机器人图片
// 从public/robot-images文件夹中读取的所有实际图片
export const ROBOT_IMAGES: RobotImage[] = [
${robotImages.join(',\n')}
];

// 每次评估需要的机器人数量
export const ROBOTS_PER_ASSESSMENT = 3;

// 随机选择指定数量的机器人
export function getRandomRobots(count: number = ROBOTS_PER_ASSESSMENT): RobotImage[] {
  // 复制数组防止修改原数组
  const shuffled = [...ROBOT_IMAGES];
  
  // Fisher-Yates 随机算法
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // 返回前count个元素
  return shuffled.slice(0, count);
}`;

  // 直接更新src/config/robots.ts文件
  fs.writeFileSync(path.join(__dirname, 'src', 'config', 'robots.ts'), output, 'utf8');

  console.log(`✅ 已生成并更新src/config/robots.ts，包含 ${robotFiles.length} 个机器人图片。`);
  
} catch (err) {
  console.error('❌ 生成机器人配置时出错:', err);
} 