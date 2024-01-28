import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";

export const paymentRouter = router({
   createSession: privateProcedure
      .input(z.object({ productIds: z.array(z.string()) }))
      .mutation(({ ctx, input }) => {
         const { user } = ctx;
         let { productIds } = input;
      }),
});
