// 机器人评估计数的Cloudflare Worker
// 部署到 https://rapid-shape-8021.huxucong0237.workers.dev/

/**
 * 这是一个可以部署到Cloudflare Workers的后端代码
 * 它使用Cloudflare KV存储来跟踪每个机器人的评估次数
 * 
 * 需要在Workers控制台中创建一个名为ROBOT_COUNTS的KV命名空间
 * 并将其绑定到此Worker
 */

export default {
  async fetch(request, env, ctx) {
    // 设置CORS头部
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // 处理预检请求
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // 解析请求路径
    const url = new URL(request.url);
    const path = url.pathname;

    // 设置最大评估次数
    const MAX_ASSESSMENT_COUNT = 15;

    if (path === "/api/robot-counts" && request.method === "GET") {
      // 获取所有机器人的评估计数
      try {
        const countsMap = {};
        const robotIds = await env.ROBOT_COUNTS.list();
        
        for (const key of robotIds.keys) {
          const count = await env.ROBOT_COUNTS.get(key.name);
          countsMap[key.name] = parseInt(count || "0");
        }

        return new Response(JSON.stringify({
          success: true,
          counts: countsMap
        }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: "获取评估计数失败",
          details: error.message
        }), {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }
    } 
    else if (path === "/api/robot-counts" && request.method === "POST") {
      // 更新机器人评估计数
      try {
        const { robotIds } = await request.json();
        const updates = [];
        const updatedCounts = {};
        
        if (!Array.isArray(robotIds) || robotIds.length === 0) {
          return new Response(JSON.stringify({
            success: false,
            error: "无效的机器人ID列表"
          }), {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json"
            }
          });
        }

        // 增加每个机器人的评估计数
        for (const robotId of robotIds) {
          const currentCount = parseInt(await env.ROBOT_COUNTS.get(robotId) || "0");
          const newCount = currentCount + 1;
          updates.push(env.ROBOT_COUNTS.put(robotId, newCount.toString()));
          updatedCounts[robotId] = newCount;
        }

        await Promise.all(updates);

        return new Response(JSON.stringify({
          success: true,
          updatedCounts
        }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: "更新评估计数失败",
          details: error.message
        }), {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }
    }
    else if (path === "/api/available-robots" && request.method === "GET") {
      // 获取尚未达到评估上限的机器人ID列表
      try {
        const countsMap = {};
        const robotIds = await env.ROBOT_COUNTS.list();
        
        for (const key of robotIds.keys) {
          const count = await env.ROBOT_COUNTS.get(key.name);
          countsMap[key.name] = parseInt(count || "0");
        }

        // 过滤出评估次数少于15次的机器人ID
        const availableRobotIds = Object.keys(countsMap).filter(
          id => countsMap[id] < MAX_ASSESSMENT_COUNT
        );

        return new Response(JSON.stringify({
          success: true,
          availableRobotIds
        }), {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: "获取可用机器人失败",
          details: error.message
        }), {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }
    }
    else {
      // 简单的根路径响应，显示API状态
      if (path === "/") {
        return new Response("机器人评估API正常运行中", {
          headers: corsHeaders
        });
      }

      return new Response("未找到", {
        status: 404,
        headers: corsHeaders
      });
    }
  }
}; 