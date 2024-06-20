import {createContext, useContext} from 'react'
import {initializeApp} from 'firebase/app'
const FirebaseContext=createContext(null);
export const useFirebase=()=>useContext(FirebaseContext);
const firebaseConfig = {
    apiKey: "AIzaSyCFXkBU_0DUAIMkHY_1fi84924wgg6oq-0",
    authDomain: "bookify-d4f5e.firebaseapp.com",
    projectId: "bookify-d4f5e",
    storageBucket: "bookify-d4f5e.appspot.com",
    messagingSenderId: "185123759460",
    appId: "1:185123759460:web:a286e86bd3f52112164671"
  };
  const firebaseApp=initializeApp(firebaseConfig);
export const FirebaseProvider=(props)=>{
    return(
        <FirebaseContext.Provider>
           {props.children}
        </FirebaseContext.Provider>

    );
}