import Mascot from '@/components/common/Mascot';

const LoadingPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Mascot expression="loading" renderAnimation size={200} />
    </div>
  );
};

export default LoadingPage;
