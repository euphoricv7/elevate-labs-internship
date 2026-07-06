# Task 5: Deploy a Static Website Using GitHub Pages

This project marks the final task of the **Elevate Labs Web Development Internship**. It contains a premium, highly responsive **Wizarding Developer Portfolio** that serves as a central hub linking together all the tasks built during this program.

---

## 🔮 Project Overview

A clean, responsive, and basic dark-theme developer portfolio built to display all internship deliverable links. It features:
- **Dark Theme Style**: Standard slate dark theme layout.
- **Responsive Layout**: Adapts automatically to tablets and mobile screen sizes using CSS Media Queries.
- **Standard Menu Control**: Toggle button for mobile nav navigation.
- **Simple Form Submission**: Mock script showing a thank-you success block upon sending messages.

---

## 📂 Folder Structure

```text
Task-5/
├── index.html     # Semantic HTML5 layout structure
├── style.css      # Standard CSS design layout rules
├── script.js     # Basic menu toggle and contact form handler script
└── README.md      # Project summary and answers to the 10 interview questions (this file)
```

---

## 📖 Answers to Interview Questions

Below are detailed answers to the ten web development and version control interview questions.

### 1. What is Git and why use it?
**Git** is a distributed **Version Control System (VCS)** that tracks changes made to files in a project over time. It allows multiple developers to work on the same codebase simultaneously without overwriting each other's work.
- **Why use it?**
  - **Version History**: You can review the history of every line of code, seeing who changed it and why.
  - **Safety & Rollbacks**: If a bug is introduced, you can easily roll back to a previous working state.
  - **Collaboration**: Multiple developers can work on separate features via branches and safely merge them.
  - **Backup**: Code is saved locally on developer machines and can be pushed to remote platforms like GitHub.

---

### 2. How do you push code to GitHub?
To push code from a local repository to GitHub, follow these standard steps:
1. **Initialize Git** (if not already done):
   ```bash
   git init
   ```
2. **Stage your files** (gather files ready to commit):
   ```bash
   git add .
   ```
3. **Commit changes** (save snapshots of files with a descriptive message):
   ```bash
   git commit -m "feat: implement wizarding portfolio design"
   ```
4. **Link remote repository** (only needed once, replace with actual URL):
   ```bash
   git remote add origin https://github.com/yourusername/repo-name.git
   ```
5. **Push code** (upload commits from local `main` branch to the remote repository):
   ```bash
   git push -u origin main
   ```

---

### 3. What is GitHub Pages?
**GitHub Pages** is a free static web hosting service provided by GitHub. It allows you to host websites directly from a public GitHub repository. Whenever you update your code and push it to the designated branch, GitHub Pages automatically builds and publishes the website at a URL formatted like:
`https://<yourusername>.github.io/<repository-name>/` (or `https://<yourusername>.github.io/` for username-owned repositories).

---

### 4. Difference between static and dynamic websites?
| Feature | Static Website | Dynamic Website |
| :--- | :--- | :--- |
| **Content Delivery** | Sends pre-built HTML, CSS, and JS files directly to the browser. Every user receives the exact same files. | Generates HTML content on the fly. Content is customized based on user inputs, session data, or time. |
| **Server Requirement** | Simple web server (no backend processing needed). | Requires a backend application server (e.g., Node.js, Python, PHP) and a database (e.g., MongoDB, SQL). |
| **Performance** | Extremely fast loading since files are pre-rendered and can be served via CDN. | Processing overhead makes it slower, but caching mitigates this. |
| **Examples** | Portfolios, documentation pages, blogs, Landing pages (e.g., Task-1, Task-4). | E-commerce platforms, social media, dashboard management sites (e.g., Task-3 REST API endpoints). |

---

### 5. How do you revert commits in Git?
There are three main ways to undo commits depending on your goals and whether the code has been pushed to a shared remote:
- **`git revert <commit-hash>`**: 
  *What it does:* Creates a **new commit** that introduces the exact opposite changes of the target commit.
  *When to use:* Best for public/shared branches because it doesn't rewrite commit history, keeping collaboration intact.
- **`git reset --soft <commit-hash>`**: 
  *What it does:* Moves the branch pointer back in history, but keeps all code changes in your staging area (index) so you can edit and commit them again.
- **`git reset --hard <commit-hash>`**: 
  *What it does:* Moves the branch pointer back and **discards** all modifications in your working directory and staging area.
  > [!CAUTION]
  > This is a destructive operation. Uncommitted work and changes after the specified commit will be permanently lost.

---

### 6. What is branching in Git?
A **branch** in Git represents an isolated line of development. Think of it as a parallel copy of the codebase where you can write code, fix bugs, or experiment with new features without affecting the main product (`main` or `master` branch).
- Once a feature is complete and verified, the feature branch can be merged back into the main branch.
- **Benefits**: Isolates experimental code, prevents half-baked code from breaking the production line, and allows multiple developers to focus on separate modules simultaneously.

---

### 7. Explain pull requests.
A **Pull Request (PR)** (often called a Merge Request in GitLab) is a mechanism for proposing changes to a shared repository.
- **Workflow**:
  1. A developer creates a feature branch, commits code, and pushes it to GitHub.
  2. They open a Pull Request on GitHub, requesting to merge their feature branch into the `main` branch.
  3. Team members inspect the PR to review the code, write comments, request modifications, and run automated tests.
  4. Once approved and passing, the branch is merged.

---

### 8. How to resolve merge conflicts?
A **merge conflict** occurs when Git cannot automatically decide which code to keep during a merge. This typically happens when two developers edit the exact same lines of a file on different branches, or one deletes a file that another modified.
- **Resolution Process**:
  1. Attempt to merge/pull. Git will report a conflict and halt the merge.
  2. Open the conflicted files. Git inserts conflict markers to show the differences:
     ```text
     <<<<<<< HEAD
     const wandType = "Vine wood with dragon heartstring";
     =======
     const wandType = "Holly wood with phoenix feather";
     >>>>>>> feature-wand-select
     ```
  3. Edit the file to remove the markers (`<<<<<<<`, `=======`, `>>>>>>>`) and keep the correct code.
  4. Stage the resolved files: `git add <filename>`.
  5. Complete the merge commit: `git commit -m "merge: resolve conflict in wand options"`.

---

### 9. How to host a website for free?
There are several premium and reliable hosting providers that offer free plans for developers:
- **GitHub Pages**: Ideal for simple, repository-connected static projects.
- **Vercel**: The industry standard for hosting React/Next.js applications with global CDNs and edge functions.
- **Netlify**: Excellent for static sites, modern JAMstack architectures, and form-handling integration.
- **Render**: Supports hosting static files for free, alongside affordable web services (Node.js/Python) and databases.
- **Firebase Hosting**: High-speed hosting backed by Google, perfect for web apps utilizing Google's cloud ecosystem.

---

### 10. What is continuous deployment?
**Continuous Deployment (CD)** is a software engineering practice where code changes are automatically built, tested, and deployed to production servers immediately after passing quality checks.
- Under CD, once code is merged into the main branch, a script or pipeline (like GitHub Actions, Netlify triggers, or Vercel builds) automatically pulls the new commit and updates the live website.
- **Why use it?** Reduces manual deployment tasks, delivers fixes and features to users rapidly, and ensures the production code is always in sync with the repository.
