import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayLoadClient } from "../get-payload";

export const paymentRouter = router({
   createSession: privateProcedure
      .input(z.object({ productIds: z.array(z.string()) }))
      .mutation(async ({ ctx, input }) => {
         const { user } = ctx;
         let { productIds } = input;
         if (productIds.length === 0) {
            throw new TRPCError({ code: "BAD_REQUEST" });
         }

         const payload = await getPayLoadClient();
         const { docs: products } = await payload.find({
            collection: "products",
            where: {
               id: {
                  in: productIds,
               },
            },
         });
      }),
});
