export default function LiveBackground() {
  // to reduced CPU usage, animations are disabled
  return (
    <div className="fixed top-0 left-0 h-[100vh] w-[100vw] opacity-30">
      <span className="absolute -bottom-10 -right-10 h-80 w-80 rounded-full bg-pink-500" />
      <span className="absolute bottom-44 right-36 h-96 w-96 rounded-full bg-primary" />
      <span className="absolute -bottom-10 right-80 h-64 w-64 rounded-full bg-blue-500" />
    </div>
  );
}
