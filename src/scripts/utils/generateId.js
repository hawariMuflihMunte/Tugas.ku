/**
 * @return {Number} return random number between 1 - 99999
 */
const generateId = () => {
  const minId = 1;
  const maxId = 99999;
  const combineMinMax = Math.floor(
      Math.random() * (maxId - minId + 1) + minId
  );
  const timeStampForId = Number(new Date());
  const id = Number(combineMinMax + timeStampForId);

  return Number(id);
};

export default generateId;
