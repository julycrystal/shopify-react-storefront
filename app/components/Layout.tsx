import React from 'react';

type LayoutProps = {
  title: string;
};

export function Layout({
  children,
  title,
}: React.PropsWithChildren<LayoutProps>) {
  return (
    <div className="flex min-h-screen antialiased bg-neutral-50">
      <main className="w-[960px] h-[540px] px-[60px] py-[30px] bg-white">
        {children}
      </main>
    </div>
  );
}
