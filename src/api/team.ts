import { Api, Get, Params, useContext, ValidateHttp } from "@midwayjs/hooks";
import type { Context } from '@midwayjs/koa';
import { prisma } from './prisma';
import { z } from 'zod';

function useTeamId() {
  const ctx = useContext<Context>();
  return Number(ctx.params.id);
}

const IdSchema = z.object({
  id: z.string().regex(/^\d+$/),
});

type Id = z.infer<typeof IdSchema>;

export const getTeam = Api(
  Get('/api/team/:id'),
  Params<Id>(),
  ValidateHttp({ params: IdSchema }),
  async () => {
    const id = useTeamId();
    const post = await prisma.team.findUnique({
      where: { id },
    });
    return post;
  }
);
