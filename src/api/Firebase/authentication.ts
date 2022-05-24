import { FirebaseAuthentication, User } from "@capacitor-firebase/authentication";

export const getCurrentUser = async () => {
    try {
        const result = await FirebaseAuthentication.getCurrentUser()

        return result.user
    } catch (error) {
        throw error
    }
}

export const createUserWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const result = await FirebaseAuthentication.createUserWithEmailAndPassword({
            email,
            password
        })
    
        return result.user
    } catch (error) {
        throw error
    }
}

export const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const result = await FirebaseAuthentication.signInWithEmailAndPassword({
            email,
            password
        })
    
        return result.user
    } catch (error) {
        throw error
    }
}

export const signInWithGoogle = async () => {
    try {
        const result = await FirebaseAuthentication.signInWithGoogle()

        return result.user
    } catch (error) {
        throw error
    }
}

export const signOut = async () => {
    try {
        await FirebaseAuthentication.signOut()
        const user = await getCurrentUser()
        
        return user
    } catch (error) {
        throw error
    }
}