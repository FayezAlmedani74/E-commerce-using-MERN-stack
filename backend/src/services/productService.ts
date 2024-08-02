import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Produc0",
        // image: "/images/wallpaperflare.com_wallpaper (3).jpg",
        image:
          "https://c0.wallpaperflare.com/preview/37/157/160/unpaired-teal-air-jordan-1-shoe.jpg",
        price: 300,
        stock: 531,
      },
      {
        title: "Produc1",
        // image: "/images/wallpaperflare.com_wallpaper (3).jpg",
        image:
          "https://c0.wallpaperflare.com/preview/102/725/145/pair-of-carhartt-x-nike-air-force-1-shoes.jpg",
        price: 20,
        stock: 220,
      },
      {
        title: "Produc2",
        // image: "/images/wallpaperflare.com_wallpaper (4).jpg",
        image:
          "https://c0.wallpaperflare.com/preview/28/600/957/pair-of-black-white-and-red-air-jordan-1-shoes.jpg",
        price: 25,
        stock: 120,
      },
      {
        title: "Produc3",
        // image: "/images/wallpaperflare.com_wallpaper (5).jpg",
        image:
          "https://c0.wallpaperflare.com/preview/206/873/135/gray-and-black-nike-air-jordan-1-s.jpg",
        price: 15,
        stock: 130,
      },
      {
        title: "Produc4",
        // image: "/images/wallpaperflare.com_wallpaper (6).jpg",
        image:
          "https://c0.wallpaperflare.com/preview/762/772/865/pair-of-white-and-blue-air-jordan-1-s.jpg",
        price: 15,
        stock: 224,
      },
      {
        title: "Produc5",
        // image: "/images/wallpaperflare.com_wallpaper (7).jpg",
        image:
          "https://c0.wallpaperflare.com/preview/298/846/442/pair-of-black-and-white-air-jordan-13-shoes-on-gray-surface.jpg",
        price: 13,
        stock: 203,
      },
      {
        title: "Produc6",
        // image: "/images/wallpaperflare.com_wallpaper (8).jpg",
        image:
          "https://c1.wallpaperflare.com/preview/1005/511/651/sneaker-shoe-nike-jordan.jpg",
        price: 19,
        stock: 167,
      },
      {
        title: "Produc7",
        // image: "/images/wallpaperflare.com_wallpaper (9).jpg",
        image:
          "https://c1.wallpaperflare.com/preview/607/632/932/shoe-trainer-nike-air-max.jpg",
        price: 23,
        stock: 213,
      },
      {
        title: "Produc8",
        // image: "/images/wallpaperflare.com_wallpaper (10).jpg",
        image:
          "https://c4.wallpaperflare.com/wallpaper/250/588/894/shoes-lebron-ball-nike-wallpaper-preview.jpg",
        price: 27,
        stock: 442,
      },
      {
        title: "Produc9",
        // image: "/images/wallpaperflare.com_wallpaper (11).jpg",
        image:
          "https://c0.wallpaperflare.com/preview/2/522/500/pair-of-brown-and-white-nike-mid-rise-sneakers-on-gray-concrete-pavement.jpg",
        price: 30,
        stock: 432,
      },
      {
        title: "Produc10",
        // image: "/images/wallpaperflare.com_wallpaper (12).jpg",
        image:
          "https://c0.wallpaperflare.com/preview/125/443/739/white-nike-air-high-top-and-box.jpg",
        price: 35,
        stock: 331,
      },
    ];
    const existingProducts = await getAllProducts();
    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (error) {
    console.log("cannot see database", error);
  }
};
