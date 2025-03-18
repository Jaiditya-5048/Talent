// async function getLocation(): Promise<{
//   all_data: GeolocationPosition;
//   time: string;
//   date: string;
//   latitude: number;
//   longitude: number;
// }> {
//   return new Promise((resolve, reject) => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const date = new Date();
//           resolve({
//             all_data: position,
//             time: date.toLocaleTimeString(),
//             date: date.toLocaleDateString(),
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//         },
//         (error) => reject(error),
//       );
//     } else {
//       reject(new Error('Geolocation is not supported by this browser.'));
//     }
//   });
// }

// // Function to use the location data
// async function currentLocationData() {
//   try {
//     const { all_data, time, date, latitude, longitude } = await getLocation();

//     const city = document.getElementById('city') as HTMLParagraphElement;
//     city.innerText = latitude.toString();

//     const currentTime = document.getElementById('time') as HTMLParagraphElement;
//     currentTime.innerText = time;

//     const currentDate = document.getElementById('date') as HTMLParagraphElement;
//     currentDate.innerText = date;

//     console.log(all_data);
//     console.log(time);
//     console.log(date);
//     console.log(latitude);
//     console.log(longitude);
//   } catch (error) {
//     console.error('Error getting location:', error);
//   }
// }

function showTime(position: GeolocationPosition): {} {
  const time = position.timestamp;

  const dates = new Date(time);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formatTime = dates.toLocaleTimeString('en-US', { hour12: true });
  const formatDate = dates.toLocaleDateString('en-us', options);

  console.log(formatTime);
  console.log(formatDate);
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  return {
    all_data: position,
    time: formatTime,
    date: formatDate,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
}