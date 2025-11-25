import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ config }) {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          {config.footer?.links?.map((link, index) => (
            link.to ? (
              <Link
                key={index}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            )
          ))}
        </div>
        {config.footer?.copyright && (
          <p className="text-sm text-muted-foreground">{config.footer.copyright}</p>
        )}
      </div>
    </footer>
  );
}

export default Footer;
