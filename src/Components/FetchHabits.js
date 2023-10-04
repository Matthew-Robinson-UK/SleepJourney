import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export async function fetchHabits() {
    const user = auth().currentUser;
    
    if(!user) {
        throw new Error('User not authenticated');
    }

    try {
        const querySnapshot = await firestore().collection('users').doc(user.uid).collection('habits').orderBy('no').get();
        const fetchedHabits = querySnapshot.docs.map(documentSnapshot => ({
            id: documentSnapshot.id,
            ...documentSnapshot.data()
    }));
        return fetchedHabits;
    } catch (error) {
        console.error("Error fetching habits:", error);
        throw error; // Re-throwing the error to be caught by the calling function
    }
}