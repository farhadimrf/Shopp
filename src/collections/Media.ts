import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const isAdminOrHasAccessToImages =
   (): Access =>
   async ({ req }) => {
      const user = req.user as User | undefined;
      if (!user) return false;
      if (user.role === "admin") return true;
      return {
         user: {
            equals: req.user.id, // this mean only user with same id user when image create just allow to see
         },
      };
   };

export const Media: CollectionConfig = {
   slug: "media",
   hooks: {
      beforeChange: [
         ({ req, data }) => {
            return { ...data, user: req.user.id }; // attach data with user id when image create
         },
      ],
   },
   access: {
      read: async ({ req }) => {
         // this peace of code for if user logged in normal landing show all image
         // if they logged in sell panel(admin) don't show all image just show own image
         const referer = req.headers.referer;
         if (!req.user || !referer?.includes("sell")) {
            return true;
         }
         return await isAdminOrHasAccessToImages()({ req });
      },
      delete: isAdminOrHasAccessToImages(),
      update: isAdminOrHasAccessToImages(),
   },
   admin: {
      hidden: ({ user }) => user.role !== "admin", // this code for admin not see all media in project
   },
   upload: {
      staticURL: "/media",
      staticDir: "media",
      imageSizes: [
         {
            name: "thumbnail",
            width: 400,
            height: 300,
            position: "centre", // centre in uk :)
         },
         {
            name: "card",
            width: 768,
            height: 1024,
            position: "centre",
         },
         {
            name: "tablet",
            width: 1024,
            height: undefined,
            position: "centre",
         },
      ],
      mimeTypes: ["image/*"],
   },
   fields: [
      {
         name: "user",
         type: "relationship",
         relationTo: "users",
         required: true,
         hasMany: false,
         admin: {
            condition: () => false,
         },
      },
   ],
};
