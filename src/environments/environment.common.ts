export const environment = {
  rest: {
    url: "api/mvc/v1",
  },
  auth: {
    rememberMeExpiry: 30 * 24 * 60,
  },
  branding: {
    Clean-arch: {
      title: "Clean-arch Inc.",
      homePage: "https://Clean-arch.com",
      logo: {
        noTitle: {
          path: "assets/core/images/Clean-arch/logo-no-title.svg",
          height: 30,
          width: 38,
        },
        hTitle: {
          path: "assets/core/images/Clean-arch/logo-h-title.svg",
          height: 30,
          width: 138,
        },
        vTitle: {
          path: "assets/core/images/Clean-arch/logo-v-title.svg",
          height: 60,
          width: 62,
        },
      },
    },
    organization: {
      title: "Clean-arch Inc.",
      homePage: "https://Clean-arch.com",
      logo: {
        noTitle: {
          path: "assets/core/images/organization/logo-no-title.svg",
          height: 34,
          width: 42,
        },
        hTitle: {
          path: "assets/core/images/organization/logo-h-title.svg",
          height: 34,
          width: 158,
        },
        vTitle: {
          path: "assets/core/images/organization/logo-v-title.svg",
          height: 80,
          width: 82,
        },
      },
    },
  },
};
