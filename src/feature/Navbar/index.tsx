import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type NavItem = {
  label: string
  icon: ReactNode
  href?: string
  active?: boolean
  badge?: string
}

type NavSection = {
  heading?: string
  items: NavItem[]
}

const IconBadge = ({ children }: { children: ReactNode }) => (
  <span className="sidebar-badge">{children}</span>
)

const IconCreate = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" className="sidebar-icon">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.875 10h6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 6.875v6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconTemplates = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" className="sidebar-icon">
    <rect x="3.75" y="3.75" width="12.5" height="12.5" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3.75 8.75h12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8.75 8.75v7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconFolder = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" className="sidebar-icon">
    <path d="M3.5 6.5a2 2 0 0 1 2-2H8l1.6 1.6c.19.19.45.3.72.3h3.18a2 2 0 0 1 2 2v5.6a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M3.5 8.5h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconShared = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" className="sidebar-icon">
    <circle cx="8" cy="7.5" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="13.25" cy="6.75" r="1.75" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3.5 15.25c0-2.07 1.68-3.75 3.75-3.75h1.5c2.07 0 3.75 1.68 3.75 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.5 13.5c.4-.74 1.18-1.25 2.07-1.25h.93c1.38 0 2.5 1.12 2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconNews = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" className="sidebar-icon">
    <path d="M12 4.75v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7.5 6.5 9 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16.5 6.5 15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12.25" r="4.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 14.5v-.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconUpgrade = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" className="sidebar-icon">
    <path d="m12 4 1.62 3.88 4.14.32-3.17 2.74.97 4.06L12 13.84l-3.56 2.16.97-4.06-3.17-2.74 4.14-.32z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)

const brandSections: NavSection[] = [
  {
    items: [
      { label: 'Create', icon: <IconCreate />, active: true },
      { label: 'Templates', icon: <IconTemplates /> },
    ],
  },
  {
    heading: 'Library',
    items: [
      { label: 'My designs', icon: <IconFolder /> },
      { label: 'Shared with me', icon: <IconShared /> },
    ],
  },
]

const supportItems: NavItem[] = [
  { label: "What's new", icon: <IconNews /> },
  {
    label: 'Upgrade to Pro',
    icon: <IconUpgrade />,
    badge: 'Pro',
  },
]

const BrandMark = () => (
  <div className="sidebar-brand">
    <div className="sidebar-brand__symbol" aria-hidden="true" />
    <div className="sidebar-brand__logotype" aria-hidden="true">
      <span>Playground</span>
    </div>
  </div>
)

const ProfileCard = () => (
  <button type="button" className="sidebar-profile" aria-label="User menu">
    <div className="sidebar-profile__avatar" aria-hidden="true">
      <span>VR</span>
    </div>
    <div className="sidebar-profile__meta">
      <span className="sidebar-profile__name">Viktor Riabkov</span>
      <span className="sidebar-profile__role">Workspace owner</span>
    </div>
  </button>
)

const NavList = ({ section }: { section: NavSection }) => (
  <div className="sidebar-section">
    {section.heading ? <h3 className="sidebar-heading">{section.heading}</h3> : null}
    <ul className="sidebar-list">
      {section.items.map((item) => (
        <li key={item.label}>
          <button type="button" className={`sidebar-pill${item.active ? ' sidebar-pill--active' : ''}`}>
            {item.icon}
            <span>{item.label}</span>
            {item.badge ? <IconBadge>{item.badge}</IconBadge> : null}
          </button>
        </li>
      ))}
    </ul>
  </div>
)

const SupportList = () => (
  <div className="sidebar-section">
    <ul className="sidebar-list">
      {supportItems.map((item) => (
        <li key={item.label}>
          <button type="button" className="sidebar-pill">
            {item.icon}
            <span>{item.label}</span>
            {item.badge ? <IconBadge>{item.badge}</IconBadge> : null}
          </button>
        </li>
      ))}
    </ul>
  </div>
)

const SidebarDivider = () => <div className="sidebar-divider" aria-hidden="true" />

export const Navbar = () => {
  return (
    <aside className="sidebar-root">
      <div className="sidebar-groups">
        <BrandMark />
        {brandSections.map((section) => (
          <NavList key={section.heading ?? 'primary'} section={section} />
        ))}
      </div>
      <div className="sidebar-footer">
        <SupportList />
        <SidebarDivider />
        <Link to="profile">
          <ProfileCard />
        </Link>
      </div>
    </aside>
  )
}

export default Navbar

