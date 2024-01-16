import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
   slug: "users",
   fields: [
      {
         name: "users",
         type: "select",
         options: [
            { label: "Admin", value: "admin" },
            { label: "Users", value: "user" },
         ],
      },
   ],
};
