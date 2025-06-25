import NextAuth from "next-auth";

import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    async signIn(params) {
      console.log("⭐ params", params);

      // const id_token = userDetail.account?.id_token;
      // if (!id_token) return false;
      // const res = await login_google(id_token);  // some action that sends the token to my backend and retrieves the access token
      // const access_token = res.access_token;
      // if (!access_token) return false;
      // userDetail.user.access_token = access_token;

      return true;
    },

    authorized({ request, auth }) {
      // console.log("⭐ authorized", { request, auth });

      // debugger;
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
    jwt({ token, trigger, session, account }) {
      // console.log("⭐ jwt", { token, trigger, session, account });

      if (trigger === "update") token.name = session.user.name;
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken;

      return session;
    },
  },
});
