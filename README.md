# Webapp Knowledge Assessments - Browseranwendung fuers selbststaendige lernen

## Project Struktur
```
./webapp-knowledge-assessments
├── backend
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── python
│   ├── README.md
│   └── requirements.txt
├── frontend
│   ├── build
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   ├── README.md
│   ├── src
│   └── tsconfig.json
├── build_dist.sh
└── README.md
```

## Installation
Vorinstalliert muessen NodeJS, npm, und Docker sein.

Geprueft kann dies mit folgenden anweisungen:

`node --version`

`npm --version`

`docker-compose version`

# Frontend distribution erstellen

1. In der Konsole in das Project-Root navigieren, das ist der Ordner in welchem sich diese Datei sich befindet.
```sh
ls
backend  build_dist.sh  frontend  README.md
```

2. `./build_dist.sh` benoetigt Ausfuehrungsrechte, diese geben wir der Datei mit dem Kommand: 
```sh
chmod +x ./build_dist.sh`
```

3. Distribution "bauen":
```sh
./build_dist.sh
# [...]
```

# Server starten:

## Docker Container Starten (als root-user):
```
sudo docker-compose up --build --remove-orphans
```

# Server terminieren
Ctrl-C (Strg-C), nur einmal druecken!

```
docker-compose down
```
