export const handleObserver = (entries, observer, callback) => {
  const target = entries[0];
  if (target.isIntersecting) {
    callback();
  }
};