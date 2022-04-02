/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { FC, ReactNode, useContext, useState } from 'react';
import { Avatar, HomeIcon, SearchIcon } from 'components';
import { SidebarContext } from 'contexts';
import { useRouter } from 'next/router';
import { colors } from 'utils';
import { SlidersIcon } from 'components/Icons';

const iconColors = {
  active: colors.indigo[50],
  inactive: colors.indigoGray[90],
};

export const Sidebar: FC = () => {
  const { isOpen } = useContext(SidebarContext);
  const router = useRouter();
  const { pathname } = router;

  const goToSearch = () => {
    router.push('/');
  };

  return (
    <>
      <Avatar
        src="/new-logo.svg"
        height="32px"
        width="32px"
        alt="Mazury logo"
        className={`${isOpen ? 'ml-4' : 'mx-auto'}`}
      />

      <Divider className="mx-3 mt-8" />

      <menu
        className={`mt-12 flex flex-col text-xl font-bold ${
          isOpen ? 'items-start' : 'items-center'
        } h-[100%] px-3`}
      >
        <SidebarItem
          href="/"
          label="Search"
          icon={
            <SearchIcon
              color={
                pathname.startsWith('/search')
                  ? iconColors.active
                  : iconColors.inactive
              }
            />
          }
          isOpen={isOpen}
          active={pathname.startsWith('/search')}
        />
        <SidebarItem
          href="/"
          label="Home"
          icon={
            <HomeIcon
              color={pathname === '/' ? iconColors.active : iconColors.inactive}
            />
          }
          isOpen={isOpen}
          active={pathname === '/'}
          className="mt-4"
        />

        <div className="mt-auto flex flex-col">
          {/* Email not verified alert */}
          {isOpen && (
            <div className="mx-auto mb-11 flex w-[144px] items-center justify-center">
              <img
                src="/icons/info.svg"
                width="16px"
                height="16px"
                alt="Info icon"
              />

              <p className="ml-3 text-sm font-medium text-indigoGray-90">
                <span className="font-bold">Your e-mail is not verified.</span>{' '}
                Check your mailbox or{' '}
                <a className="underline hover:cursor-pointer">click here</a> to
                resend the message.
              </p>
            </div>
          )}

          <Divider />

          <SidebarItem
            href="/people/0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3"
            label="Profile"
            icon={<img src="/profile-active.svg" alt="Profile icon" />}
            isOpen={isOpen}
            active={pathname.startsWith('/people')}
            className="mt-8"
          />
          <SidebarItem
            href="/settings"
            label="Settings"
            icon={
              <SlidersIcon
                color={
                  pathname.startsWith('/settings')
                    ? iconColors.active
                    : iconColors.inactive
                }
              />
            }
            isOpen={isOpen}
            className="mb-4 mt-4"
            active={pathname.startsWith('/settings')}
          />
        </div>
      </menu>
    </>
  );
};

// ===================================================

/*
 * SidebarItem component
 */
interface SidebarItemProps {
  label: string;
  // Expecting icon to be a ReactNode since we want it to be an SVG wrapped w/ JSX that should accept color as a prop
  icon: ReactNode;
  href: string;
  isOpen: boolean;
  className?: string;
  active?: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({
  label,
  icon,
  href,
  isOpen,
  className,
  active = false,
}) => {
  return (
    <Link href={href} passHref>
      <a
        className={`flex h-[40px] ${
          isOpen && 'w-full'
        } items-center gap-4 rounded-md border ${
          !active && 'border-hidden'
        } p-3 text-sm font-medium text-indigoGray-90 hover:bg-indigoGray-10 hover:text-indigoGray-50 active:border-solid active:border-indigoGray-30 active:bg-indigoGray-10 active:text-indigoGray-80 ${
          active &&
          'border-solid border-indigoGray-30 bg-indigoGray-90 text-indigo-50'
        } ${className}`}
      >
        {icon} {isOpen && label}
      </a>
    </Link>
  );
};

// ==================================

/*
 * Divider component
 */

interface DividerProps {
  className?: string;
}

const Divider: FC<DividerProps> = ({ className }) => {
  return <hr className={`border border-indigoGray-20 ${className}`} />;
};
