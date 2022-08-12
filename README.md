Web app for ethernet traffic testing

Installation Guide:
Make sure to have Node.js and Python3 installed

Frontend
1. run "npm install" in /frontend directory to install necessary modules
2. run "npm start" to begin frontend localhost

Backend (in a different console)
1. Start python virtual environment
2. pip install all the modules listed in requirements.txt 
3. run "flask run" to begin backend server

This will automatically start two servers, opening a browser page with the frontend.

Todo
- Receive data back from FPGA and display under results (will require use of async requests)
- Download console log as file, and ability to load a configuration file
- Main results page from all active streams
- Error injector while stream generation is running
- Inputs parsing (check for invalid inputs)
- Dynamic port detection (will require backend to communicate with FPGA, requiring an FPGA module?)
- Calculate transmission speed based on gaps inputs
- Live BERT Lock status (again, goes with results testing)
- Write functionality for pause and end stream buttons.

Future
- Have a database with stored profiles
- Deploy to web server, establish domain
- Mobile functionality

UI quality-of-life changes
- Break configuration into multiple tabs


Currently, frontend communicates with backend via reading and writing to files, change this so it works with only values (likely an array of dictionaries). Additionally, the frontend isn't actually required at all, you can communicate with just the python backend. Therefore, you can have scripts directly speaking with the backend, or create APIs that devlopers can access. Also, the current port functionality is hardcoded, so the first thing to fix would be that, as a LOT of things are intertwined with that. data/navbar.json file contains the hardcoded navbar displays, this can be easily written into to dynamically display the ports available. However, the main issue is how all the data is stored individually, so that so the priority to fix.


Contexts:
ModalContext.js has everything to deal with the stream information.
TabContext.js just deals with what tab is selected in the navigation bar (configuration or results for each port).

Components:
- Check Console.js to see how to write to the console.
- Header.js contains the start button which opens the main stream manager. Additionally it includes end and pause buttons which are non-functional.
- GenerationForm.js contains all the configuration details.
- MainModal.js is the main stream manager
- Modal.js is the stream manager that is for each port, uniquely identified by a key specified in Tabs.js
- Tabs.js displays the current tab (configuration or results for each port) on the main section of the interface
- ResizableNav.js is the navigation bar.
- Nav.js and NavItem.js just maps the navbar.json to the display and where the ability to change the tab is located.

Data
- This folder contains the assets (viasat logo and website background)

Communication
- All communication (which is limited at the moment) is done through the axios library. Currently there are a few POST requests, but will need GET requests to read results from backend and then use the request response to display the result. This must be done asynchrounsly as the results will be constantly updating (ie; the counters).



