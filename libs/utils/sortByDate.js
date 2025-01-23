// const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
// });

// const sortByDate = (a, b) => {
//   console.log('sortByDate called with:', a, b);

//   const dateA = new Date(a.frontMatter.date);
//   const dateB = new Date(b.frontMatter.date);

//   if (isNaN(dateA.getTime())) {
//     console.error('Invalid date:', a.frontMatter.date);
//     throw new RangeError('Invalid time value');
//   }

//   if (isNaN(dateB.getTime())) {
//     console.error('Invalid date:', b.frontMatter.date);
//     throw new RangeError('Invalid time value');
//   }

//   console.log('Comparing dates:', dateA, dateB);

//   const result = dateB - dateA;
//   console.log('Sort result:', result);

//   return result;
// };

// export default sortByDate;


export const sortByDate = (a, b) => {
  const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const dateA = new Date(a.frontMatter.date);
  const dateB = new Date(b.frontMatter.date);
  longEnUSFormatter.format(dateA);
  longEnUSFormatter.format(dateB);

  return dateB - dateA;
};