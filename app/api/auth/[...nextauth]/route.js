import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    error:"/",
    signIn:"/",
    signOut:"/"
  },
}

const handler = NextAuth({
  ...authOptions
})

export { handler as GET, handler as POST }