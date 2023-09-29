import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_DATA_KEY = '@CompletedJourneyScreen:data';
const ONE_DAY = 1000 * 60 * 60 * 28;
const TWELVE_HOURS = 1000 * 60 * 60 * 12;

export async function fetchScreenData() {
  try {
    const storedData = await AsyncStorage.getItem(SCREEN_DATA_KEY);
    let data = {
      visitCount: 0,
      visitTimes: [],
      averageVisitTime: 0,
      visitDates: [],
      streak: 0,
    };

    if (storedData) {
      data = { ...data, ...JSON.parse(storedData) };
    }

    return data;
  } catch (error) {
    console.error("Error fetching screen data: ", error);
    return null;
  }
}

export async function updateScreenData() {
  const data = await fetchScreenData();

  if (data) {
    const currentTime = new Date();
    const currentTimeInHours = currentTime.getHours() + currentTime.getMinutes() / 60;
    const exactTime = currentTime.toISOString();

    data.visitCount += 1;
    data.visitTimes.push(currentTimeInHours);
    if (!data.visitDates.includes(exactTime)) {
        data.visitDates.push(exactTime);
    }

    const totalVisitTime = data.visitTimes.reduce((acc, time) => acc + time, 0);
    data.averageVisitTime = totalVisitTime / data.visitCount;

    if (data.visitDates.length >= 2) {
        const lastVisit = new Date(data.visitDates[data.visitDates.length - 1]);
        const secondLastVisit = new Date(data.visitDates[data.visitDates.length - 2]);
        
        const differenceInMilliseconds = lastVisit - secondLastVisit;
        
        if (differenceInMilliseconds > TWELVE_HOURS && differenceInMilliseconds < ONE_DAY) {
            data.streak += 1; // Increment the streak if they visited after 12 hours but within a day
        } else if (differenceInMilliseconds >= ONE_DAY) {
            data.streak = 1; // Reset the streak if there's more than a day between visits
        }
    } else if (data.visitDates.length === 1) {
        data.streak = 1; // Set the streak to 1 if it's their first visit
    }

    try {
      await AsyncStorage.setItem(SCREEN_DATA_KEY, JSON.stringify(data));
      console.log("Updated and saved data: ", data);
    } catch (error) {
      console.error("Error updating screen data: ", error);
    }
  }
}


export async function fetchStreak(SCREEN_DATA_KEY) {
    try {
      const parsedData = await fetchScreenData(SCREEN_DATA_KEY);
      const fetchedStreak = parsedData.streak;
      const lastVisitDate = parsedData.visitDates[parsedData.visitDates.length - 1];
  
      let displayButton = false;
      if (lastVisitDate) {
        const lastVisitDateTime = new Date(lastVisitDate).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - lastVisitDateTime;
        console.log(timeDifference);
        console.log(ONE_DAY);
        console.log(currentTime);
        console.log(lastVisitDateTime);
  
        if (fetchedStreak === 0 && timeDifference > ONE_DAY) {
            displayButton = true;
        } else if (fetchedStreak > 0 && timeDifference > ONE_DAY) {
            displayButton = true;
        } else if (fetchedStreak > 0 && timeDifference < ONE_DAY) {
            displayButton = false;
        } else {
            displayButton = false;
        }
      } else if (fetchedStreak === 0) {
          displayButton = true;
      }
  
      return { fetchedStreak, displayButton };
    } catch (error) {
      console.error("Error fetching streak:", error);
      return null;
    }
  }
