export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "DaoPage",
      href: "/daoPage",
    },
    {
      label: "BattlePage",
      href: "/battlePage",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
    },
    {
      label: "MemePet",
      href: "/memePet",
    },
    {
      label: "DaoPage",
      href: "/daoPage",
    },
    {
      label: "BattlePage",
      href: "/battlePage",
    },
  ],
  links: {
    github: "https://github.com/frontio-ai/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "/dashboard",
  },
};
