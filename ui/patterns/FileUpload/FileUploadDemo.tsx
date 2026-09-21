'use client';

import { useState } from 'react';

import {
  type FileRejection,
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadList,
} from './FileUpload';

export type FileUploadDemoProps = {
  accept?: string;
  multiple?: boolean;
  maxSizeKb?: number;
};

const REJECTION_MESSAGE: Record<FileRejection['reason'], string> = {
  accept: '허용되지 않는 파일 형식입니다.',
  maxSize: '허용된 용량을 초과했습니다.',
};

/**
 * accept/multiple/maxSizeKb를 Controls로 조정해볼 수 있는 데모.
 * Storybook 전용, 공개 API 아님 (CardDemo/TableDemo와 동일 패턴).
 */
export function FileUploadDemo({
  accept,
  multiple = true,
  maxSizeKb,
}: FileUploadDemoProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [rejections, setRejections] = useState<FileRejection[]>([]);

  return (
    <FileUpload className="w-96">
      <FileUploadDropzone
        accept={accept}
        multiple={multiple}
        maxSize={maxSizeKb ? maxSizeKb * 1024 : undefined}
        onFilesSelected={(selected) => {
          setFiles((prev) => [...prev, ...selected]);
          setRejections([]);
        }}
        onFilesRejected={setRejections}
      />

      {rejections.length > 0 && (
        <ul className="flex flex-col gap-1">
          {rejections.map(({ file, reason }) => (
            <li
              key={file.name}
              className="text-[length:var(--text-caption)] text-[var(--color-text-error)]"
            >
              {file.name}: {REJECTION_MESSAGE[reason]}
            </li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <FileUploadList>
          {files.map((file, index) => (
            <FileUploadItem
              key={`${file.name}-${index}`}
              fileName={file.name}
              fileSize={file.size}
              onRemove={() =>
                setFiles((prev) => prev.filter((_, i) => i !== index))
              }
            />
          ))}
        </FileUploadList>
      )}
    </FileUpload>
  );
}
