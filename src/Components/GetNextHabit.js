function getNextHabit(currentHabitName, fetchedHabits){
  console.log("All habits:", fetchedHabits);
  // Find the current habit in the list
  const currentHabit = fetchedHabits.find(habit => habit.name.toLowerCase() === currentHabitName.toLowerCase());
  console.log("Current habit:", currentHabit); // Log to validate current habit

  // If the current habit is not found or is the last habit, return null
  if (!currentHabit || currentHabit.no === fetchedHabits.length) {
    return null;
  }

  // Find and return the next habit based on the 'no' field
  const nextHabit = fetchedHabits.find(habit => habit.no === currentHabit.no + 1);
  console.log("Next habit:", nextHabit); // Log to validate the next habit
  return nextHabit;
}

export { getNextHabit };