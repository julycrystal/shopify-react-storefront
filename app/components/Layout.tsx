import React from 'react';

type LayoutProps = {
  title: string;
};

export function Layout({
  children,
  title,
}: React.PropsWithChildren<LayoutProps>) {
  return (
    <div className="flex flex-col min-h-screen antialiased bg-neutral-50">
      <main
        role="main"
        id="mainContent"
        className="w-[960px] h-[540px] bg-white"
      >
        {children}
      </main>
    </div>
  );
}
