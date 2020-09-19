import * as faker from 'faker';
import { request, gql } from 'graphql-request';

const API_GATEWAY_URL: string =
  'http://frozen-plateau-06813.herokuapp.com/graphql';

const SAMPLES: number = 8;

const usernames = [];

const userIDs = [];

const average = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length;

async function testUseCase(name: string, operation: string, params?: any[]) {
  const tests: Promise<number>[] = [];

  const buildPromise = (sample: number) =>
    new Promise<number>((resolve, reject) => {
      const start = new Date();
      request(API_GATEWAY_URL, operation, params ? params[sample] : {})
        .then(data => {
          const end = new Date();
          resolve(end.getTime() - start.getTime());
          if (name === 'HU3') {
            userIDs.push(data['user']['id']);
          }
        })
        .catch(error => {
          reject(error);
        });
    });

  // Tiempo secuencial
  let times = [];

  for (let i = 0; i < SAMPLES; i++) {
    const time = await buildPromise(i);
    times.push(time);
  }

  let avg = average(times);
  console.log('[' + name + '] - Tiempo medio secuencial: ' + avg + 'ms');

  // Tiempo concurrente
  times = [];

  for (let i = 0; i < SAMPLES; i++) {
    tests.push(buildPromise(i + SAMPLES));
  }

  times = await Promise.all(tests);
  avg = average(times);
  console.log('[' + name + '] - Tiempo medio concurrente: ' + avg + 'ms');
}

// ------------------ HU1 ------------------

const hu1 = gql`
  mutation SignUp($signUpUserInput: SignUpUserInput!) {
    signUpUser(signUpUserInput: $signUpUserInput) {
      accepted
      failureReason
    }
  }
`;

// ------------------ HU2 ------------------

const hu2 = gql`
  mutation EditUser($editUserInput: EditUserInput!) {
    editUser(editUserInput: $editUserInput) {
      accepted
      failureReason
    }
  }
`;

// ------------------ HU3 ------------------

const hu3 = gql`
  query user($username: String!) {
    user(username: $username) {
      id
      username
      email
      enrollmentDate
      posts {
        id
        title
      }
    }
  }
`;

// ------------------ HU4 ------------------

const hu4 = gql`
  query {
    users(limit: 4) {
      id
      username
      email
      enrollmentDate
      posts {
        id
      }
    }
  }
`;

// ------------------ HU5 ------------------

const hu5 = gql`
  query {
    mostProlific(limit: 7) {
      id
      username
    }
  }
`;

// ------------------ HU6 ------------------

const hu6 = gql`
  query {
    mostProlific(limit: 7) {
      id
      username
    }
  }
`;

// ------------------ HU7 ------------------

const hu7 = gql`
  mutation PublishPost($publishPostInput: PublishPostInput!) {
    publishPost(publishPostInput: $publishPostInput) {
      accepted
      failureReason
    }
  }
`;

// ------------------ HU8 ------------------

const hu8 = gql`
  query {
    recentPosts(limit: 10) {
      title
      body
      publishDate
      likes
    }
  }
`;

// ------------------ HU9 ------------------

const hu9 = gql`
  query {
    popularPosts(limit: 10) {
      id
      title
      body
      publishDate
      likes
    }
  }
`;

// ------------------ HU10 ------------------

const hu10 = gql`
  mutation LikePost($likePostInput: LikePostInput!) {
    likePost(likePostInput: $likePostInput) {
      accepted
      failureReason
    }
  }
`;

// ------------------ HU11 ------------------

const hu11 = gql`
  mutation Subscribe($subscriptionInput: SubscriptionInput!) {
    subscribe(subscriptionInput: $subscriptionInput) {
      accepted
      failureReason
    }
  }
`;

async function testCases() {
  const h1Params = [];
  for (let i = 0; i < SAMPLES * 2; i++) {
    const username = faker.name.firstName() + faker.random.number();
    usernames.push(username);
    h1Params.push({
      signUpUserInput: {
        username: username,
        email: faker.internet.email(),
      },
    });
  }
  await testUseCase('HU1', hu1, h1Params);
  const h2Params = [];
  for (let i = 0; i < SAMPLES * 2; i++) {
    h2Params.push({
      editUserInput: {
        username: usernames[i],
        email: faker.internet.email(),
      },
    });
  }
  await testUseCase('HU2', hu2, h2Params);
  const h3Params = [];
  for (let i = 0; i < SAMPLES * 2; i++) {
    h3Params.push({
      username: usernames[i],
    });
  }
  await testUseCase('HU3', hu3, h3Params);
  await testUseCase('HU4', hu4);
  await testUseCase('HU5', hu5);
  await testUseCase('HU6', hu6);
  const h7Params = [];
  for (let i = 0; i < SAMPLES * 2; i++) {
    h7Params.push({
      publishPostInput: {
        authorID: userIDs[i],
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
      },
    });
  }
  await testUseCase('HU7', hu7, h7Params);
  await testUseCase('HU8', hu8);
  await testUseCase('HU9', hu9);
  const h10Params = [];
  for (let i = 0; i < SAMPLES * 2; i++) {
    h10Params.push({
      likePostInput: {
        postID: '90750509-bd19-47dc-89ba-e1f83e10b547',
        likerID: userIDs[i],
      },
    });
  }
  await testUseCase('HU10', hu10, h10Params);
  const h11Params = [];
  for (let i = 0; i < SAMPLES * 2; i++) {
    h11Params.push({
      subscriptionInput: {
        publisherID: userIDs[(i + 1) % (SAMPLES * 2)],
        subscriberID: userIDs[i],
      },
    });
  }
  await testUseCase('HU11', hu11, h11Params);
}

testCases();
