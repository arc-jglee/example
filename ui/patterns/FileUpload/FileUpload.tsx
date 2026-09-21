'use client';

import { FileText, Upload, X } from 'lucide-react';
import {
  type ChangeEvent,
  type ComponentProps,
  type DragEvent,
  type ReactNode,
  useState,
} from 'react';

import { Progress } from '../../components/Progress/Progress';
import { cn } from '../../utils/cn';

export type FileUploadProps = ComponentProps<'div'>;

export function FileUpload({ className, ...props }: FileUploadProps) {
  return <div className={cn('flex flex-col gap-3', className)} {...props} />;
}

export type FileRejection = { file: File; reason: 'accept' | 'maxSize' };

/**
 * `accept` 속성은 브라우저 파일 선택창에서 후보를 걸러줄 뿐, 드래그 앤 드롭으로
 * 들어온 파일에는 적용되지 않는다. 두 경로 모두 같은 기준으로 검증하기 위해
 * 직접 매칭한다.
 */
function matchesAccept(file: File, accept?: string): boolean {
  if (!accept) {
    return true;
  }

  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  return accept
    .split(',')
    .map((pattern) => pattern.trim().toLowerCase())
    .some((pattern) => {
      if (pattern.startsWith('.')) {
        return fileName.endsWith(pattern);
      }
      if (pattern.endsWith('/*')) {
        return fileType.startsWith(pattern.slice(0, -1));
      }
      return fileType === pattern;
    });
}

export type FileUploadDropzoneProps = Omit<
  ComponentProps<'label'>,
  'onDrop' | 'children'
> & {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxSize?: number;
  onFilesSelected: (files: File[]) => void;
  onFilesRejected?: (rejections: FileRejection[]) => void;
  children?: ReactNode;
};

export function FileUploadDropzone({
  className,
  accept,
  multiple = true,
  disabled,
  maxSize,
  onFilesSelected,
  onFilesRejected,
  children,
  ...props
}: FileUploadDropzoneProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  function processFiles(fileList: FileList) {
    const accepted: File[] = [];
    const rejected: FileRejection[] = [];

    for (const file of Array.from(fileList)) {
      if (!matchesAccept(file, accept)) {
        rejected.push({ file, reason: 'accept' });
      } else if (maxSize !== undefined && file.size > maxSize) {
        rejected.push({ file, reason: 'maxSize' });
      } else {
        accepted.push(file);
      }
    }

    if (accepted.length > 0) {
      onFilesSelected(accepted);
    }
    if (rejected.length > 0) {
      onFilesRejected?.(rejected);
    }
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDraggingOver(false);
    if (disabled) {
      return;
    }
    processFiles(event.dataTransfer.files);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      processFiles(event.target.files);
    }
    event.target.value = '';
  }

  return (
    <label
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) {
          setIsDraggingOver(true);
        }
      }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={handleDrop}
      className={cn(
        'flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--radius-xl)] border-2 border-dashed p-8 text-center transition-colors',
        'border-[var(--color-border-default)] text-[var(--color-text-secondary)]',
        'hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-subtle)]',
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--color-border-accent)] has-[:focus-visible]:ring-offset-2',
        'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 has-[:disabled]:hover:border-[var(--color-border-default)] has-[:disabled]:hover:bg-transparent',
        isDraggingOver &&
          'border-[var(--color-border-accent)] bg-[var(--color-bg-subtle)]',
        className,
      )}
      {...props}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
      />
      {children ?? (
        <>
          <Upload className="size-6" aria-hidden />
          <p className="text-[length:var(--text-body-sm)]">
            파일을 드래그하거나 클릭해서 업로드하세요
          </p>
        </>
      )}
    </label>
  );
}

export type FileUploadListProps = ComponentProps<'ul'>;

export function FileUploadList({ className, ...props }: FileUploadListProps) {
  return <ul className={cn('flex flex-col gap-2', className)} {...props} />;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes}B`;
  }

  const units = ['KB', 'MB', 'GB'];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value < 10 ? 1 : 0)}${units[unitIndex]}`;
}

export type FileUploadItemProps = Omit<ComponentProps<'li'>, 'children'> & {
  fileName: string;
  fileSize?: number;
  progress?: number;
  error?: string;
  onRemove?: () => void;
};

export function FileUploadItem({
  className,
  fileName,
  fileSize,
  progress,
  error,
  onRemove,
  ...props
}: FileUploadItemProps) {
  return (
    <li
      className={cn(
        'flex items-center gap-3 rounded-[var(--radius-lg)] border p-3',
        'border-[var(--color-border-default)] bg-[var(--color-bg-surface)]',
        error && 'border-[var(--color-border-error)]',
        className,
      )}
      {...props}
    >
      <FileText
        className="size-5 shrink-0 text-[var(--color-text-tertiary)]"
        aria-hidden
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-[length:var(--text-body-sm)] font-medium text-[var(--color-text-primary)]">
          {fileName}
        </p>
        {error ? (
          <p className="text-[length:var(--text-caption)] text-[var(--color-text-error)]">
            {error}
          </p>
        ) : (
          <>
            {fileSize !== undefined && (
              <p className="text-[length:var(--text-caption)] text-[var(--color-text-tertiary)]">
                {formatFileSize(fileSize)}
              </p>
            )}
            {progress !== undefined && (
              <Progress value={progress} className="h-1" />
            )}
          </>
        )}
      </div>

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="삭제"
          className={cn(
            'inline-flex h-8 w-8 shrink-0 items-center justify-center',
            'rounded-[var(--radius-md)] text-[var(--color-text-disabled)] transition-colors',
            'hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-secondary)]',
            'focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)] focus-visible:outline-none',
          )}
        >
          <X className="size-4" />
        </button>
      )}
    </li>
  );
}
