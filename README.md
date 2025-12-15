# Spanish Weather Viewer (SWV)

**Group Members:** Leanna Seck & Samantha An
**Project:** INST377 Final  Submission

---

## Project Overview 

### Title:
**Spanish Weather Viewer (SWV)**

### Description:
The Spanish Weather Viewer (SWV) is a lightweight web application designed to provide users with reliable, detailed, and highly localized meteorological forecasts for any province in Spain. The primary goal is to solve the problem of unpredictable weather by delivering actionable, accurate data from an authoritative source.

The application functions by integrating the official AEMET OpenData API to fetch current temperature, humidity, wind speed, and precipitation chance. Core features include:
* **Search Functionality:** Dynamic search for any Spanish province.
* **Data Persistence:** Ability to save "favorite" provinces to a personalized dashboard using a Supabase database.
* **Visual Analysis:** Graphical presentation of weekly weather trends (using Chart.js).

### Description of target browsers:
The SWV application is styled using **contemporary CSS** (Flexbox and Grid) for responsiveness and has been verified for stable operation across the following modern environments:

* **Desktop:** Latest two versions of Google Chrome, Mozilla Firefox, and Microsoft Edge.
* **Mobile:** iOS Safari (v15+) and Android Chrome (v12+).

### Link to Developer Manual:
For all technical documentation, setup instructions, and API details, please refer to the **[Developer Manual](#developer-manual-bottom-half-of-readmemd---15-pts)** directly below.

---
---

## Developer Manual:

The audience for this document is a future developer familiar with general web application architecture but new to the SWV system design.

### A. Technical Stack & Dependencies:

The SWV is built on the following technologies:

| Component | Technology | Role / Justification |
| :--- | :--- | :--- |
| **Server** | Node.js / Express.js | Manages all API traffic, including external AEMET calls and internal database operations. |
| **Database** | Supabase (PostgreSQL) | **REQUIRED:** External data source used for persistence of user-specific data (favorite provinces) and a temporary caching layer for external API responses. |
| **Front End** | Vanilla HTML/CSS/JS | Uses FetchAPI for all data calls; styling uses Flexbox/Grid. |
| **External API** | AEMET OpenData API | Primary source of all raw weather forecast data (`https://opendata.aemet.es/opendata/api/`). |
| **Libraries** | **Chart.js**, **AOS (Animate On Scroll)** | Chart.js visualizes weather trends (Required JS Library); AOS provides smooth front-end motion (Required JS Library). |

### B. Installation and All Dependencies

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[YourGroup/ProjectName].git
    cd [ProjectName]
    ```
2.  **Install Dependencies:**
    * Install all server dependencies (Express, Supabase client, dotenv, etc.):
        ```bash
        npm install
        ```
3.  **Environment Configuration:**
    * Create a file named `.env` in the root directory. **You must populate this file with your secret keys:**
        ```
        # Supabase Database Keys
        SUPABASE_URL="[YOUR_SUPABASE_PROJECT_URL]"
        SUPABASE_KEY="[YOUR_SUPABASE_SERVICE_ROLE_KEY]"

        # AEMET External API Key
        AEMET_API_KEY="[YOUR_AEMET_API_KEY]"
        ```

### C. How to Run Application on a Server

1.  **Start the Server:**
    ```bash
    npm start
    ```
2.  **Access:** The application will be running at `http://localhost:3000`. The Express server hosts the static front-end files (`/public`) and routes all API calls.

### D. How to Run Any Tests Have Written

The system is configured to use the **Jest** framework for server-side unit testing.

1.  **Execute Tests:**
    ```bash
    npm test
    ```
2.  **Scope:** Tests cover successful connection to Supabase, integrity of data storage/retrieval functions, and ensuring correct formatting of data before being sent to the front end.

### E. The API for Your Server Application

All custom API endpoints are built in the Node.js/Express server and are prefixed with `/api/v1/`.

| Method | Endpoint | Description | Front-End Use Case |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/weather/fetch/:province` | **Required Fetch #1 (Retrieve External/Manipulate):** Calls the AEMET API, processes the raw, complex JSON data to extract and manipulate key fields (temp, wind, humidity, precipitation), and returns a simplified forecast. | Weather Results Page (Core Data Display) |
| **GET** | `/api/v1/favorites` | **Required Fetch #2 (Retrieve Data from DB):** Queries the Supabase database for the list of provinces the user has saved as favorites. | Home Page (Personalized Dashboard) |
| **POST** | `/api/v1/favorites/add` | **Required Fetch #3 (Write Data to DB):** Accepts a JSON body `{provinceName: string}` and inserts the new favorite province into the Supabase database. | Functionality Page (Saving a new favorite) |
| **DELETE** | `/api/v1/favorites/remove` | Accepts `{provinceName: string}` and removes the corresponding record from the database. | Functionality Page (Removing a favorite) |

### F. Known Bugs and Roadmap for Future Development

| Status | Component | Clear Expectation (Known Bug/Feature Gap) | Roadmap Target |
| :--- | :--- | :--- | :--- |
| **Known Bug** | Data Parsing | The raw AEMET monthly report data is highly nested and currently not fully parsed or visualized; only daily data is complete. | Fix in v1.1.0 |
| **Known Bug** | Cross-Browser CSS | Minor layout issues occasionally appear in the main content section when tested on older Android browsers using the default CSS Grid configuration. | Fix in v1.1.0 |
| **Future Goal** | **Major Refactor** | Migrate the entire front-end architecture to **React** to enable full dynamic state management and component-based architecture [Extra Credit Opportunity]. | v2.0.0 (Major Release) |
| **Future Goal** | **Authentication** | Implement user authentication (e.g., Supabase Auth) to properly tie favorites data to a specific user account. | v1.2.0 |
