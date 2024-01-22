import { User } from "../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

const addUser: BeforeChangeHook = ({ req, data }) => {
   const user = req.user as User | null;
   return { ...data, user: user?.id };
};

const yourOwnAndPurchased: Access = async ({ req }) => {
   const user = req.user as User | null;
   if (user?.role === "admin") return true;
   if (!user) return false;

   const { docs: products } = await req.payload.find({
      collection: "products",
      depth: 0, // this mean we just care about id not entire user
      where: {
         user: {
            equals: user.id,
         },
      },
   });

   const ownProductFileIds = products.map((product) => product.product_files).flat();

   const { docs: orders } = await req.payload.find({
      collection: "orders",
      depth: 2, // this mean we want just fetch user and products from orders collections
      where: {
         user: {
            equals: user.id,
         },
      },
   });

   const purchasedProductsFileIds = orders
      .map((order) => {
         return order.products.map((product) => {
            if (typeof product === "string")
               return req.payload.logger.error(
                  "Search depth not sufficient to find purchased file IDs"
               );

            // we say if type product it's string thats mean just one product and value is id
            //if not type to string it's mean entire product and we say just give product_files.id
            return typeof product.product_files === "string"
               ? product.product_files
               : product.product_files.id;
         });
      })
      .filter(Boolean)
      .flat();

   return {
      id: {
         in: [...ownProductFileIds, ...purchasedProductsFileIds],
      },
   };
};

export const ProductFiles: CollectionConfig = {
   slug: "product_files",
   admin: {
      hidden: ({ user }) => user.role !== "admin",
   },
   hooks: {
      beforeChange: [addUser],
   },
   access: {
      read: yourOwnAndPurchased,
      update: ({ req }) => req.user.role === "admin",
      delete: ({ req }) => req.user.role === "admin",
   },
   upload: {
      staticURL: "/product_files",
      staticDir: "product_files",
      mimeTypes: ["image/*", "font/*", "application/postscript"],
   },
   fields: [
      {
         name: "user",
         type: "relationship",
         relationTo: "users",
         admin: {
            condition: () => false,
         },
         hasMany: false,
         required: true,
      },
   ],
};
