'use client';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-2 items-start">
      <h1> Dashboard root page</h1>
      {/* <Authenticated>Logged in</Authenticated>
      <Unauthenticated>Logged out</Unauthenticated>
      <AuthLoading>Still loading</AuthLoading> */}

      <div>This screen is for authenticated users only</div>
    </div>
  );
}
