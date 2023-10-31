export const footerData = [
  {
    id: 0,
    heading: "Company",
    content: [
      { id: 0, name: "Contact", href: "/contact" },
      { id: 1, name: "About us", href: "/about-us" },
      { id: 2, name: "Policy", href: "/about-us" },
    ],
  },
  {
    id: 1,
    heading: "Site Map",
    content: [
      { id: 1, name: "Top Deals", href: "/home#topCouponsSection" },
      { id: 2, name: "Stores", href: "/stores" },
      { id: 3, name: "Categories", href: "/categories" },
    ],
  },
  {
    id: 2,
    heading: "For You",
    content: [
      { id: 1, name: "Our Community", href: "/blogs" },
      { id: 2, name: "Latest Blogs", href: "/blogs" },
    ],
  },
  {
    id: 3,
    heading: "Best Deals",
    content: [
      { id: 1, name: "Top Stores", href: "/home#topStoresSection" },
      { id: 2, name: "Latest Coupons", href: "/home#latestCouponsSection" },
      {
        id: 3,
        name: "Coupons Expiring Soon",
        href: "/home#limitedTimeCouponsSection",
      },
    ],
  },
];

export const iconData = [
  {
    id: 0,
    img: "/socialMediaIcons/facebook.svg",
    url: import.meta.env.VITE_FACEBOOK_URL,
  },
  {
    id: 1,
    img: "/socialMediaIcons/twitter.svg",
    url: import.meta.env.VITE_TWITTER_URL,
  },
  {
    id: 2,
    img: "/socialMediaIcons/instagram.svg",
    url: import.meta.env.VITE_INSTAGRAM_URL,
  },
];
