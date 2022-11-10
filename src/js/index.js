// import { compareAsc, format } from 'date-fns'

// dateFns.format(new Date(2014, 1, 11), 'yyyy-MM-dd')
//=> '2014-02-11'

// const dates = [
//   new Date(1995, 6, 2),
//   new Date(1987, 1, 11),
//   new Date(1989, 6, 10),
// ]
// console.log(dates.sort(dateFns.compareAsc));

//=> [
//   Wed Feb 11 1987 00:00:00,
//   Mon Jul 10 1989 00:00:00,
//   Sun Jul 02 1995 00:00:00
// ]

// let num = '0';
// const x = parseFloat(num);
// console.log(x===0);
// console.log(Number.isNaN(x));

// const DateTime = luxon.DateTime;
// const Interval = luxon.Interval;
// const Duration = luxon.Duration;
// const expireDate = '2022-11-09'
// const testDate = '09/11/2022'
// const productExpiration = expireDate;
// const validation = DateTime.fromISO(DateTime.now().plus({days: 30}))
// console.log(validation);
// var end = DateTime.fromISO(date1);
// var start = DateTime.fromISO(validation);
// const end = DateTime.fromISO(validation)
// const start = DateTime.fromISO(productExpiration)

// const newTestDate = testDate.split('/');
// console.log(newTestDate);

// const newStart = DateTime.fromISO(DateTime.local(Number(newTestDate[2]), Number(newTestDate[1]), Number(newTestDate[0])).plus({days: 30}).toISODate());

// console.log("hehe "+DateTime.local(Number(newTestDate[2]), Number(newTestDate[1]), Number(newTestDate[0])).plus({days: 30}).toISODate());

// const diff = end.diff(newStart,'days')
// console.log(diff.toObject());
// console.log(Math.floor(diff.toObject().days));

// now = DateTime.now();
// later = DateTime.local(2025, 10, 12);
// i = Interval.fromDateTimes(now, later);

// console.log(i.length('years'));

