function getNextHabit(currentHabitName, habitList) {
    // Find the current habit in the list
    const currentHabit = habitList.find(habit => habit.name.toLowerCase() === currentHabitName.toLowerCase());
    
    // If the current habit is not found or is the last habit, return null
    if (!currentHabit || currentHabit.no === habitList.length) {
      return null;
    }
  
    // Find and return the next habit based on the 'no' field
    return habitList.find(habit => habit.no === currentHabit.no + 1);
  }

  export { getNextHabit };