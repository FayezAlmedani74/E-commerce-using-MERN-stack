import productModel from "../models/productModel";
import redisClient from "../utils/redisClient";

export const getAllProducts = async () => {
  const cachedProducts = await redisClient.get("products");
  if (cachedProducts) {
    return JSON.parse(cachedProducts);
  }
  const products = await productModel.find();
  await redisClient.set("products", JSON.stringify(products), "EX", 60);

  return products;
};
export const getPaginatedProducts = async (
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;
  const paginatedProducts = productModel.find().skip(skip).limit(limit);
  await redisClient.set(
    "paginatedProducts",
    JSON.stringify(paginatedProducts),
    "EX",
    60
  );

  return paginatedProducts;
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "NIKE Sportswear Women's Shoes",
        image: "https://m.media-amazon.com/images/I/71M5zTk2EdL._AC_SX575_.jpg",
        price: 70,
        stock: 51,
      },
      {
        title: "adidas Men's Response Running Sneaker",
        image: "https://m.media-amazon.com/images/I/71vhceIm0ZL._AC_SY695_.jpg",
        price: 59,
        stock: 220,
      },
      {
        title: "ASICS Gel-Lyte XXX",
        image: "https://m.media-amazon.com/images/I/51nvdbzQ7TL._AC_SY695_.jpg",
        price: 107,
        stock: 120,
      },
      {
        title: "ASICS Men's Gel-Trabuco 13 Running Shoes",
        image: "https://m.media-amazon.com/images/I/61dIx5AMnDL._AC_SY695_.jpg",
        price: 139,
        stock: 130,
      },
      {
        title: "Nike mens Air Max 97",
        image: "https://m.media-amazon.com/images/I/61YSZdoMtsL._AC_SY741_.jpg",
        price: 152,
        stock: 224,
      },
      {
        title: "Nike Air Max Plus SE TN1 Tuned Men's Sneaker",
        image: "https://m.media-amazon.com/images/I/71I77ncpAML._AC_SX575_.jpg",
        price: 222,
        stock: 203,
      },
      {
        title:
          "JARLIF Men's Lightweight Athletic Running Shoes Breathable Sport Air Fitness Gym Jogging Sneakers",
        image: "https://m.media-amazon.com/images/I/81PggGpgBkL._AC_SY695_.jpg",
        price: 47,
        stock: 167,
      },
      {
        title:
          "TSIODFO Men Sneakers Fashion Sport Running Athletic Tennis Walking Shoes",
        image: "https://m.media-amazon.com/images/I/713nWtU3HqL._AC_SY695_.jpg",
        price: 39,
        stock: 213,
      },
      {
        title: "Nike Women's Running Shoes",
        image: "https://m.media-amazon.com/images/I/61GNW4P2O2L._AC_SX695_.jpg",
        price: 183,
        stock: 442,
      },
      {
        title: "Nike Men's Basketball Shoes",
        image: "https://m.media-amazon.com/images/I/61C0BTLAZEL._AC_SX695_.jpg",
        price: 262,
        stock: 432,
      },
      {
        title: "Men's Low Basketball Shoes Wear-Resistant Fashion Sneakers",
        image: "https://m.media-amazon.com/images/I/51ZUUwlAlXL._AC_SY695_.jpg",
        price: 187,
        stock: 331,
      },
      {
        title: "Nike Men's Low-top Sneakers",
        image: "https://m.media-amazon.com/images/I/61Us1w5gqNL._AC_SX569_.jpg",
        price: 88,
        stock: 651,
      },
      {
        title:
          "Moodeng Men's Basketball Shoes Anti-Slip Breathable Running Shoes Fahsion Sneakers Lightweight Outdoor Gym Shoes",
        image: "https://m.media-amazon.com/images/I/71ruNAq8GnL._AC_SY695_.jpg",
        price: 42,
        stock: 123,
      },
      {
        title: "ASICS Women's Gel-Excite 10 Running Shoes",
        image: "https://m.media-amazon.com/images/I/614bQsiks-L._AC_SY695_.jpg",
        price: 70,
        stock: 70,
      },
      {
        title: "ASICS Women's GT-2000 13 Running Shoes",
        image: "https://m.media-amazon.com/images/I/5105NDCY1TL._AC_SY695_.jpg",
        price: 149,
        stock: 24,
      },
      {
        title: "Nike Air Force 1'07 Mens Shoes Size-11.5",
        image: "https://m.media-amazon.com/images/I/71RcNT7g70L._AC_SX695_.jpg",
        price: 139,
        stock: 542,
      },
      {
        title: "adidas Men's Grand Court Alpha 00s Sneaker",
        image: "https://m.media-amazon.com/images/I/81bK5kBDhQL._AC_SX695_.jpg",
        price: 61,
        stock: 64,
      },
      {
        title: "PUMA Men's Softride Symmetry Fuzion Running Shoe Sneaker",
        image: "https://m.media-amazon.com/images/I/61uyKbmXIaL._AC_SY695_.jpg",
        price: 65,
        stock: 112,
      },
    ];
    const existingProducts = await getAllProducts();
    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
      console.log("redis");
      await redisClient.del("products");
    }
  } catch (error) {
    console.log("cannot see database", error);
  }
};
//  const products = [
//       {
//         title: "unpaired teal air jordan",
//         // image: "/images/wallpaperflare.com_wallpaper (3).jpg",
//         image:
//           "https://c0.wallpaperflare.com/preview/37/157/160/unpaired-teal-air-jordan-1-shoe.jpg",
//         price: 300,
//         stock: 531,
//       },
//       {
//         title: "Produc1",
//         // image: "/images/wallpaperflare.com_wallpaper (3).jpg",
//         image:
//           // "https://c0.wallpaperflare.com/preview/102/725/145/pair-of-carhartt-x-nike-air-force-1-shoes.jpg",
//           "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D"
//         price: 20,
//         stock: 220,
//       },
//       {
//         title: "Produc2",
//         // image: "/images/wallpaperflare.com_wallpaper (4).jpg",
//         image:
//           "https://c0.wallpaperflare.com/preview/28/600/957/pair-of-black-white-and-red-air-jordan-1-shoes.jpg",
//         price: 25,
//         stock: 120,
//       },
//       {
//         title: "Produc3",
//         // image: "/images/wallpaperflare.com_wallpaper (5).jpg",
//         image:
//           "https://c0.wallpaperflare.com/preview/206/873/135/gray-and-black-nike-air-jordan-1-s.jpg",
//         price: 15,
//         stock: 130,
//       },
//       {
//         title: "Produc4",
//         // image: "/images/wallpaperflare.com_wallpaper (6).jpg",
//         image:
//           "https://c0.wallpaperflare.com/preview/762/772/865/pair-of-white-and-blue-air-jordan-1-s.jpg",
//         price: 15,
//         stock: 224,
//       },
//       {
//         title: "Produc5",
//         // image: "/images/wallpaperflare.com_wallpaper (7).jpg",
//         image:
//           "https://c0.wallpaperflare.com/preview/298/846/442/pair-of-black-and-white-air-jordan-13-shoes-on-gray-surface.jpg",
//         price: 13,
//         stock: 203,
//       },
//       {
//         title: "Produc6",
//         // image: "/images/wallpaperflare.com_wallpaper (8).jpg",
//         image:
//           "https://c1.wallpaperflare.com/preview/1005/511/651/sneaker-shoe-nike-jordan.jpg",
//         price: 19,
//         stock: 167,
//       },
//       {
//         title: "Produc7",
//         // image: "/images/wallpaperflare.com_wallpaper (9).jpg",
//         image:
//           "https://c1.wallpaperflare.com/preview/607/632/932/shoe-trainer-nike-air-max.jpg",
//         price: 23,
//         stock: 213,
//       },
//       {
//         title: "Produc8",
//         // image: "/images/wallpaperflare.com_wallpaper (10).jpg",
//         image:
//           "https://c4.wallpaperflare.com/wallpaper/250/588/894/shoes-lebron-ball-nike-wallpaper-preview.jpg",
//         price: 27,
//         stock: 442,
//       },
//       {
//         title: "Produc9",
//         // image: "/images/wallpaperflare.com_wallpaper (11).jpg",
//         image:
//           "https://c0.wallpaperflare.com/preview/2/522/500/pair-of-brown-and-white-nike-mid-rise-sneakers-on-gray-concrete-pavement.jpg",
//         price: 30,
//         stock: 432,
//       },
//       {
//         title: "Produc10",
//         // image: "/images/wallpaperflare.com_wallpaper (12).jpg",
//         image:
//           "https://c0.wallpaperflare.com/preview/125/443/739/white-nike-air-high-top-and-box.jpg",
//         price: 35,
//         stock: 331,
//       },
//     ];
