import Modal from "@/components/shared/modal";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { LoadingDots, Google } from "@/components/shared/icons";
import Image from "next/image";
import Search from "./search";
import { TextInput, Text } from "@tremor/react";
import { useRouter } from "next/navigation";
import Logo from "./Logo";


const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);
  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [error, setError] = useState('');

  const userName = useRef("")
  const userPass = useRef("")

  const router = useRouter()

  async function handleSUbmit() {

    setError('')

    if (userName.current === '') {
      setUserError(true)

    }
    if (userPass.current === '') {
      setPassError(true)

    }

    const res = await signIn("credentials", {
      username: userName.current,
      password: userPass.current,
      redirect: false,
      // callbackUrl: '/',
    }).then(res => {
      console.log({ res });
      if (res?.error != null) {
        setError(res.error)

      } else {
        router.refresh()
        setShowSignInModal(false)
      }
    }).catch(err => {
      console.log({ err });
      setError(err)

    })

    console.log(res);



    setSignInClicked(false)
    setUserError(false)
    setPassError(false)

  }

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal} isCenter>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <Logo />
          <h3 className="font-display text-2xl font-bold">Sign In</h3>

          <TextInput error={userError} placeholder="Your Email" onChange={(e) => (userName.current = e.target.value)} />
          <TextInput error={passError} placeholder="**********" type="password" onChange={(e) => (userPass.current = e.target.value)} />

          {error && <Text className="text-red-600 text-xs" >{error}</Text>}


        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          <button
            disabled={signInClicked}
            className={`${signInClicked
              ? "cursor-not-allowed border-gray-200 bg-gray-100"
              : "border border-gray-200 bg-white text-black hover:bg-gray-50"
              } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
              // signIn();
              handleSUbmit();
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                {/* <Google className="h-5 w-5" /> */}
                <p>Sign In with Credential</p>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}
