import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Accordion';

const FAQ_ITEMS = [
  {
    value: 'shipping',
    question: '주문은 배송되나요?',
    answer: '결제 완료 후 1~3영업일 이내에 배송이 시작됩니다.',
  },
  {
    value: 'returns',
    question: '반품이 가능한가요?',
    answer: '수령 후 30일 이내에 무료로 반품할 수 있습니다.',
  },
  {
    value: 'support',
    question: '고객센터 운영 시간은?',
    answer: '평일 오전 9시부터 오후 6시까지 운영합니다.',
  },
];

function FaqItems() {
  return (
    <>
      {FAQ_ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </>
  );
}

type AccordionDemoProps = {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
};

function AccordionDemo({
  type = 'single',
  collapsible = true,
}: AccordionDemoProps) {
  if (type === 'multiple') {
    return (
      <Accordion
        type="multiple"
        defaultValue={['shipping', 'returns']}
        className="w-96"
      >
        <FaqItems />
      </Accordion>
    );
  }

  return (
    <Accordion
      type="single"
      collapsible={collapsible}
      defaultValue="returns"
      className="w-96"
    >
      <FaqItems />
    </Accordion>
  );
}

const meta: Meta<typeof AccordionDemo> = {
  title: 'Components/Disclosure/Accordion',
  component: AccordionDemo,
  tags: ['autodocs'],
  args: {
    type: 'single',
    collapsible: true,
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      description:
        '한 번에 하나만 펼칠지(single), 여러 항목을 동시에 펼칠 수 있는지(multiple) 여부',
    },
    collapsible: {
      control: 'boolean',
      description:
        '열려 있는 항목을 다시 클릭해 닫을 수 있는지 여부 (single 모드에서만 적용)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AccordionDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Accordion type="single" collapsible defaultValue="returns" className="w-96">
  <AccordionItem value="shipping">
    <AccordionTrigger>주문은 배송되나요?</AccordionTrigger>
    <AccordionContent>
      결제 완료 후 1~3영업일 이내에 배송이 시작됩니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionTrigger>반품이 가능한가요?</AccordionTrigger>
    <AccordionContent>수령 후 30일 이내에 무료로 반품할 수 있습니다.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="support">
    <AccordionTrigger>고객센터 운영 시간은?</AccordionTrigger>
    <AccordionContent>평일 오전 9시부터 오후 6시까지 운영합니다.</AccordionContent>
  </AccordionItem>
</Accordion>`,
      },
    },
  },
};

export const Multiple: Story = {
  tags: ['!dev'],
  args: {
    type: 'multiple',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Accordion type="multiple" defaultValue={['shipping', 'returns']} className="w-96">
  <AccordionItem value="shipping">
    <AccordionTrigger>주문은 배송되나요?</AccordionTrigger>
    <AccordionContent>
      결제 완료 후 1~3영업일 이내에 배송이 시작됩니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionTrigger>반품이 가능한가요?</AccordionTrigger>
    <AccordionContent>수령 후 30일 이내에 무료로 반품할 수 있습니다.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="support">
    <AccordionTrigger>고객센터 운영 시간은?</AccordionTrigger>
    <AccordionContent>평일 오전 9시부터 오후 6시까지 운영합니다.</AccordionContent>
  </AccordionItem>
</Accordion>`,
      },
    },
  },
};
