'use client';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Label } from '../../components/Label/Label';
import { cn } from '../../utils/cn';
import {
  Tabs,
  TabsContent,
  TabsList,
  type TabsListProps,
  TabsTrigger,
} from './Tabs';

export type TabsDemoProps = {
  variant?: NonNullable<TabsListProps['variant']>;
  orientation?: 'horizontal' | 'vertical';
  disableThird?: boolean;
};

export function TabsDemo({
  variant = 'underline',
  orientation = 'horizontal',
  disableThird = true,
}: TabsDemoProps) {
  const vertical = orientation === 'vertical';

  return (
    <Tabs
      defaultValue="account"
      orientation={orientation}
      className={cn('w-[400px]', vertical && 'flex gap-4')}
    >
      <TabsList
        variant={variant}
        className={cn(vertical && 'flex-col border-b-0 pr-4')}
      >
        <TabsTrigger
          value="account"
          className={cn(vertical && 'w-full justify-start')}
        >
          계정
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className={cn(vertical && 'w-full justify-start')}
        >
          비밀번호
        </TabsTrigger>
        <TabsTrigger
          value="disabled"
          disabled={disableThird}
          className={cn(vertical && 'w-full justify-start')}
        >
          사용불가
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="account"
        className={cn('flex flex-col gap-3', vertical && 'mt-0')}
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tabs-demo-name">이름</Label>
          <Input id="tabs-demo-name" defaultValue="홍길동" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tabs-demo-email">이메일</Label>
          <Input
            id="tabs-demo-email"
            type="email"
            defaultValue="hong@example.com"
          />
        </div>
      </TabsContent>
      <TabsContent
        value="password"
        className={cn('flex flex-col gap-3', vertical && 'mt-0')}
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tabs-demo-current-password">현재 비밀번호</Label>
          <Input id="tabs-demo-current-password" type="password" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tabs-demo-new-password">새 비밀번호</Label>
          <Input id="tabs-demo-new-password" type="password" />
        </div>
        <Button className="self-start">변경</Button>
      </TabsContent>
      <TabsContent value="disabled" className={cn(vertical && 'mt-0')}>
        준비 중인 기능이라 아직 접근할 수 없습니다.
      </TabsContent>
    </Tabs>
  );
}
