const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen pt-16  bg-muted flex items-start justify-center">{children}</div>;
};

export default Layout;
