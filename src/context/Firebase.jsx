import {createContext, useContext, useState, useEffect} from 'react'
import {initializeApp} from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
  } from "firebase/auth";

  import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
  } from "firebase/firestore";
  import { getStorage,ref , uploadBytes, getDownloadURL } from 'firebase/storage';

const FirebaseContext=createContext(null);
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };
  export const useFirebase=()=>useContext(FirebaseContext);
  const firebaseApp=initializeApp(firebaseConfig);
    const firebaseAuth=getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    const storage=getStorage(firebaseApp);
    const googleProvider= new GoogleAuthProvider();
export const FirebaseProvider=(props)=>{

    const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);


    const signupUserWithEmailAndPassword = (email, password) =>
        createUserWithEmailAndPassword(firebaseAuth, email, password);

    const singinUserWithEmailAndPass = (email, password) =>
        signInWithEmailAndPassword(firebaseAuth, email, password);
    
    const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);
    const isLoggedIn = user ? true : false;
    // console.log(user);
    const handleCreateNewListing = async (name, isbn, price, cover) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult = await uploadBytes(imageRef, cover);
        return await addDoc(collection(firestore, "books"), {
          name,
          isbn,
          price,
          imageURL: uploadResult.ref.fullPath,
          userID: user.uid,
          userEmail: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      };
      const listAllBooks = () => {
        return getDocs(collection(firestore, "books"));
      };

      const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path));
      };



    return(
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword,listAllBooks, singinUserWithEmailAndPass, getImageURL, handleCreateNewListing, isLoggedIn, signinWithGoogle}}>
           {props.children}
        </FirebaseContext.Provider>

    );
}