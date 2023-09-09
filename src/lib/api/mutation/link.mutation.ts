import { arg, mutationType, nonNull } from 'nexus';
import { linkInputSchema } from '../../validation/schema';
import { Context } from '../context';

const LinkMutation = mutationType({
  definition(t) {
    t.nonNull.field('createLink', {
      type: 'Link',
      args: {
        input: nonNull(arg({ type: 'LinkInput' })),
      },
      authorize: async (_, _args, ctx: Context) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: (await ctx).user?.email,
          }
        })
        return !!ctx.user && user?.role === "ADMIN"
      },
      validate: () => ({
        input: linkInputSchema,
      }),
      resolve: (_, args) => {
        const { title, description, url, imageUrl, category } = args.input
        return prisma.link.create({
          data: {
            title,
            description,
            url,
            imageUrl,
            category,
          }
        })
      },
    });
  },
});



export default LinkMutation;
