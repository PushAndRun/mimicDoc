| Endpoint | Method | Description | Status |
|:--------:|:------:|:-----------:|:------:|
| /diagnoses| get | Alle möglichen Diagnosen ausgeben lassen | yeah |
| /searchdiagnose/:diagnose | get | Diagnose in Datenbank (noch csv) suchen, alle passenden | works |
| /reloaddiagnoses | get | CSV Datei mit Diagnosen neu laden, falls geändert | done
|/request | get | Patientendaten einreichen -> vorerst Pseudoantwort | yup |
|/request | get | Patientendaten-Format ausgeben bei leerem request | jau |

##### Regular startup:
- npm install
- npm server.js
	-runs on port 8080

##### Dockerized startup:
- docker build -t robotdocbackend .
- docker run -p /* YOUR DESIRED PORT*/:8080 -d robodocbackend
- see if it's running: docker ps 
- enter container to mess around: docker excec -it <container id from docker ps> /bin/bash
