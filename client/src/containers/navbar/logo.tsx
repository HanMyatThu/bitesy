
export const Logo = () => {
  return (
    <a href="/">
      <div className="hidden md:flex lg:flex xl:flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg:background p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
          <img src="/images/logo.png"  height="48" width="48" alt="bitesy" />
        </div>
      </div>
    </a>
  );
};