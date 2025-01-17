import { userSlice } from '@/selectors';
import { Button } from 'components';
import { OnboardingContext } from 'contexts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { OnboardingLayoutProps } from './OnboardingLayout.types';

const onboardingRoutes = [
  '/',
  'role',
  'refer',
  // 'write', ** we have removed this page from the onboarding flow because it is now accessible via the individual 'refer' buttons
  // 'whitelist', ** we don't want this whitelist page anymore
  'socials',
  'finish',
  // 'redirect', we dont need a hard redirect anymore. we'll just do router.push('people/[address]')
];

export const OnboardingLayout: FC<OnboardingLayoutProps> = ({
  children,
  firstHeading,
  secondHeading,
  bottomButtonText = 'CONTINUE',
  bottomButtonOnClick,
  bottomButtonDisabled = false,
  overrideOnClick = false,
}) => {
  const router = useRouter();
  const { address, profile, loading } = useSelector(userSlice);
  const {
    setFormData,
    fetched,
    setFetched,
    setTwitterConnected,
    setGithubConnected,
  } = useContext(OnboardingContext);

  const goForward = async () => {
    const currentRoute = [...router.pathname.split('/'), '/'][2];
    if (bottomButtonOnClick) {
      await bottomButtonOnClick();
    }
    if (currentRoute === 'write') {
      return router.push('/onboarding/socials');
    }
    const nextRoute =
      onboardingRoutes[onboardingRoutes.indexOf(currentRoute) + 1];
    router.push(`/onboarding/${nextRoute}`);
  };

  const goBack = () => {
    if (router.pathname === '/onboarding') {
      return router.push('/');
    }
    if (router.pathname === '/onboarding/write') {
      return router.push('/onboarding/refer');
    }
    const currentRoute = router.pathname.split('/')[2];
    const prevRoute =
      onboardingRoutes[onboardingRoutes.indexOf(currentRoute) - 1];
    router.push(`/onboarding/${prevRoute}`);
  };

  useEffect(() => {
    if (profile && !fetched) {
      const {
        bio,
        username,
        role_community_manager,
        role_creator,
        role_designer,
        role_developer,
        role_investor,
        role_researcher,
        role_trader,
        open_to_opportunities,
        email,
        website,
        ens_name,
        eth_address,
        avatar,
        twitter,
        github,
        full_name,
      } = profile;
      setFormData({
        bio,
        username,
        role_community_manager,
        role_creator,
        role_designer,
        role_developer,
        role_investor,
        role_researcher,
        role_trader,
        open_to_opportunities,
        email,
        website,
        ens_name,
        eth_address,
        avatar,
        twitter,
        github,
        full_name,
      });
      if (profile.twitter) {
        setTwitterConnected(true);
      }
      if (profile.github) {
        setGithubConnected(true);
      }
      setFetched(true);
    }
  }, [
    profile,
    setFormData,
    fetched,
    setFetched,
    setTwitterConnected,
    setGithubConnected,
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!address) {
    return <div>Please connect your wallet first</div>;
  }

  return (
    <main className="mx-auto flex min-h-screen flex-col px-4 py-4 align-top sm:w-[530px]">
      <div className="absolute top-6 left-4 hidden w-full xl:flex">
        {/* next/Image overrides display:hidden */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/new-logo.svg"
          className="rounded-full hover:cursor-pointer"
          alt="Mazury logo"
          width="40px"
          height="40px"
          onClick={() => router.back()}
        />
      </div>

      <div className="xl:mt-20">
        <Image
          onClick={goBack}
          src="/icons/back.svg"
          alt="Back"
          width="16px"
          height="16px"
          layout="fixed"
          className="hover:cursor-pointer"
        />
      </div>

      <h1 className="mt-6 text-sm font-medium uppercase text-indigoGray-40">
        {firstHeading}
      </h1>
      <h3 className="mt-2 font-demi text-4xl text-indigoGray-90">
        {secondHeading}
      </h3>

      {children}

      <div className="mx-auto mb-8 mt-8 w-full">
        <Button
          size="large"
          onClick={overrideOnClick ? bottomButtonOnClick : goForward}
          className="w-full justify-center uppercase"
          disabled={bottomButtonDisabled}
        >
          {bottomButtonText}
        </Button>
      </div>
    </main>
  );
};
