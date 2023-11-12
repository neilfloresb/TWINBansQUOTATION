export interface NavigationEntry {
  name: string;
  text: string;
  level?: number;
  collapsed?: boolean;
  children?: NavigationEntry[];
  link?: string;
}
export const PATHS: NavigationEntry[] = [
  { name: "home", text: "Home", link: ""},
  // {
  //   name: "account_circle",
  //   text: "Fashion",
  //   level: 1,
  //   collapsed: true,
  //   children: [
  //     {
  //       name: "error",
  //       text: "Men",
  //       level: 2,
  //       collapsed: true,
  //       children: [
  //         { name: "error", text: "Shirts" },
  //         { name: "error", text: "Jackets" },
  //         { name: "error", text: "Chinos & Trausers" },
  //         { name: "error", text: "Jeans" },
  //         { name: "error", text: "T-Shirts" },
  //         { name: "error", text: "Underwear" }
  //       ]
  //     },
  //     {
  //       name: "error",
  //       text: "Women",
  //       level: 2,
  //       collapsed: true,
  //       children: [
  //         { name: "error", text: "Jackets" },
  //         { name: "error", text: "Knits" },
  //         { name: "error", text: "Jeans" },
  //         { name: "error", text: "Dreses" },
  //         { name: "error", text: "Blouses" },
  //         { name: "error", text: "T-Shirts" },
  //         { name: "error", text: "Underwear" }
  //       ]
  //     },
  //     {
  //       name: "error",
  //       text: "Children",
  //       level: 2,
  //       collapsed: true,
  //       children: [
  //         { name: "error", text: "Boys" },
  //         { name: "error", text: "Girls" }
  //       ]
  //     }
  //   ]
  // },
  {
    name: "account_circle",
    text: "Electronics",
    level: 1,
    collapsed: true,
    children: [
      { name: "error", text: "Camera & Photo", link:"/home/supplier/supplier" },
      { name: "error", text: "TV & Home Cinema", link: "/home/supplier/kustomer"},
      { name: "error", text: "Phones", link: "/home/supplier/supplier" },
      { name: "error", text: "PC & Video Games", link: ""}
    ]
  },
  {
    name: "account_circle",
    text: "Jewelry & Watches",
    level: 1,
    collapsed: true,
    children: [
      { name: "error", text: "Fine Jewelry" },
      { name: "error", text: "Fashion Jewelry" },
      { name: "error", text: "Watches" },
      {
        name: "error",
        text: "Wedding Jewelry",
        level: 2,
        collapsed: true,
        children: [
          { name: "error", text: "Engagement Rings" },
          { name: "error", text: "Bridal Sets" },
          { name: "error", text: "Women's Wedding Bands" },
          { name: "error", text: "Men's Wedding Bands" }
        ]
      }
    ]
  }
];
