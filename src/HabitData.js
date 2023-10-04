    const habitList = [
    {
      name: 'brush teeth',
      no: 1,
      TimesScanned: 1,
      timeOfDay: ['07:30'],
      avgTimeOfDay: '07:30',
    },
    {
      name: 'Water',
      no: 2,
      TimesScanned: 1,
      timeOfDay: ['07:30'],
      avgTimeOfDay: '07:30', 
    },
    {
      name: 'Charger',
      no: 3,
      TimesScanned: 1,
      timeOfDay: ['07:30'],
      avgTimeOfDay: '07:30', 
    },
  ];
  
  const habitMap = habitList.reduce((acc, h) => {
    acc[h.name] = h;
    return acc;
  }, {});
  
  export {habitList, habitMap};
  