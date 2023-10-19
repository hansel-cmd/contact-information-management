import * as route from "./route";

export const NAVIGATION = [
  {
    path: route.INDEX,
    name: "All Contacts",
    icon: "bi bi-file-earmark-person",
    iconFilled: "bi bi-file-earmark-person-fill",
  },
  {
    path: "/favorites",
    name: "Favorites",
    icon: "bi bi-star",
    iconFilled: "bi bi-star-fill",
  },
  {
    path: "/blocked",
    name: "Blocked",
    icon: "bi bi-slash-circle",
    iconFilled: "bi bi-slash-circle-fill",
  },
];

export const ACTIONS = [
  {
    path: "/new-contact",
    name: "New Contact",
    icon: "bi bi-plus-circle",
    iconFilled: "bi bi-plus-circle-fill",
  },
  {
    path: "/update-profile",
    name: "Update Profile",
    icon: "bi bi-floppy",
    iconFilled: "bi bi-floppy-fill",
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "bi bi-gear",
    iconFilled: "bi bi-gear-fill",
  },
];

export const OTHERS = [
  {
    path: "/sign-out",
    name: "Sign Out",
    icon: "bi bi-door-open",
    iconFilled: "bi bi-door-open-fill",
  },
];
