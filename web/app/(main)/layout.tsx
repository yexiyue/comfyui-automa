export default function MainLayout({
  slider,
  children,
}: {
  // main: React.ReactNode;
  slider: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className=" flex flex-row">
      <section
        className="w-1/5 scrollbar-hide max-w-xs min-w-[200px]"
        style={{
          height: "calc(100vh - 56px)",
        }}
      >
        {slider}
      </section>
      <section className="flex-1 h-full p-4">{children}</section>
    </main>
  );
}
