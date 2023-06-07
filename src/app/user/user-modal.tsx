import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import { LoadingDots } from "@/components/shared/icons";
import { Dropdown, DropdownItem, Text, TextInput } from "@tremor/react";
import Logo from "@/components/Logo";

const UserModal = ({
  showUserModal,
  setShowUserModal,
}: {
  showUserModal: boolean;
  setShowUserModal: Dispatch<SetStateAction<boolean>>;
}) => {

  const [signInClicked, setSignInClicked] = useState(false);
  const [valueDrop, setValueDrop] = useState("");

  return (
    <Modal showModal={showUserModal} setShowModal={setShowUserModal}>
      <div className="w-full h-full bg-white overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 py-6 pt-8 text-center md:px-16">

          <Logo />
          <h3 className="orange_gradient font-display text-2xl font-bold">User Data</h3>
          <p className="text-sm text-gray-500">
            Precedent is an opinionated collection of components, hooks, and
            utilities for your Next.js project.
          </p>


          <TextInput error={false} placeholder="fullname" autoFocus />
          <TextInput error={true} placeholder="email@mail.mail" />
          <TextInput error={true} type="password" placeholder="*******" />

          <Dropdown value={valueDrop} onValueChange={setValueDrop}>
            <DropdownItem value="" text={"Select"} />
            <DropdownItem value="5" text={"Five"} />
            <DropdownItem value="3" text={"Three"} />
            <DropdownItem value="1" text={"One"} />
          </Dropdown>

        </div>

        <div className="flex flex-row space-x-4 bg-gray-50 px-4 py-8 md:px-16">
          <button
            onClick={() => setShowUserModal(false)}
            className="flex h-10 items-center justify-center rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
          >
            <p className="text-gray-600">Cancel</p>
          </button>
          <button
            disabled={signInClicked}
            className={`${signInClicked
              ? "cursor-not-allowed border-gray-200 bg-gray-100 hover:border-gray-800"
              : "border bg-black text-white font-mono hover:bg-gray-50 hover:border-gray-800 hover:text-black transition-all"
              } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
              // signIn();
              // handleSUbmit();
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#000" />
            ) : (
              <>
                {/* <Google className="h-5 w-5" /> */}
                <p>Submit</p>
              </>
            )}
          </button>
        </div>

      </div>
    </Modal>
  );
};

export function useUserModal() {
  const [showUserModal, setShowUserModal] = useState(false);

  const UserModalCallback = useCallback(() => {
    return (
      <UserModal
        showUserModal={showUserModal}
        setShowUserModal={setShowUserModal}
      />
    );
  }, [showUserModal, setShowUserModal]);

  return useMemo(
    () => ({ setShowUserModal, UserModal: UserModalCallback }),
    [setShowUserModal, UserModalCallback],
  );
}
