import { Link } from "@tanstack/react-router";

export const Logo = () => {
  return (
    <Link to="/">
      <div className="hidden items-center gap-x-4 transition hover:opacity-75 md:flex lg:flex xl:flex">
        <div className="bg:background mr-12 shrink-0 p-1 lg:mr-0 lg:shrink">
          <img src="/images/logo.png" height="48" width="48" alt="bitesy" />
        </div>
      </div>
    </Link>
  );
};
