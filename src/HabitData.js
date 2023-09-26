    const habitList = [
    {
      name: 'Toothbrush',
      no: 1,
      TimesScanned: 1,
      AvgScanTime: 1,
    },
    {
      name: 'Water',
      no: 2,
      TimesScanned: 1,
      AvgScanTime: 1,
    },
    {
      name: 'Charger',
      no: 3,
      TimesScanned: 1,
      AvgScanTime: 1,
    },
  ];
  
  const habitMap = habitList.reduce((acc, h) => {
    acc[h.name] = h;
    return acc;
  }, {});
  
  export {habitList, habitMap};
  