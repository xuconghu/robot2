"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RobotFeature } from "@/types";
import { Separator } from "@/components/ui/separator";

interface FeaturesPanelProps {
  features: RobotFeature[];
  onFeaturesChange: (features: RobotFeature[]) => void;
  onComplete: () => void;
}

export function FeaturesPanel({ features, onFeaturesChange, onComplete }: FeaturesPanelProps) {
  const handleFeatureChange = (featureId: string, value: string) => {
    const updatedFeatures = features.map(feature => 
      feature.id === featureId ? { ...feature, value } : feature
    );
    onFeaturesChange(updatedFeatures);
  };

  // 检查是否所有特征都已选择
  const allFeaturesSelected = features.every(feature => feature.value === "是" || feature.value === "否");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>机器人外观特征识别</CardTitle>
        <CardDescription>
          请根据图片中机器人的外观，选择是否具有以下特征
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between">
              <div className="font-medium">{feature.label}</div>
              <div className="flex gap-2">
                <label className="flex items-center gap-1.5">
                  <input
                    type="radio"
                    name={feature.id}
                    value="是"
                    checked={feature.value === "是"}
                    onChange={() => handleFeatureChange(feature.id, "是")}
                    className="h-4 w-4"
                  />
                  <span>是</span>
                </label>
                <label className="flex items-center gap-1.5">
                  <input
                    type="radio"
                    name={feature.id}
                    value="否"
                    checked={feature.value === "否"}
                    onChange={() => handleFeatureChange(feature.id, "否")}
                    className="h-4 w-4"
                  />
                  <span>否</span>
                </label>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-6" />
        
        <Button 
          onClick={onComplete} 
          disabled={!allFeaturesSelected}
          className="w-full py-5 text-base"
        >
          完成特征识别
        </Button>
      </CardContent>
    </Card>
  );
} 
