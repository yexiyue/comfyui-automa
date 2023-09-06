export default function MainLayout({
  main,
  slider,
}: {
  main: React.ReactNode;
  slider: React.ReactNode;
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
      <section className="flex-1 h-full p-4">{main}</section>
    </main>
  );
}
