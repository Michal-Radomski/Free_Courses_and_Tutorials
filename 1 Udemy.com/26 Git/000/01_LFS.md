To configure Git LFS (Large File Storage) on GitHub, follow these steps:

### **1. Install Git LFS**

- Download and install Git LFS from [git-lfs.github.com](https://git-lfs.github.com).
- Run the following command to initialize Git LFS for your system:
  ```bash
  git lfs install
  ```
  This step needs to be performed only once per system.

### **2. Set Up Git LFS in a Repository**

- Navigate to the repository you want to use with Git LFS:
  ```bash
  cd /path/to/your/repository
  ```

### **3. Track Large Files**

- Use the `git lfs track` command to specify the file types or individual files you want to manage with Git LFS. For example:
  ```bash
  git lfs track "*.psd"
  ```
  This updates the `.gitattributes` file in your repository to associate the specified file type with Git LFS.

### **4. Commit `.gitattributes`**

- Add and commit the `.gitattributes` file to ensure all collaborators use the same tracking rules:
  ```bash
  git add .gitattributes
  git commit -m "Add .gitattributes for Git LFS"
  ```

### **5. Add and Push Large Files**

- Add the large files you want to track:
  ```bash
  git add path/to/large-file.psd
  ```
- Commit and push the changes:
  ```bash
  git commit -m "Add large file"
  git push origin main
  ```

During the push, you will see diagnostic information about the upload progress of your large files.

### **6. Verify Configuration**

- Ensure that the `.gitattributes` file is included in your repository, as it allows others cloning or forking your
  repository to correctly use Git LFS.

By following these steps, your repository will efficiently handle large files using Git LFS on GitHub[1][3][4].

Citations: [1]
https://docs.github.com/en/repositories/working-with-files/managing-large-files/configuring-git-large-file-storage [2]
https://docs.gitlab.com/ee/topics/git/lfs/ [3] https://www.atlassian.com/git/tutorials/git-lfs [4]
https://microsoft.github.io/code-with-engineering-playbook/source-control/git-guidance/git-lfs-and-vfs/ [5]
https://groups.google.com/g/repo-discuss/c/uoBejpxzucU [6]
https://about.gitlab.com/blog/2017/01/30/getting-started-with-git-lfs-tutorial/ [7]
https://docs.github.com/en/repositories/working-with-files/managing-large-files [8]
https://docs.github.com/en/desktop/configuring-and-customizing-github-desktop/about-git-large-file-storage-and-github-desktop

---

Answer from Perplexity: https://www.perplexity.ai/search/what-is-git-lfs-kdh3peAVTxK1idykiKFPuA?utm_source=copy_output
