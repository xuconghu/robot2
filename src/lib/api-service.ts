// 后端API服务地址
const API_URL = 'https://ends-compact-thumbnails-tan.trycloudflare.com';

// 最大评估次数限制
export const MAX_ASSESSMENT_COUNT = 15;

// 机器人评估计数API服务
export const RobotCountService = {
  // 获取所有机器人的评估计数
  async getRobotCounts(): Promise<Record<string, number>> {
    try {
      const response = await fetch(`${API_URL}/api/robot-counts`);
      if (!response.ok) {
        throw new Error('获取评估计数失败');
      }
      const data = await response.json();
      return data.counts || {};
    } catch (error) {
      console.error('获取机器人评估计数失败:', error);
      return {};
    }
  },

  // 获取所有机器人的剩余评估次数
  async getRemainingCounts(): Promise<Record<string, number>> {
    try {
      const counts = await this.getRobotCounts();
      const remainingCounts: Record<string, number> = {};
      
      // 计算每个机器人的剩余评估次数
      Object.keys(counts).forEach(robotId => {
        remainingCounts[robotId] = MAX_ASSESSMENT_COUNT - (counts[robotId] || 0);
        if (remainingCounts[robotId] < 0) remainingCounts[robotId] = 0;
      });
      
      return remainingCounts;
    } catch (error) {
      console.error('获取剩余评估次数失败:', error);
      return {};
    }
  },

  // 更新机器人评估计数
  async updateRobotCounts(robotIds: string[]): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/api/robot-counts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ robotIds }),
      });
      
      if (!response.ok) {
        throw new Error('更新评估计数失败');
      }
      
      const data = await response.json();
      return data.success || false;
    } catch (error) {
      console.error('更新机器人评估计数失败:', error);
      return false;
    }
  },

  // 获取可用的机器人ID（评估次数少于15次的）
  async getAvailableRobots(): Promise<string[]> {
    try {
      const response = await fetch(`${API_URL}/api/available-robots`);
      if (!response.ok) {
        throw new Error('获取可用机器人失败');
      }
      const data = await response.json();
      return data.availableRobotIds || [];
    } catch (error) {
      console.error('获取可用机器人失败:', error);
      return [];
    }
  }
}; 