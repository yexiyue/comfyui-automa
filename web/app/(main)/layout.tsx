export default function MainLayout({
  children,
  slider,
}: {
  children: React.ReactNode;
  slider: React.ReactNode;
}) {
  return (
    <main className=" flex flex-row">
      <section
        className="w-1/5 scrollbar-hide"
        style={{
          height: "calc(100vh - 56px)",
        }}
      >
        {slider}
      </section>
      <section className="w-4/5 h-full">{children}</section>
    </main>
  );
}
