import { Link } from 'react-router-dom'

const Footer = () => {
  const cols = [
    {
      title: 'Shop',
      links: [
        { label: 'Wallets', to: '/shop?category=wallets' },
        { label: 'Shoes', to: '/shop?category=shoes' },
        { label: 'Accessories', to: '/shop?category=accessories' },
        { label: 'Bags', to: '/shop?category=bags' },
        { label: 'Gift Sets', to: '/shop' },
      ],
    },
    {
      title: 'Service',
      links: [
        { label: 'Bespoke Orders', to: '/shop' },
        { label: 'Monogramming', to: '/shop' },
        { label: 'Repairs', to: '/shop' },
        { label: 'Size Guide', to: '/shop' },
        { label: 'Care Guide', to: '/shop' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Our Story', to: '/' },
        { label: 'The Workshop', to: '/' },
        { label: 'Contact', to: '/' },
        { label: 'Press', to: '/' },
      ],
    },
  ]

  return (
    <footer className="bg-deep border-t border-[#c9a84c]/10 pt-20 pb-8 px-16 max-md:px-6">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-4 gap-16 mb-16 max-md:grid-cols-2 max-md:gap-8">
          {/* Brand */}
          <div className="max-md:col-span-2">
            <Link to="/" className="font-serif text-2xl font-light tracking-[0.4em] text-cream block mb-4">
              VE<span className="text-gold">L</span>LUM
            </Link>
            <p className="text-[0.72rem] leading-8 text-cream-dim tracking-wide">
              Fine leather goods, crafted by hand in Pakistan. Shipped worldwide with care.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-[0.6rem] tracking-[0.3em] text-gold uppercase mb-6 font-sans font-normal">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-[0.72rem] text-cream-dim tracking-wide transition-colors duration-300 hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#c9a84c]/10 pt-8 flex items-center justify-between max-md:flex-col max-md:gap-2 max-md:text-center">
          <p className="text-[0.62rem] text-cream-dim tracking-widest">
            © 2024 <span className="text-gold">VELLUM</span> — All rights reserved.
          </p>
          <p className="text-[0.62rem] text-cream-dim tracking-widest">
            Crafted with care · <span className="text-gold">Pakistan</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
