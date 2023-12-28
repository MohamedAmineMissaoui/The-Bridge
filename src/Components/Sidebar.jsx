import { useRef, useState } from "react";
import "./Sidebar.css";

const menuItems = [
  {
    name: "Home",
    icon: "home",
  },
  {
    name: "Create",
    icon: "add_box",
  },
];

const Icon = ({ icon }) => (
  <span className="material-symbols-outlined">{icon}</span>
);

const NavHeader = () => (
  <header className="sidebar-header">
    <button className="nav-btn" type="button">
      <Icon icon="menu" />
    </button>
    <span>Admin</span>
  </header>
);

const NavButton = ({ onClick, name, icon, isActive, hasSubNav }) => (
  <button
    type="button"
    onClick={() => onClick(name)}
    className={`nav-btn ${isActive ? "active" : ""}`}
  >
    {icon && <Icon icon={icon} />}
    <span>{name}</span>
    {hasSubNav && <Icon icon="expand_more" />}
  </button>
);

const SubMenu = ({ item, activeItem, handleClick }) => {
  const navRef = useRef(null);

  const isSubNavOpen = (item, items) =>
    items.some((i) => i === activeItem) || item === activeItem;

  return (
    <div
      key={item.name}
      className={`sub-nav ${isSubNavOpen(item.name, item.items) ? "open" : ""}`}
      style={{
        height: !isSubNavOpen(item.name, item.items)
          ? 0
          : navRef.current?.clientHeight,
      }}
    >
      <div ref={navRef} className="sub-nav-inner">
        {item?.items.map((subItem) => (
          <NavButton
            onClick={handleClick}
            name={subItem}
            isActive={activeItem === subItem}
          />
        ))}
      </div>
    </div>
  );
};

export default function Sidebar({ onCreateClick, onHomeClick }) {
  const [activeItem, setActiveItem] = useState("");

  const handleClick = (item) => {
    console.log("activeItem", activeItem);
    setActiveItem(item !== activeItem ? item : "");
  };

  return (
    <aside className="sidebar">
      <NavHeader />
      {menuItems.map((item) => (
        <div key={item.name}>
          {!item.items && (
            <NavButton
              onClick={item.name === "Create" ? onCreateClick : onHomeClick}
              name={item.name}
              icon={item.icon}
              isActive={activeItem === item.name}
              hasSubNav={!!item.items}
            />
          )}
          {item.items && (
            <>
              <NavButton
                onClick={handleClick}
                name={item.name}
                icon={item.icon}
                isActive={activeItem === item.name}
                hasSubNav={!!item.items}
              />
              <SubMenu
                activeItem={activeItem}
                handleClick={handleClick}
                item={item}
              />
            </>
          )}
        </div>
      ))}
    </aside>
  );
}
