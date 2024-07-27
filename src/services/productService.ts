import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const products = [
    {
      title: "Produc0",
      image: "../../public/images/wallpaperflare.com_wallpaper (3).jpg",
      price: 300,
      stock: 531,
    },
    {
      title: "Produc1",
      image: "../../public/images/wallpaperflare.com_wallpaper (3).jpg",
      price: 20,
      stock: 220,
    },
    {
      title: "Produc2",
      image: "../../public/images/wallpaperflare.com_wallpaper (4).jpg",
      price: 25,
      stock: 120,
    },
    {
      title: "Produc3",
      image: "../../public/images/wallpaperflare.com_wallpaper (5).jpg",
      price: 15,
      stock: 130,
    },
    {
      title: "Produc4",
      image: "../../public/images/wallpaperflare.com_wallpaper (6).jpg",
      price: 15,
      stock: 224,
    },
    {
      title: "Produc5",
      image: "../../public/images/wallpaperflare.com_wallpaper (7).jpg",
      price: 13,
      stock: 203,
    },
    {
      title: "Produc6",
      image: "../../public/images/wallpaperflare.com_wallpaper (8).jpg",
      price: 19,
      stock: 167,
    },
    {
      title: "Produc7",
      image: "../../public/images/wallpaperflare.com_wallpaper (9).jpg",
      price: 23,
      stock: 213,
    },
    {
      title: "Produc8",
      image: "../../public/images/wallpaperflare.com_wallpaper (10).jpg",
      price: 27,
      stock: 442,
    },
    {
      title: "Produc9",
      image: "../../public/images/wallpaperflare.com_wallpaper (11).jpg",
      price: 30,
      stock: 432,
    },
    {
      title: "Produc10",
      image: "../../public/images/wallpaperflare.com_wallpaper (12).jpg",
      price: 35,
      stock: 331,
    },
  ];
  const existingProducts = await getAllProducts();
  if (existingProducts.length === 0) {
    await productModel.insertMany(products);
  }
};
