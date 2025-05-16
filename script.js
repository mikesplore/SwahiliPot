// Class to represent an attachee
class Attachee {
    constructor(name, division) {
        this.name = name; // Name of the attachee
        this.division = division; // Division the attachee belongs to
        this.tasks = []; // List of tasks assigned to the attachee
        this.feedback = {}; // Feedback for each task
        this.scores = {}; // Scores for each task
    }

    // Add a task to the attachee
    addNewTask(task) {
        if (!this.tasks.includes(task)) {
            this.tasks.push(task);
            this.feedback[task] = ""; // Initialize feedback
            this.scores[task] = null; // Initialize score
        }
    }

    // Provide feedback for a task
    addNewFeedback(task, feedback) {
        if (this.tasks.includes(task)) {
            this.feedback[task] = feedback;
            return true;
        }
        return false;
    }

    // Add a score for a task
    addNewScore(task, score) {
        if (this.tasks.includes(task) && score >= 0 && score <= 10) {
            this.scores[task] = score;
            return true;
        }
        return false;
    }

    // Calculate the average score
    getAverageScore() {
        const scoredTasks = Object.values(this.scores).filter(score => score !== null);
        if (scoredTasks.length === 0) return 0;
        const total = scoredTasks.reduce((sum, score) => sum + score, 0);
        return total / scoredTasks.length;
    }

    // Convert attachee details to a string
    toString() {
        return `${this.name} - ${this.division} Division (Avg Score: ${this.getAverageScore().toFixed(2)})`;
    }
}

// Class to manage divisions and tasks
class TaskManager {
    constructor() {
        this.divisions = ["Engineering", "Tech Programs", "Radio Support", "Hub Support"]; // List of divisions
        this.attachees = []; // List of all attachees
    }

    // Add a new attachee
    addNewAttachee(name, division) {
        if (!this.divisions.includes(division)) {
            console.log("Invalid division. Please choose a valid division.");
            return null;
        }
        const newAttachee = new Attachee(name, division);
        this.attachees.push(newAttachee);
        return newAttachee;
    }

    // Get attachees by division
    getAttacheesByDivision(division) {
        return this.attachees.filter(attachee => attachee.division === division);
    }

    // Assign a task to an attachee
    assignNewTask(name, task) {
        const attachee = this.attachees.find(att => att.name === name);
        if (attachee) {
            attachee.addTask(task);
            return true;
        }
        return false;
    }

    // Assign a task to all attachees in a division
    assignTaskToDivision(division, task) {
        const attachees = this.getAttacheesByDivision(division);
        attachees.forEach(attachee => attachee.addTask(task));
        return attachees.length > 0;
    }

    // Provide feedback for a task
    provideFeedback(name, task, feedback) {
        const attachee = this.attachees.find(att => att.name === name);
        if (attachee) {
            return attachee.addFeedback(task, feedback);
        }
        return false;
    }

    // Add a score for a task
    addNewScore(name, task, score) {
        const attachee = this.attachees.find(att => att.name === name);
        if (attachee) {
            return attachee.addScore(task, score);
        }
        return false;
    }

    // Display all attachees
    showAllAttachees() {
        if (this.attachees.length === 0) {
            console.log("No attachees registered yet.");
            return;
        }
        console.log("=== ALL ATTACHEES ===");
        this.attachees.forEach(attachee => console.log(attachee.toString()));
    }

    // Display performance of a division
    showDivisionPerformance(division) {
        const attachees = this.getAttacheesByDivision(division);
        if (attachees.length === 0) {
            console.log(`No attachees in ${division} division.`);
            return;
        }
        console.log(`=== ${division.toUpperCase()} DIVISION PERFORMANCE ===`);
        attachees.forEach(attachee => {
            console.log(attachee.toString());
            attachee.tasks.forEach(task => {
                console.log(`  Task: ${task}`);
                console.log(`    Feedback: ${attachee.feedback[task] || "No feedback"}`);
                console.log(`    Score: ${attachee.scores[task] !== null ? attachee.scores[task] : "Not scored"}`);
            });
        });
    }
}

// Create a new task manager
const manager = new TaskManager();

// Menu for user interaction
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function showMenu() {
    console.log("\n===== SwahiliPot Tech Hub =====");
    console.log("1. Add Attachee");
    console.log("2. Assign Task");
    console.log("3. Assign Task to Division");
    console.log("4. Provide Feedback");
    console.log("5. Add Score");
    console.log("6. Show All Attachees");
    console.log("7. Show Division Performance");
    console.log("8. Exit");

    rl.question("Choose an option (1-8): ", (choice) => {
        switch (choice) {
            case "1":
                rl.question("Enter attachee name: ", (name) => {
                    console.log("Available divisions: " + manager.divisions.join(", "));
                    rl.question("Enter division: ", (division) => {
                        const result = manager.addAttachee(name, division);
                        console.log(result ? "Attachee added successfully!" : "Failed to add attachee.");
                        showMenu();
                    });
                });
                break;
            case "2":
                rl.question("Enter attachee name: ", (name) => {
                    rl.question("Enter task: ", (task) => {
                        const result = manager.assignTask(name, task);
                        console.log(result ? "Task assigned successfully!" : "Failed to assign task.");
                        showMenu();
                    });
                });
                break;
            case "3":
                console.log("Available divisions: " + manager.divisions.join(", "));
                rl.question("Enter division: ", (division) => {
                    rl.question("Enter task: ", (task) => {
                        const result = manager.assignTaskToDivision(division, task);
                        console.log(result ? "Task assigned to division successfully!" : "Failed to assign task.");
                        showMenu();
                    });
                });
                break;
            case "4":
                rl.question("Enter attachee name: ", (name) => {
                    rl.question("Enter task: ", (task) => {
                        rl.question("Enter feedback: ", (feedback) => {
                            const result = manager.provideFeedback(name, task, feedback);
                            console.log(result ? "Feedback added successfully!" : "Failed to add feedback.");
                            showMenu();
                        });
                    });
                });
                break;
            case "5":
                rl.question("Enter attachee name: ", (name) => {
                    rl.question("Enter task: ", (task) => {
                        rl.question("Enter score (0-10): ", (score) => {
                            const result = manager.addScore(name, task, parseInt(score));
                            console.log(result ? "Score added successfully!" : "Failed to add score.");
                            showMenu();
                        });
                    });
                });
                break;
            case "6":
                manager.showAllAttachees();
                showMenu();
                break;
            case "7":
                console.log("Available divisions: " + manager.divisions.join(", "));
                rl.question("Enter division: ", (division) => {
                    manager.showDivisionPerformance(division);
                    showMenu();
                });
                break;
            case "8":
                console.log("Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice. Please try again.");
                showMenu();
        }
    });
}

console.log("Welcome to SwahiliPot Tech Hub Management System");
showMenu();
