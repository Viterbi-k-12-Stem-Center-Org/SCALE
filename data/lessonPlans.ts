export type LessonPlan = {
  id: string;
  title: string;
  description: string;
  gradeLevel: string;
  subject: string;
  lessonType: string;
  standards: string[];
  equipmentNeeded: string[];
  duration: string;
  keywords: string[];
  fileUrl: string;
  sourceType: string;
};

export const lessonPlans: LessonPlan[] = [
  {
    id: "bridge-building-challenge",
    title: "Bridge Building Challenge",
    description: "Students design and test a bridge that balances strength and material efficiency.",
    gradeLevel: "Grade 3-5",
    subject: "Engineering",
    lessonType: "Project-Based",
    standards: ["NGSS", "ISTE"],
    equipmentNeeded: ["Craft sticks", "Tape", "Weights"],
    duration: "60 min",
    keywords: ["structures", "forces", "design", "testing"],
    fileUrl: "https://example.com/lesson-plans/bridge-building-challenge",
    sourceType: "Google Doc"
  },
  {
    id: "intro-to-robotics-movement",
    title: "Intro to Robotics Movement",
    description: "Learners explore motors, wheels, and programming through a beginner robot build.",
    gradeLevel: "Grade 6-8",
    subject: "Robotics",
    lessonType: "Lab",
    standards: ["NGSS", "CSTA"],
    equipmentNeeded: ["Robotics kit", "Laptops", "USB cable"],
    duration: "2 class periods",
    keywords: ["coding", "motion", "robotics", "debugging"],
    fileUrl: "https://example.com/lesson-plans/intro-to-robotics-movement",
    sourceType: "Google Drive"
  },
  {
    id: "energy-systems-lab",
    title: "Energy Systems Lab",
    description: "A hands-on investigation of energy transfer, efficiency, and evidence-based claims.",
    gradeLevel: "Grade 6-8",
    subject: "Physics",
    lessonType: "Inquiry",
    standards: ["NGSS", "CA NGSS"],
    equipmentNeeded: ["Thermometers", "Stopwatch", "Data sheets"],
    duration: "45 min",
    keywords: ["energy", "transfer", "measurement", "analysis"],
    fileUrl: "https://example.com/lesson-plans/energy-systems-lab",
    sourceType: "Google Doc"
  },
  {
    id: "data-visualization-mini-unit",
    title: "Data Visualization Mini-Unit",
    description: "Students gather, organize, and visualize STEM data using charts and simple dashboards.",
    gradeLevel: "Grade 6-8",
    subject: "Data Science",
    lessonType: "Mini-Unit",
    standards: ["CCSS Math", "ISTE"],
    equipmentNeeded: ["Chromebooks", "Spreadsheet template"],
    duration: "3 class periods",
    keywords: ["graphs", "data", "patterns", "visualization"],
    fileUrl: "https://example.com/lesson-plans/data-visualization-mini-unit",
    sourceType: "Google Drive"
  },
  {
    id: "environmental-mapping-studio",
    title: "Environmental Mapping Studio",
    description: "Teams map local conditions and connect observations to environmental data.",
    gradeLevel: "Grade 3-5",
    subject: "Environmental Science",
    lessonType: "Workshop",
    standards: ["NGSS", "CCSS ELA"],
    equipmentNeeded: ["Maps", "Markers", "Field notes"],
    duration: "50 min",
    keywords: ["environment", "mapping", "observation", "community"],
    fileUrl: "https://example.com/lesson-plans/environmental-mapping-studio",
    sourceType: "Google Doc"
  },
  {
    id: "coding-patterns-with-microbit",
    title: "Coding Patterns with micro:bit",
    description: "A coding sequence that builds logic skills through interactive pattern routines.",
    gradeLevel: "Grade 6-8",
    subject: "Computer Science",
    lessonType: "Project-Based",
    standards: ["CSTA", "ISTE"],
    equipmentNeeded: ["micro:bit", "USB cable", "Laptop"],
    duration: "60 min",
    keywords: ["logic", "patterns", "micro:bit", "programming"],
    fileUrl: "https://example.com/lesson-plans/coding-patterns-with-microbit",
    sourceType: "Google Drive"
  },
  {
    id: "marble-run-motion-investigation",
    title: "Marble Run Motion Investigation",
    description: "Students explore motion, slope, and friction through a simple ramp build.",
    gradeLevel: "Grade K-2",
    subject: "Physics",
    lessonType: "Lab",
    standards: ["NGSS"],
    equipmentNeeded: ["Ramps", "Marbles", "Tape"],
    duration: "35 min",
    keywords: ["motion", "friction", "slope", "experiment"],
    fileUrl: "https://example.com/lesson-plans/marble-run-motion-investigation",
    sourceType: "Google Doc"
  },
  {
    id: "weather-data-station",
    title: "Weather Data Station",
    description: "Students collect and compare weather measurements from a classroom station.",
    gradeLevel: "Grade 3-5",
    subject: "Earth Science",
    lessonType: "Inquiry",
    standards: ["NGSS", "CCSS Math"],
    equipmentNeeded: ["Thermometer", "Anemometer", "Notebook"],
    duration: "45 min",
    keywords: ["weather", "data", "climate", "measurement"],
    fileUrl: "https://example.com/lesson-plans/weather-data-station",
    sourceType: "Google Drive"
  },
  {
    id: "coding-color-sensors",
    title: "Coding Color Sensors",
    description: "A beginner lesson on input/output using color detection and code blocks.",
    gradeLevel: "Grade 6-8",
    subject: "Robotics",
    lessonType: "Lab",
    standards: ["CSTA", "NGSS"],
    equipmentNeeded: ["Sensor kit", "Laptops", "Colored cards"],
    duration: "50 min",
    keywords: ["sensors", "coding", "input", "color"],
    fileUrl: "https://example.com/lesson-plans/coding-color-sensors",
    sourceType: "Google Doc"
  },
  {
    id: "simple-machines-design-build",
    title: "Simple Machines Design Build",
    description: "A maker-style lesson where students build and test a simple machine prototype.",
    gradeLevel: "Grade 3-5",
    subject: "Engineering",
    lessonType: "Project-Based",
    standards: ["NGSS", "ISTE"],
    equipmentNeeded: ["Cardboard", "String", "Pulley parts"],
    duration: "2 class periods",
    keywords: ["machines", "engineering", "design", "prototypes"],
    fileUrl: "https://example.com/lesson-plans/simple-machines-design-build",
    sourceType: "Google Drive"
  },
  {
    id: "sound-and-vibration-lab",
    title: "Sound and Vibration Lab",
    description: "Students test how sound changes with vibration, distance, and materials.",
    gradeLevel: "Grade 3-5",
    subject: "Physics",
    lessonType: "Inquiry",
    standards: ["NGSS"],
    equipmentNeeded: ["Tuning forks", "Rubber bands", "Cup phones"],
    duration: "40 min",
    keywords: ["sound", "vibration", "waves", "investigation"],
    fileUrl: "https://example.com/lesson-plans/sound-and-vibration-lab",
    sourceType: "Google Doc"
  },
  {
    id: "math-modeling-for-sensors",
    title: "Math Modeling for Sensors",
    description: "Students use real sensor data to model patterns and make predictions.",
    gradeLevel: "Grade 9-12",
    subject: "Mathematics",
    lessonType: "Mini-Unit",
    standards: ["CCSS Math", "CSTA"],
    equipmentNeeded: ["Sensor dataset", "Spreadsheet", "Calculator"],
    duration: "3 class periods",
    keywords: ["modeling", "prediction", "data", "functions"],
    fileUrl: "https://example.com/lesson-plans/math-modeling-for-sensors",
    sourceType: "Google Drive"
  },
  {
    id: "biome-exploration-gallery-walk",
    title: "Biome Exploration Gallery Walk",
    description: "A collaborative lesson where students compare biome traits and adaptations.",
    gradeLevel: "Grade 6-8",
    subject: "Biology",
    lessonType: "Workshop",
    standards: ["NGSS", "CCSS ELA"],
    equipmentNeeded: ["Posters", "Markers", "Sticky notes"],
    duration: "50 min",
    keywords: ["biomes", "adaptations", "habitat", "collaboration"],
    fileUrl: "https://example.com/lesson-plans/biome-exploration-gallery-walk",
    sourceType: "Google Doc"
  },
  {
    id: "circuit-basics-led-lab",
    title: "Circuit Basics LED Lab",
    description: "Students build simple circuits and observe how current flows through a system.",
    gradeLevel: "Grade 6-8",
    subject: "Engineering",
    lessonType: "Lab",
    standards: ["NGSS"],
    equipmentNeeded: ["Batteries", "LEDs", "Wires"],
    duration: "45 min",
    keywords: ["circuits", "current", "engineering", "LED"],
    fileUrl: "https://example.com/lesson-plans/circuit-basics-led-lab",
    sourceType: "Google Drive"
  },
  {
    id: "geometry-in-the-real-world",
    title: "Geometry in the Real World",
    description: "Students identify shapes, angles, and measurement in everyday structures.",
    gradeLevel: "Grade 3-5",
    subject: "Mathematics",
    lessonType: "Inquiry",
    standards: ["CCSS Math"],
    equipmentNeeded: ["Rulers", "Clipboards", "Photos"],
    duration: "40 min",
    keywords: ["geometry", "angles", "measurement", "design"],
    fileUrl: "https://example.com/lesson-plans/geometry-in-the-real-world",
    sourceType: "Google Doc"
  },
  {
    id: "climate-data-discussion",
    title: "Climate Data Discussion",
    description: "Students interpret climate data and support claims with evidence.",
    gradeLevel: "Grade 9-12",
    subject: "Earth Science",
    lessonType: "Discussion",
    standards: ["NGSS", "CCSS ELA"],
    equipmentNeeded: ["Climate graphs", "Projector", "Article set"],
    duration: "45 min",
    keywords: ["climate", "evidence", "argument", "science literacy"],
    fileUrl: "https://example.com/lesson-plans/climate-data-discussion",
    sourceType: "Google Drive"
  }
];
