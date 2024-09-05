import { Link, useLocation } from "@tanstack/react-router";

const SideBar = () => {
  const { pathname } = useLocation();

  /* Menu Items */
  const items = [
    { text: "Todas", link: "/" },
    { text: "Pendientes", link: "/pendings" },
    { text: "Completadas", link: "/completeds" },
  ];

  return (
    <section className="border-r border-primary-900 p-2 lg:p-5 hidden lg:block col-span-1 bg-transparent mr-10">
      <div className="flex flex-col">
        {items.map((elm, i) => (
          <Link
            key={i}
            to={elm.link}
            className={`mb-3 tracking-wider px-4 py-1 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-700 cursor-pointer ${
              pathname === elm.link
                ? "bg-primary-100 dark:bg-primary-700"
                : "bg-transparent"
            }`}
          >
            {elm.text}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SideBar;
