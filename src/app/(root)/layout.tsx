import React, { Suspense } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import MainSidebar from '@/components/dashboard/sidebar';
import ConvexClientProvider from "@/components/auth/provider";
import { ErrorBoundary } from '@/components/errror-boundary';
import MobileBottomBar from '@/components/dashboard/mobile-navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
   <Suspense>
     <ErrorBoundary>
       
     <ConvexClientProvider>
      
             <SidebarProvider>
      <div className='w-full flex h-screen  bg-sidebar'>
      <MainSidebar/>
      <div className='h-screen  overflow-y-auto  flex-1  p-2'>
        <div className='bg-sidebar-accent  overflow-y-auto w-full rounded-xl h-full'>
            {children}
        </div>
      </div>
    </div>
    <MobileBottomBar/>
    </SidebarProvider>
  
   </ConvexClientProvider>
    </ErrorBoundary>
   </Suspense>
    
  );
};

export default Layout;