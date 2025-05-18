"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RobotFeature } from "@/types";
import { Check, X, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

interface FeaturesPanelProps {
  features: RobotFeature[];
  onFeaturesChange: (features: RobotFeature[]) => void;
  onComplete: () => void;
}

export function FeaturesPanel({ features, onFeaturesChange, onComplete }: FeaturesPanelProps) {
  const [recentlyChanged, setRecentlyChanged] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState(0);
  
  const handleFeatureChange = (featureId: string, value: string) => {
    const updatedFeatures = features.map(feature => 
      feature.id === featureId ? { ...feature, value } : feature
    );
    onFeaturesChange(updatedFeatures);
    
    // 设置最近变更的特征，用于动画效果
    setRecentlyChanged(featureId);
    setTimeout(() => setRecentlyChanged(null), 1000);
  };

  // 检查是否所有特征都已选择
  const allFeaturesSelected = features.every(feature => feature.value === "是" || feature.value === "否");
  const selectedCount = features.filter(feature => feature.value === "是").length;
  const totalSelected = features.filter(feature => feature.value !== "").length;
  
  // 更新进度条
  useEffect(() => {
    const targetValue = (totalSelected / features.length) * 100;
    
    // 使用动画从当前值过渡到目标值
    let startVal = progressValue;
    const duration = 500; // 动画持续时间（毫秒）
    const increment = 10; // 每帧更新的时间
    const steps = duration / increment;
    const valueIncrement = (targetValue - startVal) / steps;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const newValue = startVal + valueIncrement * currentStep;
      setProgressValue(newValue);
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setProgressValue(targetValue);
      }
    }, increment);
    
    return () => clearInterval(interval);
  }, [totalSelected, features.length]);

  return (
    <Card className="w-full shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 py-3">
        <CardTitle className="text-lg flex items-center">
          <span>机器人外观特征识别</span>
          <span className="ml-auto text-sm font-normal text-muted-foreground">
            已选择 {selectedCount} 项特征 ({totalSelected}/{features.length})
          </span>
        </CardTitle>
        <CardDescription className="text-sm mt-1">
          请根据图片中机器人的外观，选择你认为它是否具有以下特征
        </CardDescription>
        <div className="mt-2">
          <Progress value={progressValue} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-2">
          {features.map((feature) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`rounded border p-2 ${
                feature.value === "是" 
                  ? "bg-gradient-to-r from-green-50 to-green-100 border-green-200 dark:from-green-900/20 dark:to-green-800/10 dark:border-green-800" 
                  : feature.value === "否" 
                    ? "bg-gradient-to-r from-red-50 to-red-100 border-red-200 dark:from-red-900/20 dark:to-red-800/10 dark:border-red-800"
                    : "bg-white dark:bg-slate-800"
              } ${recentlyChanged === feature.id ? "ring-2 ring-primary ring-opacity-50" : ""} transition-all duration-300 hover:shadow-md`}
            >
              <div className="font-medium text-sm mb-1.5 flex items-center justify-between">
                <span>{feature.label}</span>
                {feature.value && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    <CheckCircle2 className={`h-4 w-4 ${feature.value === "是" ? "text-green-500" : "text-red-500"}`} />
                  </motion.span>
                )}
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleFeatureChange(feature.id, "是")}
                  className={`flex items-center justify-center rounded px-3 py-1.5 text-sm flex-1 ${
                    feature.value === "是"
                      ? "bg-green-500 text-white shadow-sm shadow-green-200 dark:shadow-green-900/30"
                      : "bg-white text-green-700 border border-green-300 hover:bg-green-50 dark:bg-transparent dark:text-green-400 dark:border-green-600 dark:hover:bg-green-900/30"
                  } transition-all duration-200`}
                >
                  <Check className="h-4 w-4 mr-1" />
                  是
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleFeatureChange(feature.id, "否")}
                  className={`flex items-center justify-center rounded px-3 py-1.5 text-sm flex-1 ${
                    feature.value === "否"
                      ? "bg-red-500 text-white shadow-sm shadow-red-200 dark:shadow-red-900/30"
                      : "bg-white text-red-700 border border-red-300 hover:bg-red-50 dark:bg-transparent dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/30"
                  } transition-all duration-200`}
                >
                  <X className="h-4 w-4 mr-1" />
                  否
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-primary/10 to-primary/5 p-4">
        <AnimatePresence>
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button 
              onClick={onComplete} 
              disabled={!allFeaturesSelected}
              className={`w-full py-2.5 text-md font-medium transition-all duration-300 ${
                allFeaturesSelected 
                  ? "bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg" 
                  : "bg-primary/70"
              }`}
            >
              {allFeaturesSelected && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="mr-2"
                >
                  <CheckCircle2 className="h-5 w-5" />
                </motion.span>
              )}
              完成特征识别并进入下一步 ({totalSelected}/{features.length})
            </Button>
          </motion.div>
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
}