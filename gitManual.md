# Branchlayout
Main ist Hauptbranch <br>
Auf dem DEV kommen die neusten aktualisierungen<br>
Unter feature/new-feature das feature hochladen <br>

# Branch nutzen
Erstelle das new-feature feature, damit bist du im new-feature branch und hast es gleichzeitig erstellt
```bash
git checkout -b feature/new-feature
```
Hier mit siehst du alle branches
```
git branch
```
# Das Feature auf DEV hochladen
```
git checkout dev
git pull origin dev
```
Merge request
```
git merge feature/new-feature
git push origin dev
```


# Feature von anderen herunterladen
```
git fetch
git checkout feature/new-feature
```