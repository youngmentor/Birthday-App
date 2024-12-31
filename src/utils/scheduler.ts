import cron from 'node-cron';
import User from '../models/User';
import sendEmail from './sendEmail';


console.log('cron started');

cron.schedule('*/2 * * * *', async () => {

  const today = new Date();
  const month = today.getUTCMonth() + 1;
  const day = today.getUTCDate();
  const currentYear = today.getFullYear();

  console.log('Day:', day, 'Month:', month);
  try {
    const users = await User.find({
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: '$dateOfBirth' }, day] },
          { $eq: [{ $month: '$dateOfBirth' }, month] },
        ],
      },
      $or: [
        { lastBirthdayEmailSent: null },
        {
          lastBirthdayEmailSent: {
            $lt: new Date(`${currentYear}-01-01`),
          },
        },
      ],
    });
    console.log('Users found:', users);
    if (users.length) {
      console.log(`${users.length} birthday(s) found!`);
      for (const user of users) {
        const emailContent = `
          <h1>Happy Birthday, ${user.name}!</h1>
          <p>
           Wishing you a wonderful day filled with joy and happiness.
          </p>
          <img src="${process.env.BASE_URL}${user.image}" alt="Birthday Image" />
        `;
        await sendEmail(user.email, 'Happy Birthday!', emailContent);
        user.lastBirthdayEmailSent = today;
        await user.save();
      }
      // console.log(`${users.length} birthday emails sent.`);
    } else {
      // console.log('No birthdays at this time.');
    }
  } catch (error: any) {
    // console.error('Error in scheduler:', error.message);
  }
});
