'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './Form';

type ProfileFormValues = {
  name: string;
  email: string;
};

export function FormDemo() {
  const [submitted, setSubmitted] = useState<ProfileFormValues | null>(null);
  const form = useForm<ProfileFormValues>({
    defaultValues: { name: '', email: '' },
  });
  // 하이
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => setSubmitted(values))}
        className="flex w-80 flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          rules={{ required: '이름을 입력해주세요.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input {...field} placeholder="이재건" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="jglee@arcsquare.ai"
                />
              </FormControl>
              <FormDescription>
                로그인을 위한 이메일 주소입니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">로그인</Button>

        {submitted && (
          <p className="text-[length:var(--text-body-sm)] text-[var(--color-text-success)]">
            안녕하세요. {submitted.name}님, 환영합니다.
          </p>
        )}
      </form>
    </Form>
  );
}
