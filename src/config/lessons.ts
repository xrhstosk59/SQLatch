/**
 * Configuration for lessons, tasks, and scenarios
 * Based on the original SQLatch-dev structure
 */

export interface LessonItem {
    blocks: string;           // Block JSON file path or scenario path
    theory: string;           // Theory markdown file path
    info: string;             // Description text
    name: string;             // Display name
    database: string;         // Database file path
    isScenario: boolean;      // Whether this is a scenario (has videos)
    requirements: [string[], string][]; // Validation requirements
    numVideos: number;        // Number of videos (scenarios only)
}

// Theory requirements for lessons
const theoryRequirements = [
    [['CREATE', 'TABLE'], ''],
    [['INSERT', 'INTO'], ''],
    [['SELECT'], ''],
    [['AND'], ''],
    [['UPDATE', 'SET'], ''],
    [['DROP'], ''],
    [['MIN'], ''],
    [['ORDER'], ''],
    [['GROUP'], ''],
    [['JOIN'], ''],
] as [string[], string][];

// Scenario 1 requirements
const scenarioP1Requirements = [
    [['SELECT','*'], 'Output/0.json'],
    [['WHERE'], 'Output/1.json'],
    [['OR'], 'Output/2.json'],
    [['INSERT', 'INTO'], 'Output/3.json'],
    [['UPDATE'], 'Output/4.json'],
    [['min(quantity)'], 'Output/5.json'],
    [['ORDER'], 'Output/6.json'],
    [['DELETE'], 'Output/7.json']
] as [string[], string][];

// Scenario 2 requirements
const scenarioP2Requirements = [
    [['GROUP'], 'Output/0.json'],
    [['HAVING'], 'Output/1.json'],
    [['JOIN','JOIN'], 'Output/2.json'],
    [['JOIN','JOIN','WHERE'], 'Output/3.json'],
    [['JOIN','GROUP'], 'Output/4.json'],
    [['GROUP','ORDER','DESC;'], 'Output/5.json'],
    [['count(*)','JOIN','WHERE'], 'Output/6.json']
] as [string[], string][];

// Main lesson configuration array
// Format: [blocks, theory, info, name, database, isScenario, requirements, numVideos]
export const LTS: LessonItem[] = [
    {
        blocks: '',
        theory: 'Lessons/Intro/theory.md',
        info: 'Εισαγωγικό κείμενο',
        name: 'Εισαγωγή στις βάσεις δεδομένων',
        database: '',
        isScenario: false,
        requirements: [],
        numVideos: 0
    },
    {
        blocks: 'Lessons/Lesson1/blocks.json',
        theory: 'Lessons/Lesson1/theory.md',
        info: 'Παρουσίαση εντολής CREATE',
        name: 'Μάθημα με CREATE TABLE',
        database: '',
        isScenario: false,
        requirements: [theoryRequirements[0]],
        numVideos: 0
    },
    {
        blocks: 'Lessons/Lesson2/blocks.json',
        theory: 'Lessons/Lesson2/theory.md',
        info: 'Παρουσίαση εντολής INSERT INTO',
        name: 'Μάθημα με INSERT',
        database: 'Lessons/Lesson2/database.db',
        isScenario: false,
        requirements: [theoryRequirements[1]],
        numVideos: 0
    },
    {
        blocks: '',
        theory: 'Tasks/Tasks1/tasks.md',
        info: 'Άσκηση με CREATE TABLE, INSERT',
        name: 'Φύλλο εργασίας 1',
        database: '',
        isScenario: false,
        requirements: [],
        numVideos: 0
    },
    {
        blocks: 'Lessons/Lesson3/blocks.json',
        theory: 'Lessons/Lesson3/theory.md',
        info: 'Παρουσίαση εντολής SELECT',
        name: 'Μάθημα με SELECT',
        database: 'Lessons/Lesson3/database.db',
        isScenario: false,
        requirements: [theoryRequirements[2]],
        numVideos: 0
    },
    {
        blocks: '',
        theory: 'Lessons/Lesson4/theory.md',
        info: 'Παρουσίαση λογικών τελεστών: NOT, AND, OR',
        name: 'Μάθημα με Λογικούς Τελεστές',
        database: 'Lessons/Lesson4/database.db',
        isScenario: false,
        requirements: [theoryRequirements[3]],
        numVideos: 0
    },
    {
        blocks: '',
        theory: 'Lessons/Lesson7/theory.md',
        info: 'Παρουσίαση συναρτήσεων: MIN, MAX, AVG, SUM, COUNT',
        name: 'Μάθημα με MIN / MAX / AVG / SUM / COUNT',
        database: 'Lessons/Lesson7/database.db',
        isScenario: false,
        requirements: [theoryRequirements[6]],
        numVideos: 0
    },
    {
        blocks: '',
        theory: 'Lessons/Lesson8/theory.md',
        info: 'Παρουσίαση συνάρτησης ORDER BY',
        name: 'Μάθημα με ORDER BY',
        database: 'Lessons/Lesson8/database.db',
        isScenario: false,
        requirements: [theoryRequirements[7]],
        numVideos: 0
    },
    {
        blocks: 'Lessons/Lesson5/blocks.json',
        theory: 'Lessons/Lesson5/theory.md',
        info: 'Παρουσίαση εντολής UPDATE',
        name: 'Μάθημα με UPDATE',
        database: 'Lessons/Lesson5/database.db',
        isScenario: false,
        requirements: [theoryRequirements[4]],
        numVideos: 0
    },
    {
        blocks: 'Lessons/Lesson6/blocks.json',
        theory: 'Lessons/Lesson6/theory.md',
        info: 'Παρουσίαση εντολών DELETE FROM, DROP TABLE',
        name: 'Μάθημα με DELETE FROM / DROP TABLE',
        database: 'Lessons/Lesson6/database.db',
        isScenario: false,
        requirements: [theoryRequirements[5]],
        numVideos: 0
    },
    {
        blocks: '',
        theory: 'Tasks/Tasks2/tasks.md',
        info: 'Άσκηση με SELECT,UPDATE,DELETE,DROP',
        name: 'Φύλλο εργασίας 2',
        database: 'Tasks/Tasks2/database.db',
        isScenario: false,
        requirements: [],
        numVideos: 0
    },
    {
        blocks: 'MDGuides/Scenarios/Scenario1/',
        theory: 'Scenarios/Scenario1/scen.md',
        info: 'Σενάριο: Το μαγικό βιβλίο',
        name: 'Σενάριο: Το μαγικό βιβλίο (1ο Μέρος)',
        database: 'Scenarios/Scenario1/database.db',
        isScenario: true,
        requirements: scenarioP1Requirements,
        numVideos: 8
    },
    {
        blocks: '',
        theory: 'Lessons/Lesson9/theory.md',
        info: 'Παρουσίαση συνάρτησης GROUP BY',
        name: 'Μάθημα με GROUP BY',
        database: 'Lessons/Lesson9/database.db',
        isScenario: false,
        requirements: [theoryRequirements[8]],
        numVideos: 0
    },
    {
        blocks: '',
        theory: 'Lessons/Lesson10/theory.md',
        info: 'Παρουσίαση συνάρτησης JOIN',
        name: 'Μάθημα με JOIN',
        database: 'Lessons/Lesson10/database.db',
        isScenario: false,
        requirements: [theoryRequirements[9]],
        numVideos: 0
    },
    {
        blocks: 'MDGuides/Scenarios/Scenario2/',
        theory: 'Scenarios/Scenario2/scen.md',
        info: 'Σενάριο: Το μαγικό βιβλίο',
        name: 'Σενάριο: Το μαγικό βιβλίο (2ο Μέρος)',
        database: 'Scenarios/Scenario2/database.db',
        isScenario: true,
        requirements: scenarioP2Requirements,
        numVideos: 7
    }
];
