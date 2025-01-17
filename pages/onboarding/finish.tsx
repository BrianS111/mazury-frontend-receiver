import { userSlice } from '@/selectors';
import { OnboardingLayout } from 'components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const FinishPage: NextPage = () => {
  const { address } = useSelector(userSlice);
  const router = useRouter();

  return (
    <OnboardingLayout
      firstHeading="Ready, set, go!"
      secondHeading="You're all set!"
      bottomButtonText="Go to your profile"
      bottomButtonOnClick={async () => {
        router.push(`/people/${address}`);
      }}
      overrideOnClick
    >
      <p className="mt-4 text-sm font-medium text-indigoGray-60">
        You now have a complete profile on Mazury. Go and discover some new
        people.
      </p>
    </OnboardingLayout>
  );
};

export default FinishPage;
