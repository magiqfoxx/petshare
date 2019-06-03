const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
export const getLocation = async () => {
  if (navigator.geolocation) {
    const position = await getPosition();
    return position;
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};
export const getCoords = async location => {};
