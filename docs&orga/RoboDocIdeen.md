## Robodoc Ideensammlung
---
### Frontend:
#### Eingabe normale User:
- Freitexteingabe?
- Dialog / Quizeingabe Entscheidungsbaum für gezielte Fragen?
    - Siehe [Symptomate](https://symptomate.com/)  

#### Eingabe Ärzte:
- Laborwerte
- Medizinische Fachbegriffe

#### Ausgabe:
- Mögliche Diagnosen mit jeweiliger Wahrscheinlichkeit auch in Bezug auf Alter, Geschlecht, Gewicht u. Vorerkrankungen des Users

#### Sonstiges:
- User-Registrierung und Administration
- Export von Diagnosedaten 
    - Maschinenlesbares Format
    - Textformat zur Vorlage beim Arzt

### Backend:
- REST-API nimmt Anfragen des Frontends entgegen. 
- Verarbeitet Anfragen und versucht anhand der Eingabe Ursachen in der Datenbank zu finden und sortiert diese nach Wahrscheinlichkeit
- Optional: Ebenfalls Schnittstelle für zukünftige Desktop- oder Mobile-Apps.
- Optional: Offene Schnittstelle siehe [APIMedic](https://apimedic.com/)


### Database:
- Sammlung aufbereiteter Symptome und möglicher Ursachen 
- Wahrscheinlichkeiten verschiedener Krankheiten unter Berücksichtigung von Alter, Geschlecht, Vorerkrankungen

### Machine-Learning:
- Mustererkennung: Sucht passende Ursachen zu eingegebenen Symptomen
- Ergänzend: Schlägt während der Eingabe der Symptome weitere passende Symptome vor, um Eingabeprozess zu beschleunigen
- Bzw. stellt gezielt Fragen zu Symptomen

### Deployment:
- 3 Docker Container für Frontend, Backend und Data mit ML-Code bei Backend oder Data
- Frontend und Backend unabhängig in Hinblick auf zukünftige Apps.