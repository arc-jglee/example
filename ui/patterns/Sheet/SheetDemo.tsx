'use client';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Label } from '../../components/Label/Label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  type SheetContentProps,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet';

export type SheetDemoProps = {
  side?: NonNullable<SheetContentProps['side']>;
};

export function SheetDemo({ side = 'right' }: SheetDemoProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">프로필 수정</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>프로필 수정</SheetTitle>
          <SheetDescription>
            변경 후 저장 버튼을 눌러야 반영됩니다.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sheet-demo-name">이름</Label>
            <Input id="sheet-demo-name" defaultValue="홍길동" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sheet-demo-email">이메일</Label>
            <Input
              id="sheet-demo-email"
              type="email"
              defaultValue="hong@example.com"
            />
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">취소</Button>
          </SheetClose>
          <Button>저장</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
