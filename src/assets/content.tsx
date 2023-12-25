export const blogGroup = [
  {
    id: '1',
    date: {
      dateNow:1703101207361,
      year: '2023',
      day: '17',
      month: 'December',
    },
    title: 'The Benefits of Regular Exercise',
    tags: ['Fitness', 'Health', 'Exercise'],
    author: 'John Doe',
    content: `
      <p>Regular exercise has numerous benefits for both the body and the mind. Engaging in physical activity on a consistent basis can improve cardiovascular health, build stronger muscles, and increase flexibility. It also helps in maintaining a healthy weight and reducing the risk of developing chronic diseases such as diabetes and heart disease.</p>
      
      <p>Exercise is not only beneficial for physical health but also has a positive impact on mental well-being. It helps in reducing stress levels, improving mood, and boosting overall mental clarity. Regular exercise has been linked to the release of endorphins, which are the body's natural mood-boosting hormones.</p>
      
      <p>Additionally, exercise provides an opportunity to socialize and connect with others. Joining group fitness classes, sports teams, or even going for a walk with a friend can enhance social interactions and contribute to a sense of belonging.</p>
      
      <p>To reap the benefits of exercise, it is recommended to engage in at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week. It is also important to incorporate strength training exercises at least twice a week to maintain muscle mass and bone density.</p>
      
      <p>In conclusion, regular exercise is crucial for maintaining good physical and mental health. By making exercise a part of our daily routine, we can experience the numerous benefits it offers.</p>
    `,
    likes: ['user1', 'user2', 'user3'],
    comments: [
      {
        id: '1',
        message: 'Great blog! Exercise has truly transformed my life.',
        user: {
          id: '1',
          name: 'Alice',
        },
        likes: ['user1', 'user2', 'user3'],
        replies: [
          {
            id: '1',
            message: 'Thank you, Alice! I\'m glad to hear that exercise has had a positive impact on your life.',
            user: {
              id: '2',
              name: 'John',
            },
          },
          {
            id: '2',
            message: 'I agree, excellent post! Exercise has so many benefits.',
            user: {
              id: '3',
              name: 'Bob',
            },
          },
        ],
      },
      {
        id: '2',
        message: 'I found it very informative. I\'ll definitely start incorporating exercise into my routine.',
        user: {
          id: '4',
          name: 'Emily',
        },
        likes: ['user1', 'user2'],
        replies: [],
      },
    ],
  },
  {
    id: '2',
    date: {
      year: '2023',
      day: '18',
      month: 'December',
    },
    title: 'Exploring the Wonders of Nature',
    tags: ['Nature', 'Travel', 'Adventure'],
    author: 'Jane Smith',
    content: `
      <p>Nature offers an array of wonders waiting to be explored. Whether it's hiking through lush forests, gazing at breathtaking waterfalls, or marveling at the diversity of wildlife, immersing oneself in nature can be a transformative experience.</p>
      
      <p>Spending time in nature has been shown to have numerous benefits for our well-being. It helps reduce stress levels, improve mood, and increase feelings of happiness and relaxation. Nature also provides an escape from the fast-paced modern world, allowing us to disconnect from technology and reconnect with ourselves and the natural environment.</p>
      
      <p>Exploring nature can take many forms, from leisurely walks in local parks to embarking on adventurous hikes in remote wilderness areas. It offers a chance to appreciate the beauty and intricacy of the natural world, fostering a sense of awe and wonder.</p>
      
      <p>Moreover, being in nature encourages physical activity, promoting fitness and overall health. Activities such as hiking, cycling, and kayaking not only provide exercise but also allow us to discover new places and enjoy the serenity of natural landscapes.</p>
      
      <p>In a world where we are increasingly disconnected from nature, taking the time to explore and appreciate the wonders of the natural world is essential. It not only benefits us individually but also instills a sense of environmental stewardship and a desire to protect and preserve these precious resources for future generations.</p>
      <p>So, if you have the opportunity, go out and explore the wonders of nature. You won't be disappointed!</p>
    `,
    likes: ['user1', 'user3'],
    comments: [
      {
        id: '1',
        message: 'I love spending time in nature. It rejuvenates my soul.',
        user: {
          id: '5',
          name: 'Sarah',
        },
        likes: ['user1', 'user3'],
        replies: [
          {
            id: '1',
            message: 'I feel the same way, Sarah. Nature has a way of refreshing our spirits.',
            user: {
              id: '6',
              name: 'Michael',
            },
          },
        ],
      },
      {
        id: '2',
        message: 'Nature is truly amazing. I can never get enough of it!',
        user: {
          id: '7',
          name: 'David',
        },
        likes: ['user1'],
        replies: [],
      },
    ],
  },
  {
    id: '3',
    date: {
      year: '2023',
      day: '20',
      month: 'December',
    },
    title: 'The Power of Meditation',
    tags: ['Mindfulness', 'Wellness', 'Mental Health'],
    author: 'Lisa Johnson',
    content: `
      <p>Meditation is a practice that has been around for centuries and is known for its profound effects on the mind and body. It involves focusing one's attention and eliminating the stream of thoughts that constantly flow through our minds.</p>
      
      <p>Regular meditation practice has been shown to reduce stress, anxiety, and depression. It promotes a sense of calmness and relaxation, allowing individuals to better manage their emotions and improve their overall mental well-being.</p>
      
      <p>Besides its impact on mental health, meditation also offers several physical benefits. It can lower blood pressure, improve sleep quality, and boost the immune system. Moreover, meditation has been linked to increased self-awareness and a greater sense of inner peace and happiness.</p>
      
      <p>There are various forms of meditation, including mindfulness meditation, loving-kindness meditation, and transcendental meditation. Each technique has its unique approach and benefits, but they all share the common goal of quieting the mind and attaining a state of deep relaxation.</p>
      
      <p>Getting started with meditation is simple. Find a quiet and comfortable space, sit in a relaxed position, and focus on your breath or a chosen object. Start with just a few minutes a day and gradually increase the duration as you become more comfortable with the practice.</p>
      
      <p>Incorporating meditation into your daily routine can have transformative effects on your overall well-being. Give it a try and experience the power of meditation for yourself.</p>
    `,
    likes: ['user1', 'user2'],
    comments: [
      {
        id: '1',
        message: "I've been meditating for a while now, and it has made a tremendous difference in my life.",
        user: {
          id: '8',
          name: 'Mark',
        },
        likes: ['user1', 'user2'],
        replies: [
          {
            id: '1',
            message: "That's wonderful, Mark! Meditation has a way of bringing about positive changes.",
            user: {
              id: '9',
              name: 'Sophia',
            },
          },
        ],
      },
      {
        id: '2',
        message: "I've been meaning to start meditating. Your blog post has inspired me to give it a try.",
        user: {
          id: '10',
          name: 'Jessica',
        },
        likes: ['user1'],
        replies: [],
      },
    ],
  },
];
export const icons = {
  search:<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path d="M26.5 28.8333L17.1667 19.5C16.3333 20.1667 15.375 20.6944 14.2917 21.0833C13.2083 21.4722 12.0556 21.6667 10.8333 21.6667C7.80556 21.6667 5.24333 20.6183 3.14667 18.5217C1.04889 16.4239 0 13.8611 0 10.8333C0 7.80556 1.04889 5.24278 3.14667 3.145C5.24333 1.04833 7.80556 0 10.8333 0C13.8611 0 16.4239 1.04833 18.5217 3.145C20.6183 5.24278 21.6667 7.80556 21.6667 10.8333C21.6667 12.0556 21.4722 13.2083 21.0833 14.2917C20.6944 15.375 20.1667 16.3333 19.5 17.1667L28.875 26.5417C29.1806 26.8472 29.3333 27.2222 29.3333 27.6667C29.3333 28.1111 29.1667 28.5 28.8333 28.8333C28.5278 29.1389 28.1389 29.2917 27.6667 29.2917C27.1944 29.2917 26.8056 29.1389 26.5 28.8333ZM10.8333 18.3333C12.9167 18.3333 14.6878 17.6044 16.1467 16.1467C17.6044 14.6878 18.3333 12.9167 18.3333 10.8333C18.3333 8.75 17.6044 6.97889 16.1467 5.52C14.6878 4.06222 12.9167 3.33333 10.8333 3.33333C8.75 3.33333 6.97889 4.06222 5.52 5.52C4.06222 6.97889 3.33333 8.75 3.33333 10.8333C3.33333 12.9167 4.06222 14.6878 5.52 16.1467C6.97889 17.6044 8.75 18.3333 10.8333 18.3333Z" fill="#6EEB83"/>
</svg>,
trending:<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
<mask id="mask0_2_99" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
<rect width="40" height="40" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_2_99)">
  <path d="M4.54203 28.875C4.26403 28.625 4.13203 28.3193 4.14603 27.958C4.16003 27.5973 4.29203 27.292 4.54203 27.042L14.667 16.875C14.8057 16.7363 14.9514 16.632 15.104 16.562C15.2567 16.4927 15.4164 16.458 15.583 16.458C15.7777 16.458 15.9444 16.4927 16.083 16.562C16.2224 16.632 16.3754 16.7363 16.542 16.875L22.375 22.708L32.042 13.125H28.333C27.9724 13.125 27.667 13 27.417 12.75C27.167 12.5 27.042 12.1943 27.042 11.833C27.042 11.4443 27.167 11.125 27.417 10.875C27.667 10.625 27.9724 10.5 28.333 10.5H35.125C35.4864 10.5 35.7987 10.625 36.062 10.875C36.326 11.125 36.458 11.4307 36.458 11.792V18.583C36.458 18.9443 36.326 19.257 36.062 19.521C35.7987 19.785 35.4864 19.917 35.125 19.917C34.7917 19.917 34.493 19.785 34.229 19.521C33.965 19.257 33.833 18.9443 33.833 18.583V15.042L23.292 25.583C23.1527 25.7223 23.0067 25.8197 22.854 25.875C22.7014 25.9303 22.5417 25.958 22.375 25.958C22.1804 25.958 22.0137 25.9303 21.875 25.875C21.7364 25.8197 21.5974 25.7223 21.458 25.583L15.583 19.708L6.37503 28.917C6.12503 29.167 5.81936 29.292 5.45803 29.292C5.09736 29.292 4.79203 29.153 4.54203 28.875Z" fill="#6EEB83"/>
</g>
</svg>,
add:
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
<mask id="mask0_2_120" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
  <rect width="40" height="40" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_2_120)">
  <path d="M20.083 28.333C20.4723 28.333 20.7987 28.2013 21.062 27.938C21.326 27.674 21.458 27.3473 21.458 26.958V21.5H27C27.3613 21.5 27.674 21.368 27.938 21.104C28.2013 20.84 28.333 20.5137 28.333 20.125C28.333 19.7083 28.2013 19.368 27.938 19.104C27.674 18.84 27.3473 18.708 26.958 18.708H21.458V13C21.458 12.6387 21.326 12.3263 21.062 12.063C20.7987 11.799 20.4723 11.667 20.083 11.667C19.6943 11.667 19.368 11.799 19.104 12.063C18.84 12.3263 18.708 12.6527 18.708 13.042V18.708H13C12.6387 18.708 12.326 18.847 12.062 19.125C11.7987 19.403 11.667 19.7363 11.667 20.125C11.667 20.5137 11.7987 20.84 12.062 21.104C12.326 21.368 12.6527 21.5 13.042 21.5H18.708V27C18.708 27.3613 18.84 27.674 19.104 27.938C19.368 28.2013 19.6943 28.333 20.083 28.333ZM20 36.667C17.6667 36.667 15.486 36.2363 13.458 35.375C11.4307 34.5137 9.66701 33.333 8.16701 31.833C6.66701 30.333 5.48634 28.5693 4.62501 26.542C3.76367 24.514 3.33301 22.3333 3.33301 20C3.33301 17.6667 3.76367 15.486 4.62501 13.458C5.48634 11.4307 6.66701 9.66699 8.16701 8.16699C9.66701 6.66699 11.4307 5.48633 13.458 4.62499C15.486 3.76366 17.6667 3.33299 20 3.33299C22.3333 3.33299 24.514 3.76366 26.542 4.62499C28.5693 5.48633 30.333 6.66699 31.833 8.16699C33.333 9.66699 34.5137 11.4307 35.375 13.458C36.2363 15.486 36.667 17.6667 36.667 20C36.667 22.3333 36.2363 24.514 35.375 26.542C34.5137 28.5693 33.333 30.333 31.833 31.833C30.333 33.333 28.5693 34.5137 26.542 35.375C24.514 36.2363 22.3333 36.667 20 36.667ZM20 33.875C23.8333 33.875 27.104 32.5207 29.812 29.812C32.5207 27.104 33.875 23.8333 33.875 20C33.875 16.1667 32.5207 12.896 29.812 10.188C27.104 7.47933 23.8333 6.12499 20 6.12499C16.1667 6.12499 12.896 7.47933 10.188 10.188C7.47934 12.896 6.12501 16.1667 6.12501 20C6.12501 23.8333 7.47934 27.104 10.188 29.812C12.896 32.5207 16.1667 33.875 20 33.875Z" fill="#6EEB83"/>
</g>
</svg>
}

export const blog2 = {
  id: '4',
  date: {
    dateNow: 1703101207362,
    year: '2023',
    day: '18',
    month: 'December',
  },
  title: 'The Importance of a Balanced Diet',
  tags: ['Health', 'Nutrition'],
  author: 'Jane Smith',
  content: `
    <p>A balanced diet plays a crucial role in maintaining good health and well-being. It provides the body with essential nutrients, vitamins, and minerals needed for optimal functioning.</p>
    
    <p>Consuming a variety of foods from different food groups is key to achieving a balanced diet. These food groups include fruits, vegetables, grains, protein sources, and dairy or dairy alternatives.</p>
    
    <p>Fruits and vegetables are rich in vitamins, minerals, and antioxidants. They help boost the immune system, protect against chronic diseases, and promote healthy digestion.</p>
    
    <p>Grains, such as whole grains, provide energy and are a good source of fiber. They help regulate blood sugar levels, promote satiety, and support digestive health.</p>
    
    <p>Protein is essential for muscle growth and repair. It can be obtained from sources like lean meats, poultry, fish, legumes, and tofu. Including a variety of protein sources in the diet ensures the intake of essential amino acids.</p>
    
    <p>Dairy products or dairy alternatives, such as fortified plant-based milks, are important for calcium and vitamin D intake, which are essential for strong bones and teeth.</p>
    
    <p>It is also important to limit the intake of processed foods, sugary drinks, and foods high in saturated and trans fats. These foods can contribute to weight gain, increase the risk of chronic diseases, and negatively impact overall health.</p>
    
    <p>By following a balanced diet and making healthy food choices, individuals can maintain their weight, reduce the risk of diseases, and improve their overall well-being.</p>
  `,
  likes: ['user4', 'user5'],
  comments: [
    {
      id: '3',
      message: 'Great article! I learned a lot about the importance of a balanced diet.',
      user: {
        id: '5',
        name: 'Michael',
      },
      likes: ['user6', 'user7'],
      replies: [
        {
          id: '3',
          message: "Thank you, Michael! I'm glad you found the article helpful.",
          user: {
            id: '6',
            name: 'Jane',
          },
        },
      ],
    },
  ],
};