import {
  Controls,
  Description,
  Markdown,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileUploadDemo } from './FileUploadDemo';

const PARTS = [
  {
    name: 'FileUpload',
    description: '전체를 감싸는 순수 레이아웃 컨테이너.',
    code: `<FileUpload className="w-96">...</FileUpload>`,
  },
  {
    name: 'FileUploadDropzone',
    description:
      '클릭 또는 드래그 앤 드롭으로 파일을 선택하는 영역. `accept`는 파일 선택창은 걸러주나 드래그 앤 드롭에는 걸러주지 않음, 두 경로 다 직접 재검증한다.<br/>유효한 파일은 `onFilesSelected`, 형식/용량이 안 맞는 파일은 `onFilesRejected`로 각각 넘어온다.',
    code: `<FileUploadDropzone
  accept=".pdf,.png"
  maxSize={5 * 1024 * 1024}
  onFilesSelected={(files) => ...}
  onFilesRejected={(rejections) => ...}
/>`,
  },
  {
    name: 'FileUploadList / FileUploadItem',
    description:
      '선택된 파일 목록. `progress`(0~100)를 주면 업로드 진행률을, `error`를 주면 용량 대신 에러 메시지를 보여준다. `onRemove`가 있을 때만 삭제 버튼이 렌더링된다.',
    code: `<FileUploadList>
  <FileUploadItem
    fileName="작업지시서.pdf"
    fileSize={204800}
    onRemove={() => ...}
  />
</FileUploadList>`,
  },
] as const;

const DocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Description />

    <Primary />
    <Controls />

    <h2>구성 요소</h2>
    {PARTS.map((part) => (
      <div key={part.name} style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 4 }}>{part.name}</h3>
        <Markdown style={{ color: 'var(--color-text-tertiary)', fontSize: 13 }}>
          {part.description}
        </Markdown>
        <Source code={part.code} language="tsx" />
      </div>
    ))}

    <Stories includePrimary={false} title="다른 예시" />
  </>
);

const meta: Meta<typeof FileUploadDemo> = {
  title: 'Patterns/FileUpload',
  component: FileUploadDemo,
  args: {
    accept: '',
    multiple: true,
    maxSizeKb: 0,
  },
  argTypes: {
    accept: {
      control: 'text',
      description:
        '허용 형식자 지정(`.pdf,.png` 또는 `image/*`). 비워두면 모든 형식 허용.',
    },
    multiple: { control: 'boolean' },
    maxSizeKb: {
      control: { type: 'number', min: 0, step: 100 },
      description: '허용 최대 용량(KB). 0이면 제한 없음.',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      page: DocsPage,
      description: {
        component:
          '네이티브 `<input type="file">`의 파일 업로드 복합 컴포넌트. / 드래그 앤 드롭 이벤트를 감싼 서브 컴포넌트 세트로 구성했다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUploadDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `function Example() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload className="w-96">
      <FileUploadDropzone
        onFilesSelected={(selected) => setFiles((prev) => [...prev, ...selected])}
      />

      {files.length > 0 && (
        <FileUploadList>
          {files.map((file, index) => (
            <FileUploadItem
              key={\`\${file.name}-\${index}\`}
              fileName={file.name}
              fileSize={file.size}
              onRemove={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
            />
          ))}
        </FileUploadList>
      )}
    </FileUpload>
  );
}`,
      },
    },
  },
};
