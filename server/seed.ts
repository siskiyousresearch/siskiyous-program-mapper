import { db, pool } from "./db";
import { programs } from "@shared/schema";
import { eq } from "drizzle-orm";

const programData = [
  {
    slug: "cs-as",
    title: "Computer Science",
    degreeType: "Associate in Science (AS)",
    description: "The Computer Science program prepares students for transfer to a four-year university or for entry-level employment in the field of computer science. Students will learn the fundamentals of programming, data structures, and computer architecture.",
    years: [
      {
        id: "year-1", name: "Year 1", terms: [
          {
            id: "term-1", name: "Fall 2025", totalUnits: 14, courses: [
              { id: "csci-1001", code: "CSCI 1001", title: "Introduction to Computer Science", units: 3, type: "major", description: "An overview of the field of computer science, including history, ethics, and basic concepts of programming and computer architecture.", isCompleted: false },
              { id: "engl-1001", code: "ENGL 1001", title: "College Composition", units: 4, type: "ge", description: "Development of college-level reading and writing skills.", isCompleted: false },
              { id: "math-1400", code: "MATH 1400", title: "Calculus I", units: 4, type: "major", description: "Limits, continuity, differentiation, and integration of algebraic and trigonometric functions.", isCompleted: false },
              { id: "guid-1002", code: "GUID 1002", title: "Career and Life Planning", units: 3, type: "support", description: "Exploration of career options and personal goals.", isCompleted: false }
            ]
          },
          {
            id: "term-2", name: "Spring 2026", totalUnits: 15, courses: [
              { id: "csci-1004", code: "CSCI 1004", title: "Programming I", units: 4, type: "major", description: "Introduction to structured programming using a high-level language such as Java or C++.", prerequisites: ["CSCI 1001", "MATH 1400"], isCompleted: false },
              { id: "math-1500", code: "MATH 1500", title: "Calculus II", units: 4, type: "major", description: "Techniques of integration, infinite series, and parametric equations.", prerequisites: ["MATH 1400"], isCompleted: false },
              { id: "coms-1100", code: "COMS 1100", title: "Public Speaking", units: 3, type: "ge", description: "Principles of oral communication and public speaking.", isCompleted: false },
              { id: "art-1001", code: "ART 1001", title: "Art History I", units: 3, type: "ge", description: "Survey of art history from prehistoric times to the Renaissance.", isCompleted: false },
              { id: "hea-1001", code: "HEA 1001", title: "Health in Action", units: 1, type: "ge", description: "Introduction to health and wellness concepts.", isCompleted: false }
            ]
          }
        ]
      },
      {
        id: "year-2", name: "Year 2", terms: [
          {
            id: "term-3", name: "Fall 2026", totalUnits: 16, courses: [
              { id: "csci-1500", code: "CSCI 1500", title: "Programming II", units: 4, type: "major", description: "Object-oriented programming, inheritance, polymorphism, and exception handling.", prerequisites: ["CSCI 1004"], isCompleted: false },
              { id: "csci-2000", code: "CSCI 2000", title: "Discrete Structures", units: 3, type: "major", description: "Mathematical foundations of computer science, including logic, sets, and graph theory.", prerequisites: ["MATH 1400"], isCompleted: false },
              { id: "phys-2001", code: "PHYS 2001", title: "Physics for Scientists and Engineers I", units: 5, type: "ge", description: "Mechanics, thermodynamics, and waves.", prerequisites: ["MATH 1400"], isCompleted: false },
              { id: "hist-1017", code: "HIST 1017", title: "United States History to 1877", units: 3, type: "ge", description: "Survey of U.S. history from the colonial period to Reconstruction.", isCompleted: false },
              { id: "pe-1001", code: "PE 1001", title: "Physical Education Activity", units: 1, type: "ge", description: "Participation in a physical activity.", isCompleted: false }
            ]
          },
          {
            id: "term-4", name: "Spring 2027", totalUnits: 15, courses: [
              { id: "csci-2010", code: "CSCI 2010", title: "Data Structures", units: 4, type: "major", description: "Design and implementation of data structures such as lists, stacks, queues, trees, and graphs.", prerequisites: ["CSCI 1500"], isCompleted: false },
              { id: "csci-2020", code: "CSCI 2020", title: "Computer Architecture", units: 4, type: "major", description: "Organization and architecture of computer systems, including assembly language.", prerequisites: ["CSCI 1500"], isCompleted: false },
              { id: "pols-1001", code: "POLS 1001", title: "American Government", units: 3, type: "ge", description: "Introduction to the structure and function of American government.", isCompleted: false },
              { id: "psyc-1001", code: "PSYC 1001", title: "General Psychology", units: 3, type: "ge", description: "Introduction to the scientific study of behavior and mental processes.", isCompleted: false },
              { id: "elect-1", code: "ELECTIVE", title: "Transfer Elective", units: 1, type: "elective", description: "Elective course to meet transfer requirements.", isCompleted: false }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "nurs-as",
    title: "Nursing (Registered Nursing)",
    degreeType: "Associate in Science (AS)",
    description: "The Registered Nursing program prepares students to become licensed Registered Nurses (RNs). The curriculum includes theoretical instruction and clinical practice in various healthcare settings.",
    years: [
      {
        id: "year-1", name: "Year 1", terms: [
          {
            id: "term-1", name: "Fall 2025", totalUnits: 13, courses: [
              { id: "bio-2100", code: "BIO 2100", title: "Human Anatomy", units: 4, type: "major", description: "Structural organization of the human body.", isCompleted: false },
              { id: "engl-1001", code: "ENGL 1001", title: "College Composition", units: 4, type: "ge", description: "Development of college-level reading and writing skills.", isCompleted: false },
              { id: "nurs-1001", code: "NURS 1001", title: "Nursing Practice Concepts I", units: 5, type: "major", description: "Introduction to nursing practice concepts, including patient-centered care, safety, and teamwork.", isCompleted: false }
            ]
          },
          {
            id: "term-2", name: "Spring 2026", totalUnits: 14, courses: [
              { id: "bio-2200", code: "BIO 2200", title: "Human Physiology", units: 4, type: "major", description: "Physiological principles and function of the human body.", prerequisites: ["BIO 2100"], isCompleted: false },
              { id: "nurs-1002", code: "NURS 1002", title: "Nursing Practice Concepts II", units: 5, type: "major", description: "Further development of nursing practice concepts with a focus on health promotion.", prerequisites: ["NURS 1001"], isCompleted: false },
              { id: "psyc-1001", code: "PSYC 1001", title: "General Psychology", units: 3, type: "ge", description: "Introduction to the scientific study of behavior and mental processes.", isCompleted: false },
              { id: "soc-1001", code: "SOC 1001", title: "Introduction to Sociology", units: 3, type: "ge", description: "The scientific study of human society and social behavior.", isCompleted: false }
            ]
          }
        ]
      },
      {
        id: "year-2", name: "Year 2", terms: [
          {
            id: "term-3", name: "Fall 2026", totalUnits: 14, courses: [
              { id: "bio-2600", code: "BIO 2600", title: "Microbiology", units: 4, type: "major", description: "Morphology, physiology, genetics, and classification of microorganisms.", prerequisites: ["BIO 2100", "BIO 2200"], isCompleted: false },
              { id: "nurs-2001", code: "NURS 2001", title: "Nursing Practice Concepts III", units: 5, type: "major", description: "Advanced nursing practice concepts focusing on acute and chronic health conditions.", prerequisites: ["NURS 1002"], isCompleted: false },
              { id: "coms-1100", code: "COMS 1100", title: "Public Speaking", units: 3, type: "ge", description: "Principles of oral communication and public speaking.", isCompleted: false },
              { id: "arts-elective", code: "ART/MUS", title: "Arts Elective", units: 2, type: "ge", description: "Any course from the Arts area.", isCompleted: false }
            ]
          },
          {
            id: "term-4", name: "Spring 2027", totalUnits: 12, courses: [
              { id: "nurs-2002", code: "NURS 2002", title: "Nursing Practice Concepts IV", units: 5, type: "major", description: "Complex nursing practice concepts including leadership and management of care.", prerequisites: ["NURS 2001"], isCompleted: false },
              { id: "nurs-2003", code: "NURS 2003", title: "Transition to Professional Practice", units: 1, type: "major", description: "Preparation for the transition from student to professional nurse.", isCompleted: false },
              { id: "hum-elective", code: "HUM 1001", title: "Humanities Elective", units: 3, type: "ge", description: "Any course from the Humanities area.", isCompleted: false },
              { id: "eth-1001", code: "ETHN 1001", title: "Ethnic Studies", units: 3, type: "ge", description: "Introduction to Ethnic Studies.", isCompleted: false }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "bus-ast",
    title: "Business Administration",
    degreeType: "Associate in Science for Transfer (AS-T)",
    description: "The Business Administration program provides students with a strong foundation in business principles, economics, and accounting, preparing them for transfer to a California State University (CSU) in Business Administration.",
    years: [
      {
        id: "year-1", name: "Year 1", terms: [
          {
            id: "term-1", name: "Fall 2025", totalUnits: 15, courses: [
              { id: "bus-1001", code: "BA 1001", title: "Introduction to Business", units: 3, type: "major", description: "A survey of the functions and environments of business.", isCompleted: false },
              { id: "engl-1001", code: "ENGL 1001", title: "College Composition", units: 4, type: "ge", description: "Development of college-level reading and writing skills.", isCompleted: false },
              { id: "math-1050", code: "MATH 1050", title: "Elementary Statistics", units: 4, type: "major", description: "Descriptive and inferential statistics, probability, and hypothesis testing.", isCompleted: false },
              { id: "csci-1001", code: "CSCI 1001", title: "Introduction to Computer Science", units: 3, type: "support", description: "Computer literacy and application software.", isCompleted: false },
              { id: "guid-1002", code: "GUID 1002", title: "Career Planning", units: 1, type: "support", description: "Career exploration.", isCompleted: false }
            ]
          },
          {
            id: "term-2", name: "Spring 2026", totalUnits: 16, courses: [
              { id: "ba-1006", code: "BA 1006", title: "Business Law", units: 3, type: "major", description: "Legal environment of business.", isCompleted: false },
              { id: "econ-1001", code: "ECON 1001", title: "Macroeconomics", units: 3, type: "major", description: "Principles of macroeconomics.", isCompleted: false },
              { id: "coms-1100", code: "COMS 1100", title: "Public Speaking", units: 3, type: "ge", description: "Principles of oral communication.", isCompleted: false },
              { id: "ba-1501", code: "BA 1501", title: "Financial Accounting", units: 4, type: "major", description: "Preparation and analysis of financial statements.", isCompleted: false },
              { id: "ge-art", code: "ART/MUS", title: "Arts GE", units: 3, type: "ge", description: "General Education Arts Requirement.", isCompleted: false }
            ]
          }
        ]
      },
      {
        id: "year-2", name: "Year 2", terms: [
          {
            id: "term-3", name: "Fall 2026", totalUnits: 16, courses: [
              { id: "ba-1502", code: "BA 1502", title: "Managerial Accounting", units: 4, type: "major", description: "Use of accounting information for management decision making.", prerequisites: ["BA 1501"], isCompleted: false },
              { id: "econ-1002", code: "ECON 1002", title: "Microeconomics", units: 3, type: "major", description: "Principles of microeconomics.", isCompleted: false },
              { id: "hist-1017", code: "HIST 1017", title: "US History", units: 3, type: "ge", description: "US History requirement.", isCompleted: false },
              { id: "bio-1000", code: "BIO 1000", title: "Introduction to Life Sciences", units: 3, type: "ge", description: "Biological concepts.", isCompleted: false },
              { id: "ge-hum", code: "HUM 1001", title: "Humanities GE", units: 3, type: "ge", description: "General Education Humanities Requirement.", isCompleted: false }
            ]
          },
          {
            id: "term-4", name: "Spring 2027", totalUnits: 15, courses: [
              { id: "ba-2001", code: "BA 2001", title: "Business Communication", units: 3, type: "major", description: "Written and oral communication in business settings.", isCompleted: false },
              { id: "math-1100", code: "MATH 1100", title: "College Algebra", units: 4, type: "support", description: "Algebraic concepts.", isCompleted: false },
              { id: "pols-1001", code: "POLS 1001", title: "American Government", units: 3, type: "ge", description: "American Government requirement.", isCompleted: false },
              { id: "phys-sci", code: "GEOL/CHEM", title: "Physical Science GE", units: 4, type: "ge", description: "General Education Physical Science Requirement.", isCompleted: false },
              { id: "pe-act", code: "PE 1000", title: "PE Activity", units: 1, type: "ge", description: "Physical Education Activity.", isCompleted: false }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "adju-ast",
    title: "Administration of Justice",
    degreeType: "Associate in Science for Transfer (AS-T)",
    description: "The Administration of Justice program examines the structure, functions, and decision-making processes of the criminal justice system. It prepares students for careers in law enforcement, corrections, and the courts.",
    years: [
      {
        id: "year-1", name: "Year 1", terms: [
          {
            id: "term-1", name: "Fall 2025", totalUnits: 15, courses: [
              { id: "adju-1001", code: "ADJU 1001", title: "Intro to Administration of Justice", units: 3, type: "major", description: "Overview of the criminal justice system.", isCompleted: false },
              { id: "adju-1005", code: "ADJU 1005", title: "Criminal Law", units: 3, type: "major", description: "Statutory and case law in criminal proceedings.", isCompleted: false },
              { id: "engl-1001", code: "ENGL 1001", title: "College Composition", units: 4, type: "ge", description: "Development of college-level reading and writing skills.", isCompleted: false },
              { id: "math-1050", code: "MATH 1050", title: "Statistics", units: 4, type: "ge", description: "Descriptive and inferential statistics.", isCompleted: false },
              { id: "guid-1001", code: "GUID 1001", title: "College Success", units: 1, type: "support", description: "Skills for college success.", isCompleted: false }
            ]
          },
          {
            id: "term-2", name: "Spring 2026", totalUnits: 15, courses: [
              { id: "adju-1010", code: "ADJU 1010", title: "Principles of Investigation", units: 3, type: "major", description: "Investigative procedures and techniques.", isCompleted: false },
              { id: "adju-1015", code: "ADJU 1015", title: "Community Relations", units: 3, type: "major", description: "Police-community relations and diversity.", isCompleted: false },
              { id: "psyc-1001", code: "PSYC 1001", title: "General Psychology", units: 3, type: "ge", description: "Scientific study of behavior and mental processes.", isCompleted: false },
              { id: "coms-1100", code: "COMS 1100", title: "Public Speaking", units: 3, type: "ge", description: "Principles of oral communication.", isCompleted: false },
              { id: "pe-act", code: "PE 1000", title: "PE Activity", units: 3, type: "ge", description: "Physical Education Activity.", isCompleted: false }
            ]
          }
        ]
      },
      {
        id: "year-2", name: "Year 2", terms: [
          {
            id: "term-3", name: "Fall 2026", totalUnits: 15, courses: [
              { id: "adju-1020", code: "ADJU 1020", title: "Constitutional Law", units: 3, type: "major", description: "Constitutional protections in criminal proceedings.", isCompleted: false },
              { id: "soc-1001", code: "SOC 1001", title: "Intro to Sociology", units: 3, type: "ge", description: "Scientific study of human society.", isCompleted: false },
              { id: "bio-1000", code: "BIO 1000", title: "Intro to Life Sciences", units: 3, type: "ge", description: "Biological concepts.", isCompleted: false },
              { id: "hist-1017", code: "HIST 1017", title: "US History", units: 3, type: "ge", description: "US History.", isCompleted: false },
              { id: "hum-ge", code: "HUM 1001", title: "Humanities", units: 3, type: "ge", description: "General Education Humanities.", isCompleted: false }
            ]
          },
          {
            id: "term-4", name: "Spring 2027", totalUnits: 15, courses: [
              { id: "adju-1025", code: "ADJU 1025", title: "Juvenile Procedures", units: 3, type: "major", description: "Juvenile justice system.", isCompleted: false },
              { id: "pols-1001", code: "POLS 1001", title: "American Government", units: 3, type: "ge", description: "Structure of American government.", isCompleted: false },
              { id: "art-ge", code: "ART 1001", title: "Art History", units: 3, type: "ge", description: "Survey of art history.", isCompleted: false },
              { id: "elect-1", code: "ELECTIVE", title: "Transfer Elective", units: 3, type: "elective", description: "Elective credit.", isCompleted: false },
              { id: "elect-2", code: "ELECTIVE", title: "Transfer Elective", units: 3, type: "elective", description: "Elective credit.", isCompleted: false }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "fire-cert",
    title: "Fire Technology",
    degreeType: "Certificate of Achievement",
    description: "The Fire Technology program provides the education and training needed for a career in the fire service. The curriculum covers fire behavior, prevention, suppression techniques, and emergency medical services.",
    years: [
      {
        id: "year-1", name: "Year 1", terms: [
          {
            id: "term-1", name: "Fall 2025", totalUnits: 15, courses: [
              { id: "fire-1001", code: "FIRE 1001", title: "Fire Protection Organization", units: 3, type: "major", description: "Organization and management of fire departments.", isCompleted: false },
              { id: "fire-1002", code: "FIRE 1002", title: "Fire Prevention Technology", units: 3, type: "major", description: "Fire codes, inspections, and public education.", isCompleted: false },
              { id: "fire-1003", code: "FIRE 1003", title: "Fire Behavior and Combustion", units: 3, type: "major", description: "Properties of fire and combustion processes.", isCompleted: false },
              { id: "engl-1001", code: "ENGL 1001", title: "College Composition", units: 4, type: "ge", description: "College-level reading and writing.", isCompleted: false },
              { id: "emt-1001", code: "EMT 1001", title: "Emergency Medical Technician", units: 2, type: "support", description: "EMT certification training.", isCompleted: false }
            ]
          },
          {
            id: "term-2", name: "Spring 2026", totalUnits: 15, courses: [
              { id: "fire-1004", code: "FIRE 1004", title: "Fire Suppression Operations", units: 3, type: "major", description: "Tactical fire suppression methods.", isCompleted: false },
              { id: "fire-1005", code: "FIRE 1005", title: "Building Construction for Fire Protection", units: 3, type: "major", description: "Building design and construction as related to fire safety.", isCompleted: false },
              { id: "fire-1006", code: "FIRE 1006", title: "Hazardous Materials", units: 3, type: "major", description: "Hazardous materials identification and response.", isCompleted: false },
              { id: "coms-1100", code: "COMS 1100", title: "Public Speaking", units: 3, type: "ge", description: "Principles of oral communication.", isCompleted: false },
              { id: "fire-1007", code: "FIRE 1007", title: "Wildland Fire Control", units: 3, type: "major", description: "Wildland fire behavior and suppression.", isCompleted: false }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "weld-cert",
    title: "Welding Technology",
    degreeType: "Certificate of Achievement",
    description: "The Welding Technology program trains students in various welding processes and techniques. Students develop skills in MIG, TIG, arc welding, and more, preparing them for immediate employment in manufacturing, construction, and fabrication.",
    years: [
      {
        id: "year-1", name: "Year 1", terms: [
          {
            id: "term-1", name: "Fall 2025", totalUnits: 13, courses: [
              { id: "weld-1001", code: "WELD 1001", title: "Introduction to Welding", units: 3, type: "major", description: "Basic welding processes and safety.", isCompleted: false },
              { id: "weld-1002", code: "WELD 1002", title: "Shielded Metal Arc Welding (SMAW)", units: 3, type: "major", description: "Fundamentals of arc welding.", isCompleted: false },
              { id: "weld-1003", code: "WELD 1003", title: "Welding Blueprint Reading", units: 2, type: "major", description: "Interpretation of welding blueprints.", isCompleted: false },
              { id: "math-0900", code: "MATH 0900", title: "Applied Mathematics", units: 3, type: "support", description: "Mathematics applied to trade occupations.", isCompleted: false },
              { id: "weld-1004", code: "WELD 1004", title: "Oxyacetylene Welding", units: 2, type: "major", description: "Oxy-fuel welding and cutting.", isCompleted: false }
            ]
          },
          {
            id: "term-2", name: "Spring 2026", totalUnits: 14, courses: [
              { id: "weld-1010", code: "WELD 1010", title: "Gas Metal Arc Welding (GMAW/MIG)", units: 3, type: "major", description: "MIG welding processes.", prerequisites: ["WELD 1001"], isCompleted: false },
              { id: "weld-1011", code: "WELD 1011", title: "Gas Tungsten Arc Welding (GTAW/TIG)", units: 3, type: "major", description: "TIG welding processes.", prerequisites: ["WELD 1001"], isCompleted: false },
              { id: "weld-1012", code: "WELD 1012", title: "Pipe Welding", units: 3, type: "major", description: "Welding techniques for pipe.", prerequisites: ["WELD 1002"], isCompleted: false },
              { id: "weld-1013", code: "WELD 1013", title: "Welding Fabrication", units: 3, type: "major", description: "Metal fabrication techniques.", isCompleted: false },
              { id: "weld-1014", code: "WELD 1014", title: "Welding Certification Prep", units: 2, type: "major", description: "Preparation for AWS certification exams.", isCompleted: false }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "kine-aat",
    title: "Kinesiology",
    degreeType: "Associate in Arts for Transfer (AA-T)",
    description: "Focuses on the study of human movement and physical activity. Prepares students for transfer into Kinesiology, Physical Education, or Exercise Science programs at a CSU.",
    years: [
      {
        id: "year-1", name: "Year 1", terms: [
          {
            id: "term-1", name: "Fall 2025", totalUnits: 14, courses: [
              { id: "kine-1000", code: "KINE 1000", title: "Intro to Kinesiology", units: 3, type: "major", isCompleted: false },
              { id: "bio-2100", code: "BIO 2100", title: "Human Anatomy", units: 4, type: "major", isCompleted: false },
              { id: "engl-1001", code: "ENGL 1001", title: "College Composition", units: 4, type: "ge", isCompleted: false },
              { id: "pe-act-1", code: "PE 1010", title: "Weight Training", units: 1, type: "major", isCompleted: false },
              { id: "guid-1001", code: "GUID 1001", title: "College Success", units: 2, type: "support", isCompleted: false }
            ]
          },
          {
            id: "term-2", name: "Spring 2026", totalUnits: 15, courses: [
              { id: "bio-2200", code: "BIO 2200", title: "Human Physiology", units: 4, type: "major", isCompleted: false },
              { id: "math-1050", code: "MATH 1050", title: "Statistics", units: 4, type: "ge", isCompleted: false },
              { id: "coms-1100", code: "COMS 1100", title: "Public Speaking", units: 3, type: "ge", isCompleted: false },
              { id: "pe-act-2", code: "PE 1020", title: "Yoga", units: 1, type: "major", isCompleted: false },
              { id: "arts-ge", code: "MUS 1001", title: "Music Appreciation", units: 3, type: "ge", isCompleted: false }
            ]
          }
        ]
      },
      {
        id: "year-2", name: "Year 2", terms: [
          {
            id: "term-3", name: "Fall 2026", totalUnits: 15, courses: [
              { id: "chem-1000", code: "CHEM 1000", title: "Intro to Chemistry", units: 4, type: "major", isCompleted: false },
              { id: "soc-1001", code: "SOC 1001", title: "Intro to Sociology", units: 3, type: "ge", isCompleted: false },
              { id: "hist-1017", code: "HIST 1017", title: "US History", units: 3, type: "ge", isCompleted: false },
              { id: "pe-act-3", code: "PE 1030", title: "Basketball", units: 1, type: "major", isCompleted: false },
              { id: "hum-ge", code: "HUM 1001", title: "Humanities", units: 3, type: "ge", isCompleted: false },
              { id: "elect-1", code: "HEA 1001", title: "Health", units: 1, type: "elective", isCompleted: false }
            ]
          },
          {
            id: "term-4", name: "Spring 2027", totalUnits: 15, courses: [
              { id: "phys-1010", code: "PHYS 1010", title: "General Physics I", units: 4, type: "major", isCompleted: false },
              { id: "pols-1001", code: "POLS 1001", title: "American Government", units: 3, type: "ge", isCompleted: false },
              { id: "psyc-1001", code: "PSYC 1001", title: "General Psychology", units: 3, type: "ge", isCompleted: false },
              { id: "elect-2", code: "ELECTIVE", title: "Transfer Elective", units: 4, type: "elective", isCompleted: false },
              { id: "pe-act-4", code: "PE 1040", title: "Soccer", units: 1, type: "elective", isCompleted: false }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "libarts-aa",
    title: "Liberal Arts & Sciences: Social & Behavioral Sciences",
    degreeType: "Associate in Arts (AA)",
    description: "Designed for students wishing to explore the social and behavioral sciences. This degree allows students to select courses from a variety of disciplines such as psychology, sociology, history, and political science.",
    years: [
      {
        id: "year-1", name: "Year 1", terms: [
          {
            id: "term-1", name: "Fall 2025", totalUnits: 15, courses: [
              { id: "engl-1001", code: "ENGL 1001", title: "College Composition", units: 4, type: "ge", isCompleted: false },
              { id: "psyc-1001", code: "PSYC 1001", title: "General Psychology", units: 3, type: "major", isCompleted: false },
              { id: "soc-1001", code: "SOC 1001", title: "Intro to Sociology", units: 3, type: "major", isCompleted: false },
              { id: "guid-1001", code: "GUID 1001", title: "College Success", units: 2, type: "support", isCompleted: false },
              { id: "art-ge", code: "ART 1001", title: "Art History", units: 3, type: "ge", isCompleted: false }
            ]
          },
          {
            id: "term-2", name: "Spring 2026", totalUnits: 15, courses: [
              { id: "math-1050", code: "MATH 1050", title: "Statistics", units: 4, type: "ge", isCompleted: false },
              { id: "hist-1017", code: "HIST 1017", title: "US History", units: 3, type: "major", isCompleted: false },
              { id: "coms-1100", code: "COMS 1100", title: "Public Speaking", units: 3, type: "ge", isCompleted: false },
              { id: "anth-1001", code: "ANTH 1001", title: "Physical Anthropology", units: 3, type: "major", isCompleted: false },
              { id: "pe-act", code: "PE 1000", title: "PE Activity", units: 2, type: "ge", isCompleted: false }
            ]
          }
        ]
      },
      {
        id: "year-2", name: "Year 2", terms: [
          {
            id: "term-3", name: "Fall 2026", totalUnits: 15, courses: [
              { id: "pols-1001", code: "POLS 1001", title: "American Government", units: 3, type: "major", isCompleted: false },
              { id: "econ-1001", code: "ECON 1001", title: "Macroeconomics", units: 3, type: "major", isCompleted: false },
              { id: "bio-1000", code: "BIO 1000", title: "Intro to Life Sciences", units: 3, type: "ge", isCompleted: false },
              { id: "hum-ge", code: "HUM 1001", title: "Humanities", units: 3, type: "ge", isCompleted: false },
              { id: "elect-1", code: "ELECTIVE", title: "Elective", units: 3, type: "elective", isCompleted: false }
            ]
          },
          {
            id: "term-4", name: "Spring 2027", totalUnits: 15, courses: [
              { id: "geog-1001", code: "GEOG 1001", title: "Physical Geography", units: 3, type: "major", isCompleted: false },
              { id: "hist-1018", code: "HIST 1018", title: "US History II", units: 3, type: "major", isCompleted: false },
              { id: "elect-2", code: "ELECTIVE", title: "Transfer Elective", units: 3, type: "elective", isCompleted: false },
              { id: "elect-3", code: "ELECTIVE", title: "Transfer Elective", units: 3, type: "elective", isCompleted: false },
              { id: "elect-4", code: "ELECTIVE", title: "Transfer Elective", units: 3, type: "elective", isCompleted: false }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "coms-aat",
    title: "Communication Studies",
    degreeType: "Associate in Arts for Transfer (AA-T)",
    description: "Study of human communication, including public speaking, interpersonal communication, and argumentation. Prepares students for transfer to CSU Communication programs.",
    years: [
      {
        id: "year-1", name: "Year 1", terms: [
          {
            id: "term-1", name: "Fall 2025", totalUnits: 15, courses: [
              { id: "coms-1100", code: "COMS 1100", title: "Public Speaking", units: 3, type: "major", isCompleted: false },
              { id: "engl-1001", code: "ENGL 1001", title: "College Composition", units: 4, type: "ge", isCompleted: false },
              { id: "math-1050", code: "MATH 1050", title: "Statistics", units: 4, type: "ge", isCompleted: false },
              { id: "guid-1001", code: "GUID 1001", title: "College Success", units: 2, type: "support", isCompleted: false },
              { id: "elect-1", code: "ELECTIVE", title: "Elective", units: 2, type: "elective", isCompleted: false }
            ]
          },
          {
            id: "term-2", name: "Spring 2026", totalUnits: 15, courses: [
              { id: "coms-1200", code: "COMS 1200", title: "Small Group Communication", units: 3, type: "major", isCompleted: false },
              { id: "coms-1300", code: "COMS 1300", title: "Interpersonal Communication", units: 3, type: "major", isCompleted: false },
              { id: "hist-1017", code: "HIST 1017", title: "US History", units: 3, type: "ge", isCompleted: false },
              { id: "art-ge", code: "ART 1001", title: "Art History", units: 3, type: "ge", isCompleted: false },
              { id: "pe-act", code: "PE 1000", title: "PE Activity", units: 3, type: "ge", isCompleted: false }
            ]
          }
        ]
      },
      {
        id: "year-2", name: "Year 2", terms: [
          {
            id: "term-3", name: "Fall 2026", totalUnits: 15, courses: [
              { id: "coms-1400", code: "COMS 1400", title: "Argumentation and Debate", units: 3, type: "major", isCompleted: false },
              { id: "soc-1001", code: "SOC 1001", title: "Intro to Sociology", units: 3, type: "ge", isCompleted: false },
              { id: "bio-1000", code: "BIO 1000", title: "Intro to Life Sciences", units: 3, type: "ge", isCompleted: false },
              { id: "hum-ge", code: "HUM 1001", title: "Humanities", units: 3, type: "ge", isCompleted: false },
              { id: "elect-2", code: "ELECTIVE", title: "Elective", units: 3, type: "elective", isCompleted: false }
            ]
          },
          {
            id: "term-4", name: "Spring 2027", totalUnits: 15, courses: [
              { id: "coms-1500", code: "COMS 1500", title: "Intercultural Communication", units: 3, type: "major", isCompleted: false },
              { id: "pols-1001", code: "POLS 1001", title: "American Government", units: 3, type: "ge", isCompleted: false },
              { id: "phys-ge", code: "GEOL 1001", title: "Physical Geology", units: 4, type: "ge", isCompleted: false },
              { id: "elect-3", code: "ELECTIVE", title: "Transfer Elective", units: 3, type: "elective", isCompleted: false },
              { id: "elect-4", code: "ELECTIVE", title: "Transfer Elective", units: 2, type: "elective", isCompleted: false }
            ]
          }
        ]
      }
    ]
  }
];

async function seed() {
  console.log("Seeding programs...");
  for (const prog of programData) {
    const existing = await db.select().from(programs).where(eq(programs.slug, prog.slug));
    if (existing.length > 0) {
      await db.update(programs).set(prog).where(eq(programs.slug, prog.slug));
      console.log(`  Updated: ${prog.title}`);
    } else {
      await db.insert(programs).values(prog);
      console.log(`  Inserted: ${prog.title}`);
    }
  }
  console.log("Seeding complete!");
  await pool.end();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
