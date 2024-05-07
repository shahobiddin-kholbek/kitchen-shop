export interface  User {
    id: string;
    createdAt: string;
    email: string;
    password: string;
    isRegistered: boolean;
    name: string;
    phone: string;
  }

  export interface UserSignIn {
    email: string;
    password: string;
  }

  export type UserRegistration = {
    id: string;
    name: string;
    email: string;
    isRegistered: boolean;
    password: string;
    phone: string;
    createdAt: string;
}

export type UserProfileProps = {
  setIsRegistered: (isRegistered: boolean) => void;
  setOpenAccountDrawer: (openAccountDrawer: boolean) => void;

};