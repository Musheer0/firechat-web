import React from 'react';
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from '@/components/ui/sidebar';
import MainSidebar from '@/components/dashboard/sidebar';
import ConvexClientProvider from "@/components/auth/provider";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from '@clerk/themes'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <ClerkProvider
        appearance={{
        baseTheme: shadcn,
      }}
      >
     <ConvexClientProvider>
     <html lang="en"
     suppressContentEditableWarning
     >
      <body
      suppressHydrationWarning
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
             <SidebarProvider>
      <div className='w-full flex h-screen  bg-sidebar'>
      <MainSidebar/>
      <div className='h-screen  flex-1  p-2'>
        <div className='bg-sidebar-accent w-full rounded-xl h-full'>
            {children}
        </div>
      </div>
    </div>
    </SidebarProvider>
            
          </ThemeProvider>
      </body>
    </html>
   </ConvexClientProvider>
  </ClerkProvider>
    
  );
};

export default Layout;