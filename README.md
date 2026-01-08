# AI Phishing Detector URLs
![Python](https://img.shields.io/badge/Python-3.14-blue?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.1.2-black?style=for-the-badge&logo=flask&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoft-azure&logoColor=white)
![Chrome](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-4285F4?style=for-the-badge&logo=google-chrome&logoColor=orange)
![Microsoft Edge](https://img.shields.io/badge/Microsoft%20Edge-Extension-0078D7?style=for-the-badge&logo=microsoftedge&logoColor=blue)


**A real-time browser extension that uses Machine Learning to detect and block phishing attacks.**

> *"I built this full-stack security tool to solve the problem of zero-day phishing sites that traditional blacklists miss."*

---

## 📸 Demo
<img width="690" height="474" alt="CleanShot 2026-01-08 at 15 23 59" src="https://github.com/user-attachments/assets/a739d9e2-4c19-4998-a711-16ddf354554b" />
<img width="690" height="388" alt="CleanShot 2026-01-08 at 15 23 32" src="https://github.com/user-attachments/assets/0df48b59-7e90-4f60-a6e8-34c4826d4bd3" />


---

## 🚀 Key Features
* **Real-Time Inference:** Analyzes URL patterns instantly using a **Logistic Regression** model trained on 500k+ samples.
* **Privacy-First:** No browsing history is stored. URLs are processed in memory and discarded immediately.
* **Cloud Architecture:**
    * **Frontend:** Chrome Extension (Manifest V3) for low-latency URL capture.
    * **Backend:** Python Flask API hosted on **Microsoft Azure / Render**.
    * **ML Pipeline:** TF-IDF Vectorization for feature extraction.

---

## 🛠️ Tech Stack
| Component | Technology | Description |
| :--- | :--- | :--- |
| **Model** | Scikit-Learn | Logistic Regression (90%+ Accuracy on validation set) |
| **API** | Flask (Python) | REST API to handle prediction requests |
| **Frontend** | JavaScript | Chrome Extension Popup & Background Service Workers |
| **Hosting** | Azure / Render | Scalable cloud deployment for the inference engine |

---

## 📦 How to Install (Developer Mode)
Since this project is currently in **Beta**, you can install it manually on any Chromium browser (Chrome, Edge, Brave).

1.  **Download** this repository (Click `Code` -> `Download ZIP`) and unzip it.
2.  Open Chrome and navigate to `chrome://extensions`.
3.  Toggle **Developer Mode** (Top right corner).
4.  Click **Load Unpacked**.
5.  Select the `extension` folder from this project.
6.  📌 **Pin** the extension and browse safely!

---

## 🧠 How It Works (The "Brain")
Unlike standard ad-blockers that use a "blacklist" (a database of known bad sites), this tool uses **Machine Learning** to predict *unknown* threats.

1.  **Feature Extraction:** The system breaks down a URL into "tokens" (e.g., `secure-login`, `apple-verify`, `.xyz`).
2.  **Vectorization:** It converts these tokens into numerical data using **TF-IDF**.
3.  **Prediction:** The trained model calculates the probability of the URL being malicious.
