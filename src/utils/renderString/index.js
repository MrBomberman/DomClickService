const formatString = (str) => {
  return (str || "").replace(/(&quot;)/g, '"').replace(/(&#039;)/g, "'");
};

export default formatString;
