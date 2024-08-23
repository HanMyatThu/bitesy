export const Logo = () => {
  return (
    <a href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
          <img src="/logo.svg" height="32" width="32" alt="GamerHub" />
        </div>
      </div>
    </a>
  );
};