const slowFunction = async (random = 1000, time = new Date()) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: "respuesta lenta",
        random: Math.floor(Math.random() * random),
        time,
      });
    }, 1500);
  });
};

module.exports = slowFunction;
