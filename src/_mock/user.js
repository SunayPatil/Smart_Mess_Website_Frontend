import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(30)].map((_, index) => ({
  // FoodItem:['poha','idli','eggs'],
  // Day:['Monday','Tuesday','Wednesday'],
  // MealTime:['Breakfast','Breakfast','Breakfast'],
  // isRate:['NO','NO','NO'],
  // Ratings:[7,8,9]

  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: '4',
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default users;
