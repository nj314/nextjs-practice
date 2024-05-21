export function LandingPage() {
  return (
    <div className="">
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] hidden md:block">
          Check out some examples
        </h1>
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] md:hidden">
          Examples
        </h1>
        <span className="text-center text-lg font-light text-foreground inline-block align-top decoration-inherit max-w-[494px]">
          Dashboard, cards, authentication. Some examples built using the
          components. Use this as a guide to build your own.
        </span>
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <a
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-[6px]"
            href="/docs"
          >
            Get Started
          </a>
          <a
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 rounded-[6px]"
            href="/components"
          >
            Components
          </a>
        </div>
      </section>
    </div>
  );
}
