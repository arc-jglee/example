'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

export const INVOICES = [
  { id: 'INV001', status: '결제완료', method: '신용카드', amount: 25000 },
  { id: 'INV002', status: '대기중', method: '계좌이체', amount: 15000 },
  { id: 'INV003', status: '결제완료', method: '신용카드', amount: 35000 },
  { id: 'INV004', status: '미결제', method: '가상계좌', amount: 45000 },
];

export type TableDemoProps = {
  rowCount?: number;
  showCaption?: boolean;
  showFooter?: boolean;
};

export function TableDemo({
  rowCount = 4,
  showCaption = true,
  showFooter = false,
}: TableDemoProps) {
  const rows = INVOICES.slice(0, rowCount);

  return (
    <Table>
      {showCaption && <TableCaption>최근 결제 내역 목록입니다.</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead scope="col">청구서</TableHead>
          <TableHead scope="col">상태</TableHead>
          <TableHead scope="col">결제 수단</TableHead>
          <TableHead scope="col" className="text-right">
            금액
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.id}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">
              {invoice.amount.toLocaleString()}원
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {showFooter && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>합계</TableCell>
            <TableCell className="text-right">
              {rows.reduce((sum, i) => sum + i.amount, 0).toLocaleString()}원
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
