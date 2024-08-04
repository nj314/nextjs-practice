export default function BookHomeLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col w-full">
      {/* <TopNavBar /> */}
      {children}
    </div>
  );
}
