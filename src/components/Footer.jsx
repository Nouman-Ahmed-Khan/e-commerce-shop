import { Link } from 'react-router-dom'

const cols = [
  {
    title: 'Shop',
    links: [
      { label: 'Wallets',     to: '/shop?category=wallets' },
      { label: 'Shoes',       to: '/shop?category=shoes' },
      { label: 'Accessories', to: '/shop?category=accessories' },
      { label: 'Bags',        to: '/shop?category=bags' },
      { label: 'Gift Sets',   to: '/shop' },
    ],
  },
  {
    title: 'Service',
    links: [
      { label: 'Bespoke Orders', to: '/shop' },
      { label: 'Monogramming',   to: '/shop' },
      { label: 'Repairs',        to: '/shop' },
      { label: 'Size Guide',     to: '/shop' },
      { label: 'Care Guide',     to: '/shop' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', to: '/' },
      { label: 'Workshop',  to: '/' },
      { label: 'Contact',   to: '/' },
      { label: 'Press',     to: '/' },
    ],
  },
]

// Footer is intentionally always dark (panel-dark) — matches brand's dark luxury feel
// In dark mode panel-dark resolves to black (#080806), in light to card-dark (#1a1510)
const Footer = () => (
  <footer className="bg-panel-dark border-t border-gold/[0.12] pt-20 pb-10 px-10
    transition-colors duration-300">
    <div className="max-w-[1300px] mx-auto">

      <div className="grid grid-cols-4 gap-12 mb-16 max-lg:grid-cols-2 max-lg:gap-10 max-md:grid-cols-1">

        <div>
          <Link to="/" className="font-serif font-light text-[1.55rem] tracking-[0.35em] text-cream block mb-5">
            VE<span className="text-gold">L</span>LUM
          </Link>
          <p className="text-[0.72rem] leading-loose text-cream-dim tracking-[0.04em]">
            Fine leather goods, crafted by hand in Pakistan. Shipped worldwide with care.
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="font-sans text-[0.58rem] tracking-[0.35em] text-gold uppercase mb-6">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-[0.85rem] list-none p-0">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-[0.72rem] text-cream-dim tracking-[0.04em]
                      transition-colors duration-300 hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gold/[0.12] pt-8 flex items-center justify-between flex-wrap gap-4">
        <p className="text-[0.62rem] text-cream-dim tracking-[0.08em]">
          © 2024 <span className="text-gold">VELLUM</span> — All rights reserved.
        </p>
        <p className="text-[0.62rem] text-cream-dim tracking-[0.08em]">
          Crafted with care · <span className="text-gold">Pakistan</span>
        </p>
      </div>

    </div>
  </footer>
)

export default Footer
