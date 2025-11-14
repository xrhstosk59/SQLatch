/**
 * Configuration for lessons, tasks, and scenarios
 */

export interface LessonConfig {
    blocks: string;
    theory: string;
    database: string;
    name: string;
}

// Block files for lessons
export const LTSBlocks = [
    'Lessons/Lesson1/blocks.json',
    'Lessons/Lesson2/blocks.json',
    'Lessons/Lesson3/blocks.json',
];

// Theory markdown files
export const LTS = [
    'Lessons/Lesson1/theory.md',
    'Lessons/Lesson2/theory.md',
    'Lessons/Lesson3/theory.md',
    'Tasks/Tasks1/tasks.md',
    'Scenarios/Scenario1/scen.md',
    'Scenarios/Scenario2/scen.md',
    'Scenarios/Scenario3/scen.md',
];

// Display names for each lesson/task/scenario
export const LTSNames = [
    'Μάθημα με SELECT',
    'Μάθημα με CREATE TABLE',
    'Μάθημα με INSERT',
    'Άσκηση',
    'Σενάριο: Το μαγικό βιβλίο',
    'Σενάριο: Η κλοπή του μουσείου',
    'Σενάριο: Η εξερεύνηση πλανητών',
];

// Database files for lessons/scenarios
export const DBs = [
    'Lessons/Lesson1/database.db',
    '',
    'Lessons/Lesson3/database.db',
    '',
    '',
    'Scenarios/Scenario2/database.db',
];
