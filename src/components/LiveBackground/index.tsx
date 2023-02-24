export default function LiveBackground() {
  return (
    <div className="fixed top-0 left-0 h-[100vh] w-[100vw] opacity-30">
      <span className="absolute -bottom-10 -right-10 h-52 w-52 rounded-full bg-pink-500" />
      <span className="absolute bottom-36 right-24 h-72 w-72 rounded-full bg-primary" />
      <span className="absolute bottom-0 right-72 h-52 w-64 rounded-full bg-blue-500" />
    </div>
  );
}
