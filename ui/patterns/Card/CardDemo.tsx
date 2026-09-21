'use client';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Label } from '../../components/Label/Label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';

export type CardDemoProps = {
  title?: string;
  description?: string;
};

export function CardDemo({
  title = '프로젝트 생성',
  description = '새 프로젝트의 기본 정보를 입력하세요.',
}: CardDemoProps) {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Label htmlFor="project-name">프로젝트 이름</Label>
          <Input id="project-name" placeholder="아크스퀘어 대시보드" />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost">취소</Button>
        <Button variant="primary">배포</Button>
      </CardFooter>
    </Card>
  );
}
