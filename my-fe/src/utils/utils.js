export const convertTime = (time,type='hour') => {
  const hour = time >= 60 * 60 ? timeString(Math.floor(time / (60 * 60))) : timeString(0);
  const minute = time >= 60 ? timeString(Math.floor((time - hour * 60 * 60) / 60)) : timeString(0);
  const second = timeString(time - hour * 60 * 60 - minute * 60);
  function timeString(val){
    return val > 9 ? `${val}` : `0${val}`;
  }
  if(type==='minute'){
  return `${minute}:${second}`;

  }
  return `${hour}:${minute}:${second}`;
};