function addHabit(newHabitName) {
    const newHabit = {
      name: newHabitName,
      no: habitList.length + 1, // Assigning the next number in sequence
      TimesScanned: 0,
      timeOfDay: [],
      avgTimeOfDay: '', 
    };
  
    habitList.splice(habitList.length - 1, 0, newHabit); // Insert before the last item
  
    // Update habitMap
    habitMap[newHabitName] = newHabit;
  }

  export { addHabit };