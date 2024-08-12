import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          uucms: profile.uucms,
          email: profile.email,
          image: profile.image,
          role: profile.role,
          gender: profile.gender,
          caste: profile.caste,
          verified: profile.verified
        };
      },
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            console.log("Password does not match");
            return null;
          }

          console.log("User authenticated:", user);

          // Return the user object with all necessary fields
          return {
            id: user._id,
            name: user.name,
            uucms: user.uucms,
            email: user.email,
            role: user.role,
            gender: user.gender,
            caste: user.caste,
            verified: user.verified,
          };
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.name = user.name;
        token.uucms = user.uucms;
        token.email = user.email;
        token.role = user.role;
        token.gender = user.gender;
        token.caste = user.caste;
        token.verified = user.verified;
      }
      console.log("JWT Token:", token);
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.uucms = token.uucms;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.gender = token.gender;
        session.user.caste = token.caste;
        session.user.verified = token.verified;
      }
      console.log("Session:", session);
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 3600, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Customizing the sign-in page URL
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
