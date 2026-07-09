import { cache } from 'react';
import prisma from '@/lib/prisma';

export const getGlobalSettings = cache(async () => {
  const settings = await prisma.setting.findMany();
  return settings.reduce((acc: Record<string, string>, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {} as Record<string, string>);
});
