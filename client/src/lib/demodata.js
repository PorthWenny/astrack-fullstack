export const facilData = [
  {
    id: 1,
    title: "Main Library",
    img: "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "Library",
    floor: 1,
    openHours: "8:00 AM - 8:00 PM",
    location: "Building A",
    latitude: 51.5074,
    longitude: -0.1278,
  },
  {
    id: 2,
    title: "Engineering Lab",
    img: "https://images.pexels.com/photos/256430/pexels-photo-256430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "Laboratory",
    floor: 3,
    openHours: "9:00 AM - 5:00 PM",
    location: "Building C",
    latitude: 52.4862,
    longitude: -1.8904,
  },
  {
    id: 3,
    title: "Student Canteen",
    img: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "Cafeteria",
    floor: 1,
    openHours: "7:00 AM - 6:00 PM",
    location: "Building D",
    latitude: 53.4808,
    longitude: -2.2426,
  },
  {
    id: 4,
    title: "Auditorium",
    img: "https://images.pexels.com/photos/167300/pexels-photo-167300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "Event Hall",
    floor: 2,
    openHours: "8:00 AM - 8:00 PM",
    location: "Building B",
    latitude: 53.8008,
    longitude: -1.5491,
  },
  {
    id: 5,
    title: "Physics Lab",
    img: "https://images.pexels.com/photos/256412/pexels-photo-256412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "Laboratory",
    floor: 2,
    openHours: "9:00 AM - 5:00 PM",
    location: "Building C",
    latitude: 53.4084,
    longitude: -2.9916,
  },
  {
    id: 6,
    title: "Gymnasium",
    img: "https://images.pexels.com/photos/3733924/pexels-photo-3733924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "Sports Center",
    floor: 1,
    openHours: "6:00 AM - 10:00 PM",
    location: "Building E",
    latitude: 54.9783,
    longitude: -1.6174,
  },
  {
    id: 7,
    title: "Computer Science Lab",
    img: "https://images.pexels.com/photos/391295/pexels-photo-391295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "Laboratory",
    floor: 4,
    openHours: "8:00 AM - 6:00 PM",
    location: "Building C",
    latitude: 53.3811,
    longitude: -1.4701,
  },
  {
    id: 8,
    title: "Campus Health Center",
    img: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "Health Center",
    floor: 1,
    openHours: "8:00 AM - 4:00 PM",
    location: "Building F",
    latitude: 51.4545,
    longitude: -2.5879,
  },
];

export const singlePostData = {
  id: 1,
  title: "Main Library",
  location: "Mabini Building, 3rd Floor",
  openHours: "8:00 AM - 8:00 PM",
  images: [
    "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/167300/pexels-photo-167300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/214387/pexels-photo-214387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/169330/pexels-photo-169330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
  latitude: 51.5074,
  longitude: -0.1278,
  type: "Library",
  floor: 3,
  nearbyFacilities: {
    canteen: "100m away",
    restroom: "50m away",
    lobby: "200m away",
  },
  description:
    "The Main Library offers a vast collection of resources for students and faculty. With multiple reading areas, a computer lab, and study rooms, it provides a quiet, resourceful environment for research and study. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
};

export const ownerData = {
  id: 1,
  name: "FAITH Colleges",
  img: "https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/458551987_936356025202828_6764137684277803772_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=3NkyDoMv5yoQ7kNvgEmCbLz&_nc_zt=23&_nc_ht=scontent.fmnl13-1.fna&_nc_gid=A3_Y-cV_rxPfJSDLPirhGCi&oh=00_AYA7dR1fARoHDI6KHfBgLnRJWgOHkIJrbRgTsAZ7GWPzLw&oe=67388EB4",
  fb: "https://www.facebook.com/FAITHColleges",
};

export const currentUser = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: "password123",
  user_id: 1,
};

export const reserveData = [
  {
    user_id: 1,
    location_id: 1,
    event_name: "Poster Making Contest",
    date: "2024-11-15",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    progress: "Approved",
  },
  {
    user_id: 2,
    location_id: 3,
    event_name: "Annual Tech Conference",
    date: "2024-11-20",
    startTime: "9:00 AM",
    endTime: "11:00 AM",
    progress: "Pending",
  },
  {
    user_id: 1,
    location_id: 4,
    event_name: "Coding Bootcamp",
    date: "2024-11-18",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    progress: "Approved",
  },
];

// events data

export const eventsData = [
  {
    id: 213,
    userId: "6733782a1dca6334d23164ed",
    facilityId: "6755984444b73156759baa7f",
    date: "January 10, 2024",
    time: "9:00 AM - 12:00 PM",
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    purpose: "Hackathon: Building a weather app using APIs",
    description:
      "Participants will build a weather application using APIs, learning how to retrieve and display weather data dynamically.",
  },
  {
    id: 214,
    userId: "6733782a1dca6334d23164ed",
    facilityId: "6755984444b73156759baa80",
    date: "February 14, 2024",
    time: "1:00 PM - 4:00 PM",
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    purpose: "3D Animation Workshop: Designing characters with Blender",
    description:
      "In this workshop, attendees will learn the basics of 3D animation using Blender, including character modeling and animation techniques.",
  },
  {
    id: 215,
    userId: "6733782a1dca6334d23164ed",
    facilityId: "6755984444b73156759baa82",
    date: "March 3, 2024",
    time: "10:00 AM - 1:00 PM",
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    purpose: "Video Editing Session: Mastering Adobe Premiere Pro",
    description:
      "Learn the essential tools and techniques of video editing using Adobe Premiere Pro, covering everything from basic edits to advanced transitions.",
  },
  {
    id: 216,
    userId: "6733782a1dca6334d23164ed",
    facilityId: "6755984444b73156759baa95",
    date: "April 5, 2024",
    time: "8:00 AM - 11:00 AM",
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    purpose: "Hardware Troubleshooting: Diagnosing and repairing motherboards",
    description:
      "This session will focus on diagnosing hardware issues and repairing motherboards, including troubleshooting common problems and replacing components.",
  },
  {
    id: 217,
    userId: "6733782a1dca6334d23164ed",
    facilityId: "6755984444b73156759baa7f",
    date: "April 20, 2024",
    time: "2:00 PM - 5:00 PM",
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    purpose: "Laptop Maintenance: Replacing thermal paste and cleaning fans",
    description:
      "Learn how to maintain and improve laptop performance by replacing thermal paste and cleaning cooling fans to prevent overheating.",
  },
  {
    id: 218,
    userId: "6733782a1dca6334d23164ed",
    facilityId: "6755984444b73156759baa80",
    date: "May 15, 2024",
    time: "9:00 AM - 12:00 PM",
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    purpose: "Networking Hardware Setup: Configuring routers and switches",
    description:
      "This event covers the setup and configuration of networking hardware, including routers and switches, to establish an efficient network environment.",
  },
];
