import TopNav from '@/components/profile/TopNav';
import LoginButton from '@/components/profile/LoginButton';
import Google from '@/assets/images/google.svg';
import Github from '@/assets/images/github.svg';
import Kakao from '@/assets/images/kakao.svg';

const handleKakao = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
  console.log("🥸 카카오 로그인 요청 URL:", url);
  window.location.href = url;
};

const handleGoogle = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`;
  console.log("🥸 구글 로그인 요청 URL:", url);
  window.location.href = url;
};

const handleGit = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/github`;
  console.log("🥸 깃허브 로그인 요청 URL:", url);
  window.location.href = url;
};

  return (
    <>
      <TopNav />
      <div className="flex min-h-screen">
        <div className="hidden tablet:flex flex-grow"></div>
        <div className="w-full tablet:w-[320px] desktop:w-[375px] desktop:mx-20 min-h-screen flex flex-col items-center">
          <header className="py-[100px]">
            <div className="text-center text-[24px]">Welcome</div>
            <div className="text-center mobile:text-[16px] text-[#B7B9BD]">
              사람들을 만나 누리고 나누세요
            </div>
          </header>

          <main className="flex flex-col items-center px-4 w-full flex-grow gap-[16px]">
            <LoginButton
              text="Google로 가입하기"
              icon={<img src={Google} />}
              onClick={handleGoogle}
            />
            <LoginButton
              text="Github로 가입하기"
              icon={<img src={Github} />}
              onClick={handleGit}
            />
            <LoginButton
              text="Kakao로 가입하기"
              icon={<img src={Kakao} />}
              onClick={handleKakao}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
