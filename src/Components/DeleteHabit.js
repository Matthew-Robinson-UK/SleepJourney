import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const deleteHabit = async (habitId) => {
  try {
    const user = auth().currentUser;
    if (!user) {
      console.error("User is not signed in");
      return;
    }

    await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('habits')
      .doc(habitId)
      .delete();

    console.log("Habit deleted successfully");
  } catch (error) {
    console.error("Error deleting habit: ", error);
    // Handle error appropriately in UI/UX
  }
}

export { deleteHabit }