import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { FavouriteIcon, GithubIcon, NewTwitterIcon } from 'hugeicons-react';

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 pt-16 pb-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 shadow-md shadow-violet-600/20">
                <Image
                  src="/habitica_white.png"
                  alt="Habitica Sync Logo"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              </div>
              <span className="font-bold text-slate-900">Habitica Sync</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              Level up your RPG character automatically while you code. Open
              source, secure, and built for developers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3">
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-slate-900">Product</h4>
              <Link
                href="/"
                className="text-sm text-slate-600 transition-colors hover:text-violet-600"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-sm text-slate-600 transition-colors hover:text-violet-600"
              >
                Dashboard
              </Link>
              <Link
                href="https://github.com/apps/habitica-integration"
                target="_blank"
                className="text-sm text-slate-600 transition-colors hover:text-violet-600"
              >
                Install App
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-slate-900">Resources</h4>
              <Link
                href="https://github.com/drazenbebic/habitica"
                target="_blank"
                className="text-sm text-slate-600 transition-colors hover:text-violet-600"
              >
                GitHub Repo
              </Link>
              <Link
                href="https://habitica.com"
                target="_blank"
                className="text-sm text-slate-600 transition-colors hover:text-violet-600"
              >
                Habitica
              </Link>
              <Link
                href="https://habitica.fandom.com/wiki/Habitica_Wiki"
                target="_blank"
                className="text-sm text-slate-600 transition-colors hover:text-violet-600"
              >
                Wiki
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-slate-900">Legal</h4>
              <Link
                href="/imprint"
                className="text-sm text-slate-600 transition-colors hover:text-violet-600"
              >
                Imprint (Impressum)
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm text-slate-600 transition-colors hover:text-violet-600"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Habitica Sync. Not affiliated with Habitica.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <span>Made with</span>
              <FavouriteIcon size={16} className="text-red-500 fill-red-500" />
              <span>by</span>
              <a
                href="https://www.bebic.dev"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-900 transition-colors hover:text-violet-600"
              >
                Drazen Bebic
              </a>
              <span>in Vienna</span>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/drazenbebic"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition-colors hover:text-slate-900"
              >
                <GithubIcon size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://twitter.com/drazenbebic"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition-colors hover:text-slate-900"
              >
                <NewTwitterIcon size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
