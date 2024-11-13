import { app } from "../../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Toast } from "react-native-toast-notifications";

const auth = getAuth(app);

export const signUpWithEmailAndPassword = async (
  email: string,
  pass: string,
  nav: any
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, pass);
    Toast.show("User created successfully", {
      type: "success",
      placement: "bottom",
      duration: 4000,
      animationType: "slide-in",
    });
    nav.navigate("SignIn", { isSignIn: true, heading: "Login" });
  } catch (err) {
    Toast.show("User creation failed", {
      type: "danger",
      placement: "bottom",
      duration: 4000,
      animationType: "zoom-in",
    });
  }
};

export const signInWithEmailzAndPassword = async (
  email: string,
  password: string,
  navigation: any
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigation.navigate("Home");
    Toast.show("Signin successfull", {
      type: "success",
      placement: "bottom",
      duration: 4000,
      animationType: "slide-in",
    });
  } catch (error: any) {
    Toast.show(`${error.message}`, {
      type: "danger",
      placement: "bottom",
      duration: 4000,
      animationType: "zoom-in",
    });
  }
};

export const signOutz = async (navigation: any) => {
  try {
    await signOut(auth);
    Toast.show("Signout successfull", {
      type: "success",
      placement: "bottom",
      duration: 4000,
      animationType: "slide-in",
    });
    navigation.navigate("SignIn", { isSignIn: true, heading: "Login" });
  } catch (err: any) {
    Toast.show(`${err.message}`, {
      type: "danger",
      placement: "bottom",
      duration: 4000,
      animationType: "zoom-in",
    });
  }
};

type AuthStatus = {
  status: boolean;
  user?: any;
};
export const checkAuthStatus = async (): Promise<AuthStatus> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({ status: true, user });
      } else {
        resolve({ status: false });
      }
      unsubscribe();
    });
  });
};

export const getUserDetails = () => {
  const user = auth.currentUser;
  return user ? user : null;
};
