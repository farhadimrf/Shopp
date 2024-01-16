import { AuthCredentialsValidator } from "@/lib/validators/account-credentials-validators";
import { publicProcedure, router } from "./trpc";
import { getPayLoadClient } from "@/get-payload";

export const authRouter = router({
   createPayloadUSer: publicProcedure
      .input(AuthCredentialsValidator)
      .mutation(async ({ input }) => {
         const { email, password } = input;
         const payload = await getPayLoadClient();
      }),
});
