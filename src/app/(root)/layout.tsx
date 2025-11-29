import React, { Suspense } from 'react';
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from '@/components/ui/sidebar';
import MainSidebar from '@/components/dashboard/sidebar';
import ConvexClientProvider from "@/components/auth/provider";
import { ErrorBoundary } from '@/components/errror-boundary';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
   <Suspense>
     <ErrorBoundary>
       
     <ConvexClientProvider>
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
   </ConvexClientProvider>
    </ErrorBoundary>
   </Suspense>
    
  );
};

export default Layout;