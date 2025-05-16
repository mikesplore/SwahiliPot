# Class to represent an Attachee (intern)
class Attachee:
    def __init__(self, name, division):
        self.name = name
        self.division = division
        self.task = None
        self.feedback = None
        self.score = None

    def assign_task(self, task):
        self.task = task

    def give_feedback(self, feedback):
        self.feedback = feedback

    def assign_score(self, score):
        self.score = score

    def performance_grade(self):
        if self.score is None:
            return "Not scored yet"
        elif self.score >= 80:
            return "Excellent"
        elif self.score >= 60:
            return "Good"
        elif self.score >= 40:
            return "Average"
        else:
            return "Needs Improvement"

    def __str__(self):
        return f"{self.name} | Task: {self.task or 'None'} | Score: {self.score or 'N/A'} | Feedback: {self.feedback or 'N/A'} | Grade: {self.performance_grade()}"


# Class to manage attachees per division
class DivisionManager:
    def __init__(self):
        # Dictionary to store attachees grouped by division
        self.divisions = {
            "Engineering": [],
            "Tech Programs": [],
            "Radio Support": [],
            "Hub Support": []
        }

    def add_attachee(self, attachee):
        if attachee.division in self.divisions:
            self.divisions[attachee.division].append(attachee)
        else:
            print(f"Division '{attachee.division}' not recognized.")

    def assign_task_to_division(self, division, task):
        if division in self.divisions:
            for attachee in self.divisions[division]:
                attachee.assign_task(task)
        else:
            print(f"Division '{division}' not found.")

    def collect_feedback(self, name, feedback):
        for division in self.divisions.values():
            for attachee in division:
                if attachee.name == name:
                    attachee.give_feedback(feedback)

    def score_attachee(self, name, score):
        for division in self.divisions.values():
            for attachee in division:
                if attachee.name == name:
                    attachee.assign_score(score)

    def display_all_attachees(self):
        for division, attachees in self.divisions.items():
            print(f"\nDivision: {division}")
            if attachees:
                for att in attachees:
                    print(f"  - {att}")
            else:
                print("  No attachees yet.")


# ======= Example usage ========

# Create the manager
manager = DivisionManager()

# Create attachees
att1 = Attachee("Alice", "Engineering")
att2 = Attachee("Bob", "Tech Programs")
att3 = Attachee("Charlie", "Engineering")
att4 = Attachee("Diana", "Radio Support")

# Add attachees to manager
manager.add_attachee(att1)
manager.add_attachee(att2)
manager.add_attachee(att3)
manager.add_attachee(att4)

# Assign tasks
manager.assign_task_to_division("Engineering", "Build a prototype")
manager.assign_task_to_division("Tech Programs", "Organize a workshop")
manager.assign_task_to_division("Radio Support", "Check equipment")

# Provide feedback and scores
manager.collect_feedback("Alice", "Great work on the prototype.")
manager.score_attachee("Alice", 85)

manager.collect_feedback("Bob", "Good organization skills.")
manager.score_attachee("Bob", 65)

manager.score_attachee("Charlie", 40)

# Display all attachees and their performance
manager.display_all_attachees()
