// src/data/BlogsData.ts
export type BlogPost = {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
};

export const featuredPost: BlogPost = {
  title: 'The Future of Cloud Computing: Trends to Watch in 2024',
  excerpt: 'Explore the latest innovations and emerging technologies shaping the cloud computing landscape.',
  image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800',
  author: 'Sarah Johnson',
  date: 'January 5, 2024',
  category: 'Cloud Technology',
  readTime: '8 min read',
};

export const posts: BlogPost[] = [
  {
    title: 'AI and Machine Learning: Transforming Business Operations',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way businesses operate and make decisions.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Michael Chen',
    date: 'January 3, 2024',
    category: 'Artificial Intelligence',
    readTime: '6 min read',
  },
  {
    title: 'Cybersecurity Best Practices for Modern Enterprises',
    excerpt: 'Essential security measures every organization should implement to protect against digital threats.',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Emily Rodriguez',
    date: 'December 30, 2023',
    category: 'Security',
    readTime: '7 min read',
  },
  {
    title: 'Building Scalable Applications with Microservices',
    excerpt: 'A comprehensive guide to designing and implementing microservices architecture for your applications.',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'David Kim',
    date: 'December 27, 2023',
    category: 'Development',
    readTime: '10 min read',
  },
  {
    title: 'Data Analytics: Turning Information into Insights',
    excerpt: 'Learn how to leverage data analytics to make informed business decisions and drive growth.',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Sarah Johnson',
    date: 'December 24, 2023',
    category: 'Analytics',
    readTime: '5 min read',
  },
 {
  title: 'National Education Policy (NEP) 2020: Transforming India’s Education System',
  excerpt: 'An overview of how the National Education Policy 2020 is reshaping curriculum, assessment, and learning outcomes across India.',
  image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
  author: 'Ananya Sharma',
  date: 'February 10, 2024',
  category: 'NEP',
  readTime: '7 min read',
}
,
  
  {
  title: 'Engineering Scalable Systems for High Performance',
  excerpt: 'Learn core engineering principles behind building reliable, scalable, and high-performance systems.',
  image: 'https://images.pexels.com/photos/3862373/pexels-photo-3862373.jpeg?auto=compress&cs=tinysrgb&w=800',
  author: 'Rahul Sharma',
  date: 'January 10, 2024',
  category: 'Engineering',
  readTime: '9 min read',
},
];

export const categories = [
  'All',
  'Cloud Technology',
  'Artificial Intelligence',
  'Security',
  'Development',
  'Analytics',
  'NEP',
  'Engineering'
];
