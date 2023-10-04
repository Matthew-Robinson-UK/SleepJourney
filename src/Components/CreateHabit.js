import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const addHabit = async (habitName, habitId = null) => {
  try {
    const user = auth().currentUser;

    if (user) {
      const habitsRef = firestore().collection('users').doc(user.uid).collection('habits');

      const habitData = {
        name: habitName,
        TimesScanned: 0,
        timeOfDay: [],
        avgTimeOfDay: '',
      };

      if (habitId) {
        await habitsRef.doc(habitId).update(habitData);
        console.log("Habit updated successfully");
      } else {
        const querySnapshot = await habitsRef.get();
        const numberOfHabits = querySnapshot.size;

        // Begin a new transaction
        await firestore().runTransaction(async transaction => {
          if (numberOfHabits <= 2) {
            // if 2 or less habits, increment by 1
            habitData.no = numberOfHabits + 1;
          } else {
            // if 3 or more habits, make no one less than length
            habitData.no = numberOfHabits;
            
            // Update the `no` field of all subsequent habits
            const habitsToIncrement = await habitsRef.where('no', '>=', habitData.no).get();

            habitsToIncrement.forEach(doc => {
              transaction.update(habitsRef.doc(doc.id), {
                no: doc.data().no + 1,
              });
            });
          }

          // Add the new habit
          await habitsRef.add(habitData);
        });

        console.log("Habit added successfully");
      }
    } else {
      console.log('User is not signed in');
      // Handle user not signed in, maybe redirect to login
    }
  } catch (error) {
    console.error("Error adding/updating habit: ", error);
    // Handle error in UI/UX
  }
}

export { addHabit }