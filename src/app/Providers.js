"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from 'next-themes';

export const AuthProvider = ({ children }) => {
  return (
  <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
      <SessionProvider>
        {children}
    </SessionProvider>
  </ThemeProvider>
  );
};