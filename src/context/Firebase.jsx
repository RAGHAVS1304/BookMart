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
  import { getStorage,ref , uploadBytes } from 'firebase/storage';

const FirebaseContext=createContext(null);
const firebaseConfig = {
    apiKey: "AIzaSyCFXkBU_0DUAIMkHY_1fi84924wgg6oq-0",
    authDomain: "bookify-d4f5e.firebaseapp.com",
    projectId: "bookify-d4f5e",
    storageBucket: "bookify-d4f5e.appspot.com",
    messagingSenderId: "185123759460",
    appId: "1:185123759460:web:a286e86bd3f52112164671"
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
    console.log(user);
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
    return(
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword, singinUserWithEmailAndPass,handleCreateNewListing, isLoggedIn, signinWithGoogle}}>
           {props.children}
        </FirebaseContext.Provider>

    );
}