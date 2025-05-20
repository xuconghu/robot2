"use client";

import type { Dispatch, SetStateAction } from 'react';
import { useMemo, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import type { AssessmentQuestion } from '@/types';
import { Separator } from '@/components/ui/separator';
import { INITIAL_SLIDER_VALUE } from '@/config/questions';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

interface AssessmentPanelProps {
  questions: AssessmentQuestion[];
  sliderValues: number[];
  onSliderValuesChange: Dispatch<SetStateAction<number[]>>;
  robotsAssessedCount: number;
  totalRobotsToAssess: number;
  isAssessmentActive: boolean;
  answeredQuestions: boolean[];
  setAnsweredQuestions: Dispatch<SetStateAction<boolean[]>>;
  currentAssessmentId: string;
}

export function AssessmentPanel({ 
  questions, 
  sliderValues, 
  onSliderValuesChange,
  robotsAssessedCount,
  totalRobotsToAssess,
  isAssessmentActive,
  answeredQuestions,
  setAnsweredQuestions,
  currentAssessmentId
}: AssessmentPanelProps) {
  // 添加对内容区域的引用
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (index: number, value: number[]) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = value[0];
    onSliderValuesChange(newSliderValues);
    
    // 标记为已回答
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[index] = true;
    setAnsweredQuestions(newAnsweredQuestions);
  };

  const numAnsweredQuestions = useMemo(() => {
    if (!answeredQuestions || answeredQuestions.length === 0) return 0;
    return answeredQuestions.filter(answered => answered).length;
  }, [answeredQuestions]);
    
  // 当robotsAssessedCount或currentAssessmentId变化时，滚动到顶部
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [robotsAssessedCount, currentAssessmentId]);

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-slate-50 dark:bg-slate-900/50 py-3 flex-shrink-0">
        <CardTitle className="text-lg font-semibold text-primary">能力评估</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">请根据以下标准，对机器人的各项潜能进行评分。</CardDescription>
        
        <div className="mt-2 px-3 py-1.5 bg-primary/5 rounded-lg flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ThumbsDown className="h-3.5 w-3.5 mr-1 text-red-500" />
            <span>完全不同意 (0)</span>
          </div>
          <div className="flex items-center">
            <span>完全同意 (100)</span>
            <ThumbsUp className="h-3.5 w-3.5 ml-1 text-green-500" />
          </div>
        </div>
      </CardHeader>

      <CardContent ref={contentRef} className="flex-grow space-y-5 p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 220px)" }}>
        {questions.map((question, index) => (
          <div key={question.id} className="space-y-2 first:pt-0">
            <Label htmlFor={question.id} className="text-base font-medium block text-foreground mb-1">
              {question.text}
            </Label>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-muted-foreground">
                  <ThumbsDown className="h-3.5 w-3.5 mr-1 text-red-500/80" />
                  <span>完全不同意</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <span>完全同意</span>
                  <ThumbsUp className="h-3.5 w-3.5 ml-1 text-green-500/80" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Slider
                  id={question.id}
                  min={0}
                  max={100}
                  step={1}
                  value={[sliderValues[index]]}
                  onValueChange={(value) => handleSliderChange(index, value)}
                  className="flex-grow h-5"
                  aria-label={`${question.text} slider`}
                />
                <span className="text-base font-semibold w-12 text-right text-accent tabular-nums">
                  {sliderValues[index]}%
                </span>
              </div>
            </div>
            {index < questions.length - 1 && <Separator className="mt-3" />}
          </div>
        ))}
      </CardContent>
      <Separator className="flex-shrink-0" />      <CardFooter className="flex flex-col items-start p-4 bg-slate-50 dark:bg-slate-900/50 flex-shrink-0">
        {isAssessmentActive && questions.length > 0 && sliderValues.length === questions.length && (
          <div className="w-full">
            <h3 className="text-lg font-semibold text-primary mb-2">当前答题进度</h3>
            <div className="text-3xl font-bold text-accent text-center py-1">
              {numAnsweredQuestions} / {questions.length}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              已回答 {numAnsweredQuestions} 个问题，共 {questions.length} 个问题。
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
