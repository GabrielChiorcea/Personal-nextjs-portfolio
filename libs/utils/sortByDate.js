const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const sortByDate = (a, b) => {
  const dateA = new Date(a.frontMatter.date);
  const dateB = new Date(b.frontMatter.date);

  if (isNaN(dateA.getTime())) {
    console.error('Invalid date:', a.frontMatter.date);
    throw new RangeError('Invalid time value');
  }

  if (isNaN(dateB.getTime())) {
    console.error('Invalid date:', b.frontMatter.date);
    throw new RangeError('Invalid time value');
  }

  longEnUSFormatter.format(dateA);
  longEnUSFormatter.format(dateB);

  return dateB - dateA;
};

export default sortByDate;