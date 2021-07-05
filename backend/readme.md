| Endpoint | Method | Description | Status |
|:--------:|:------:|:-----------:|:------:|
| /api/user/         | POST   | old: Create User                          |✅|
| /api/user/         | GET    | Return Users                              |✅|
| /api/user/:id      | GET    | Return single User                        |✅|
| /api/user/:id      | DELETE | Delete single User                        |✅|
| /api/user/:id      | PUT    | Update User                               |✅|
| /api/auth/login    | POST   | Login with email and password receive jwt |✅|
| /api/auth/logout   | GET    | Logout                                    |✅|
| /api/auth/register | POST   | Register and receive jwt                  |✅|
| /api/auth/me       | GET    | Info                                      |✅|
| /api/diagnoses| GET | Alle möglichen Diagnosen ausgeben lassen | ✅ |
| /api/searchdiagnose/:diagnose | GET | Diagnose in Datenbank (noch csv) suchen, alle passenden | ✅ |
| /api/reloaddiagnoses | GET | CSV Datei mit Diagnosen neu laden, falls geändert | ✅ |
|/api/request | POST | (Token benötigt in x-access-token header) Patientendaten einreichen nach bekanntem Schema | ✅ |
|/api/request | GET | (Token benötigt in x-access-token header) Alle Patientendaten ausgeben | ✅ |
#
##### Regular startup:
- npm install
  
- npm server.js
- oder: npx nodemon server.js (startet automatisch neu bei geänderter source)
	-runs on port 8080

##### frontend host
- npm install
- vue serve -p PORT

##### Dockerized startup:
- docker build -t robotdocbackend .
- docker run -p /* YOUR DESIRED PORT*/:8080 -d robodocbackend
- see if it's running: docker ps 
- enter container to mess around: docker excec -it <container id from docker ps> /bin/bash
