import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      id: undefined,
      name: undefined,
      email: undefined,
      twoFactorEnabled: null,
      pending2FA: null,

      login: (info) => {
        set({
          isLoggedIn: true,
          ...info,
        });
      },

      setUserInfo: (info) => {
        set(info);
        console.log("Auth Store Updated==>", useAuth.getState());
      },

      logState: () => {
        console.log("Current Auth Store State:", useAuth.getState());
      },

      logout: () => {
        set({
          isLoggedIn: false,
          id: undefined,
          name: undefined,
          email: undefined,
          twoFactorEnabled: null,
          pending2FA: null,
        });

        // Clear persisted storage
        localStorage.removeItem("auth");
      },
    }),
    { name: "auth" }
  )
);
